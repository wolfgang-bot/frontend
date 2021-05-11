import ComponentHandle from "./ComponentHandle"
import dialogs from "../Dialogs"

class DialogHandle extends ComponentHandle<React.FunctionComponent, any> {}

function createOpener(open: (handle: DialogHandle) => DialogHandle) {
    return function openDialog(name: string, props: any) {
        if (!(name in dialogs)) {
            throw new Error(`Unknown dialog '${name}'`)
        }
        
        const newHandle = new DialogHandle({
            component: dialogs[name],
            data: props
        })

        return open(newHandle)
    }
}

export default createOpener