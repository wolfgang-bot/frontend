import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@material-ui/core"

function ConfirmDialog({ onClose, open, content }: {
    onClose: (accepted: boolean) => void,
    open: boolean,
    content: string
}) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
        >
            <DialogTitle>Confirm</DialogTitle>
            
            <DialogContent dividers>
                <Typography>{content}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose(false)}>Cancel</Button>
                <Button onClick={() => onClose(true)}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
