import createChart from "../../components/Chart/createChart"
import { MILLISECONDS_PER_HOUR, roundToPlaces } from "./utils"

function hoursFormatter(ms: number) {
    return roundToPlaces(ms / MILLISECONDS_PER_HOUR, 1) + "h"
}

export default createChart({
    stream: "voice",
    chartOptions: {
        localization: {
            priceFormatter: hoursFormatter
        }
    }
})
