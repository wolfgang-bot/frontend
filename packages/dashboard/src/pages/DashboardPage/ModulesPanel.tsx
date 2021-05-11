import { useState } from "react"
import SwipeableViews from "react-swipeable-views"

import ModuleList from "../../features/modules/ModuleList"
import { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import ModuleStartCard from "./ModuleStartCard"

function ModulesPanel({ state, onHeroStateChange }: {
    state?: HeroState,
    onHeroStateChange: (newState: HeroState) => void
}) {
    const [viewIndex, setViewIndex] = useState(0)
    const [activeModule, setActiveModule] = useState<API.Module>()

    const handleHover = ({ module }: { module: API.Module }) => {
        if (!state) {
            return
        }
        onHeroStateChange({
            ...state,
            type: "module",
            moduleKey: module.key
        })
    }

    const handleModuleClick = (event: { module: API.Module }) => {
        setActiveModule(event.module)
        setViewIndex(1)
    }

    return (
        <SwipeableViews index={viewIndex} onChangeIndex={setViewIndex}>
            <ModuleList
                onHover={handleHover}
                onClick={handleModuleClick}
            />

            <ModuleStartCard
                guild={state?.guild}
                module={activeModule}
                onBack={() => setViewIndex(0)}
            />
        </SwipeableViews>
    )
}

export default ModulesPanel
