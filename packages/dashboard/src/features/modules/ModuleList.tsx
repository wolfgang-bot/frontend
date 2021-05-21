import { useSelector } from "react-redux"
import { Box } from "@material-ui/core"

import { RootState } from "../../store"
import ModuleCard, { ModuleCardSkeleton } from "./ModuleCard"
import { API } from "../../config/types"
import withStreamSubscription from "../streams/withStreamSubscription"

const AMOUNT_OF_CARDS = 4

function ModuleList({ guild, onHover = () => {}, onClick = () => {} }: {
    guild: API.Guild,
    onHover?: (props: { module: API.Module }) => void,
    onClick?: (props: { module: API.Module }) => void
}) {
    const modules = useSelector((store: RootState) => store.modules.guilds[guild?.id || '']?.data)
    const status = useSelector((store: RootState) => store.modules.guilds[guild?.id || '']?.status)
    const error = useSelector((store: RootState) => store.modules.guilds[guild?.id || '']?.error)

    if (status === "success") {
        const filtered = Object.values(modules)
            .filter(module => !module.isStatic)

        return (
            <>
                {filtered.map((module, i) => (
                    <Box key={module.key} mb={i < filtered.length - 1 ? 2 : 0}>
                        <ModuleCard
                            module={module}
                            onMouseEnter={() => onHover({ module })}
                            onClick={() => onClick({ module })}
                        />
                    </Box>                    
                ))}
            </>
        )
    }

    if (status === "error") {
        return (
            <div>{error}</div>
        )
    }

    return <ModuleListSkeleton/>
}

export function ModuleListSkeleton() {
    return (
        <>
            {Array(AMOUNT_OF_CARDS).fill(0).map((_, index) => (
                <Box key={index} mb={index}>
                    <ModuleCardSkeleton />
                </Box>
            ))}
        </>
    )
}

export default withStreamSubscription(ModuleList, "guild-modules", {
    showOverlayIfEmpty: false
})
