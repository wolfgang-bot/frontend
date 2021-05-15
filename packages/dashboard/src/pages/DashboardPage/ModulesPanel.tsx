import React, { useState } from "react"
import SwipeableViews from "react-swipeable-views"

import ModuleList from "../../features/modules/ModuleList"
import { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import ModuleStartCard from "./ModuleStartCard"
import { Theme, useMediaQuery } from "@material-ui/core"

function ModulesPanel({ state, onHeroStateChange }: {
    state?: HeroState,
    onHeroStateChange: (newState: HeroState) => void
}) {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

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
        <SwipeableViews
            index={viewIndex}
            onChangeIndex={setViewIndex}
            animateHeight={isSmallScreen}
        >
            <div style={
                isSmallScreen ?
                    { overflow: "auto scroll", height: 300 } :
                    {}
            }>
                <ModuleList
                    onHover={handleHover}
                    onClick={handleModuleClick}
                />
            </div>

            <ModuleStartCard
                guild={state?.guild}
                module={activeModule}
                onBack={() => setViewIndex(0)}
            />
        </SwipeableViews>
    )
}

export default ModulesPanel
