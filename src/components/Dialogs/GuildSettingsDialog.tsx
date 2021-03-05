import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"

function GuildSettingsDialog({ open, onClose, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    guild: API.Guild
}) {
    const handleSubmit = async () => {
        console.log("Submit")
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Settings</DialogTitle>

            <DialogContent>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GuildSettingsDialog
