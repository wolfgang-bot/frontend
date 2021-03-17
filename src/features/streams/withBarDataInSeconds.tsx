import { BarData, WhitespaceData } from "lightweight-charts"

function msToUNIX(ms: number) {
    return Math.floor(ms / 1000)
}

function barDataWithUNIX(data: (BarData | WhitespaceData)[]) {
    return data.map(datapoint => ({
        ...datapoint,
        time: msToUNIX(datapoint.time as number)
    })) as (BarData | WhitespaceData)[]
}

export default function withBarDataInSeconds(Child: React.FunctionComponent<any>) {
    type Props = React.ComponentProps<typeof Child> & {
        data: (BarData | WhitespaceData)[]
    }

    return (props: Props) => {
        const newProps = {
            ...props,
            data: barDataWithUNIX(props.data)
        }

        return <Child {...newProps} />
    }
}
