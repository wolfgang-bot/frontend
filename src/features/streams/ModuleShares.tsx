import { Pie } from "react-chartjs-2"
import { unzip } from "lodash"
import { useTheme } from "@material-ui/core"

import withStreamSubscription from "./withStreamSubscription"
import { COLORS } from "../../config/constants"

function ModuleShares({ data }: { data: Record<string, number> }) {
    const theme = useTheme()

    const [labels, values] = unzip(Object.entries(data))

    return (
        <Pie
            type="Pie"
            data={{
                labels,
                datasets: [
                    {
                        label: "Shares",
                        data: values,
                        backgroundColor: COLORS,
                        borderColor: theme.palette.background.paper,
                        borderWidth: 1
                    }
                ]
            }}
        />
    )
}

export default withStreamSubscription(ModuleShares, "module-shares")
