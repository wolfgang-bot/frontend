import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import icon from "../../assets/images/icon-white.svg"

const useStyles = makeStyles(theme => ({
    brand: {
        display: "flex"
    },

    logo: {
        width: 32,
        marginRight: theme.spacing(2)
    },

    name: {
        fontFamily: "'Varela Round'",
        fontWeight: 700
    }
}))

function Brand() {
    const classes = useStyles()

    return (
        <div className={classes.brand}>
            <img src={icon} alt="icon" className={classes.logo}/>
            <Typography
                color="textPrimary"
                variant="h6"
                className={classes.name}
            >
                wolfgang
            </Typography>
        </div>
    )
}

export default Brand
