import React from "react"
import { Grid } from "@material-ui/core"

import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ModuleList from "../../features/modules/ModuleList"
import ModuleInstanceList from "../../features/modules/ModuleInstanceList"

function ModulesTabHero() {
    return (
        <div></div>
    )
}

function ModulesTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & SubscriptionOptions = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <Grid container spacing={4}>
            <Grid item xs>
                <ModuleInstanceList
                    guild={guild}
                    {...streamProps}
                />
            </Grid>

            <Grid item xs>
                <ModulesTabHero/>
            </Grid>

            <Grid item xs>
                <ModuleList/>
            </Grid>
        </Grid>
    )
}

export default ModulesTab
