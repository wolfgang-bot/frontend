import { ChartOptions, DeepPartial } from "lightweight-charts"

import { API } from "../../config/types"
import withStreamSubscription from "../../features/streams/withStreamSubscription"
import Chart from "./Chart"

function createChart({ stream, chartOptions }: {
    stream: API.EVENT_STREAM,
    chartOptions?: DeepPartial<ChartOptions>
}) {
    return withStreamSubscription(
        (props: React.ComponentProps<typeof Chart>) => (
            <Chart chartOptions={chartOptions} {...props} />
        )
    , stream)
}

export default createChart
