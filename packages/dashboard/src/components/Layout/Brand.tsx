import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"

import defaultIcon from "../../assets/images/icon.svg"
import whiteIcon from "../../assets/images/icon-white.svg"
import { RootState } from "../../store"

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

    const isDarkMode = useSelector((store: RootState) => store.settings.isDarkMode)

    return (
        <div className={classes.brand}>
            <img
                src={isDarkMode ? whiteIcon : defaultIcon}
                alt="icon"
                className={classes.logo}
            />
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
