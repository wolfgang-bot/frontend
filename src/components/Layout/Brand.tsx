import { Typography } from "@material-ui/core"
import FingerPrintIcon from "@material-ui/icons/Fingerprint"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    brand: {
        display: "flex"
    },

    logo: {
        color: theme.palette.common.black,
        fontSize: 32,
        marginRight: theme.spacing(2)
    }
}))

function Brand() {
    const classes = useStyles()

    return (
        <div className={classes.brand}>
            <FingerPrintIcon className={classes.logo}/>
            <Typography color="textPrimary" variant="h6">
                discord bot
            </Typography>
        </div>
    )
}

export default Brand