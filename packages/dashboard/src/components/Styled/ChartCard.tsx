import React, { useState } from "react"
import { Paper, Box, Typography, Divider, IconButton, Dialog } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MagnetOnIcon from "@material-ui/icons/GridOn"
import MagnetOffIcon from "@material-ui/icons/GridOff"
import FullscreenIcon from "@material-ui/icons/Fullscreen"
import CloseIcon from "@material-ui/icons/Close"

const DIALOG_HEADER_HEIGHT = 56

const useStyles = makeStyles({
    fullscreenIcon: {
        fontSize: 26
    }
})

type ContentProps = {
    chart: React.ReactElement,
    label: React.ReactNode,
    isFullscreen: boolean,
    onToggleFullscreen: () => void
}

function Content({
    chart,
    label,
    isFullscreen,
    onToggleFullscreen
}: ContentProps) {
    const classes = useStyles()

    const [hasMagnetCursor, setHasMagnetCursor] = useState(true)

    const toggleHasMagnetCursor = () => {
        setHasMagnetCursor(!hasMagnetCursor)
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box ml={3} my={2}>
                    <Typography variant="body1">{label}</Typography>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    mr={1}
                >
                    {!isFullscreen && (
                        <Box mr={1}>
                            <IconButton
                                size="small"
                                onClick={onToggleFullscreen}
                            >
                                <FullscreenIcon
                                    className={classes.fullscreenIcon}
                                />
                            </IconButton>
                        </Box>
                    )}

                    <Box mr={1}>
                        <IconButton
                            size="small"
                            onClick={toggleHasMagnetCursor}
                        >
                            {
                                hasMagnetCursor ?
                                <MagnetOffIcon fontSize="small"/> :
                                <MagnetOnIcon fontSize="small"/>
                            }
                        </IconButton>
                    </Box>

                    {isFullscreen && (
                        <Box mr={1}>
                            <IconButton
                                size="small"
                                onClick={onToggleFullscreen}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>

            <Divider/>

            <Box mt={2}>
                {React.cloneElement(React.Children.only(chart), {
                    hasMagnetCursor,
                    ...(isFullscreen ? {
                        height: (window.innerHeight - DIALOG_HEADER_HEIGHT) * .9
                    } : {})
                })}
            </Box>
        </>
    )
}

type Props = {
    width?: number | string | null,
    className?: string,
    chart: ContentProps["chart"],
    label: ContentProps["label"]
}

function ChartCard({ className, width = "100%", ...props }: Props) {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    return (
        <>
            <Box width={width}>
                <Paper variant="outlined" className={className}>
                <Content
                    onToggleFullscreen={toggleFullscreen}
                    isFullscreen={false}
                    {...props}
                />
                </Paper>
            </Box>
            
            <Dialog
                open={isFullscreen}
                onClose={toggleFullscreen}
                fullScreen
            >
                <Content
                    onToggleFullscreen={toggleFullscreen}
                    isFullscreen={true}
                    {...props}
                />
            </Dialog>
        </>
    )
}

export default ChartCard
