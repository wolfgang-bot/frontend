import { Box } from "@material-ui/core"
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp"
import ChevronDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    success: {
        color: theme.palette.success.main
    },

    error: {
        color: theme.palette.error.main
    },

    icon: {
        marginLeft: theme.spacing(-.25)
    }
}))

function Trend({ value }: { value: number }) {
    const classes = useStyles()

    const Icon = value < 0 ? ChevronDownIcon : ChevronUpIcon
    const sign = value >= 0 ? "+" : ""

    const newValue = Math.floor(value * 100)

    return (
        <Box
            display="flex"
            alignItems="center"
            className={value < 0 ? classes.error : classes.success}
        >
            <Box>{sign}{newValue}%</Box>
            <Icon className={classes.icon}/>
        </Box>
    )
}

export default Trend
