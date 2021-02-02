import React, { useState } from "react"
import StopIcon from "@material-ui/icons/Stop"

import LoadingIconButton from "../../components/Styled/LoadingIconButton.js"

function StopButton({ module, guild, onUpdate, ...props }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleStart = () => {
        setIsLoading(true)
    }

    return (
        <LoadingIconButton isLoading={isLoading} onClick={handleStart} {...props}>
            <StopIcon />
        </LoadingIconButton>
    )
}

export default StopButton