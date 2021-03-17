import { API } from "../../config/types"

function msToUNIX(ms: number) {
    return Math.floor(ms / 1000)
}

function barDataWithUNIX(data: API.Dataset) {
    return data.map(datapoint => ({
        ...datapoint,
        time: msToUNIX(datapoint.time as number)
    })) as API.Dataset
}

export default function withBarDataInSeconds(Child: React.FunctionComponent<any>) {
    type Props = React.ComponentProps<typeof Child> & {
        data: API.Dataset
    }

    return (props: Props) => {
        const newProps = {
            ...props,
            data: barDataWithUNIX(props.data)
        }

        return <Child {...newProps} />
    }
}
