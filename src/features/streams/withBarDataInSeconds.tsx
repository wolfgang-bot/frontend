import { API } from "../../config/types"

export type Options = {
    multiDataset?: boolean
}

function msToUNIX(ms: number) {
    return Math.floor(ms / 1000)
}

function barDataWithUNIX(data: API.Dataset) {
    return data.map((dataObject: API.EmptyDataObject) => ({
        ...dataObject,
        time: msToUNIX(dataObject.time as number)
    })) as API.Dataset
}

export default function withBarDataInSeconds(
    Child: React.FunctionComponent<any>,
    options: Options = {}
) {
    type Props = React.ComponentProps<typeof Child> & {
        data: API.Dataset | API.Dataset[]
    }

    return (props: Props) => {
        const newProps = {
            ...props,
            data: options.multiDataset ?
                props.data.map(barDataWithUNIX) :
                barDataWithUNIX(props.data)
        }

        return <Child {...newProps} />
    }
}
