import React, { useState } from "react"

import LoadingIconButton from "../../components/Styled/LoadingIconButton.js"

type Props = {
    icon: React.FunctionComponent,
    onClick: () => Promise<void>
} & React.ComponentProps<typeof LoadingIconButton>

function ActionButton({ icon, onClick, ...props }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        await onClick()
        setIsLoading(false)
    }

    return (
        <LoadingIconButton isLoading={isLoading} onClick={handleClick} {...props}>
            { React.createElement(icon) }
        </LoadingIconButton>
    )
}

export default ActionButton