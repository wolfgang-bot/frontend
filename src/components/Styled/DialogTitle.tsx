import React from "react"
import { DialogTitle as MuiDialogTitle, Box, Typography, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

type Props = React.PropsWithChildren<{ onClose: () => void }>

function DialogTitle({ onClose, children }: Props) {
    return (
        <MuiDialogTitle disableTypography>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h6">{ children }</Typography>

                <IconButton onClick={onClose} size="small">
                    <CloseIcon/>
                </IconButton>
            </Box>
        </MuiDialogTitle>
    )
}

export default DialogTitle
