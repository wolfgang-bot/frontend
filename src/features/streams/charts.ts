import createChart from "../../components/Chart/createChart"
import { MILLISECONDS_PER_HOUR, roundToPlaces } from "./utils"

function hoursFormatter(ms: number) {
    return roundToPlaces(ms / MILLISECONDS_PER_HOUR, 1) + "h"
}

export const GuildChart = createChart({ stream: "guilds" })

export const MemberChart = createChart({ stream: "members" })

export const MessageChart = createChart({ stream: "messages" })

export const ModuleInstanceChart = createChart({ stream: "module-instances" })

export const UserChart = createChart({ stream: "users" })

export const VoiceDurationChart = createChart({
    stream: "voice",
    chartOptions: {
        localization: {
            priceFormatter: hoursFormatter
        }
    }
})
