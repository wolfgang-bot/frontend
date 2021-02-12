import React from "react"
import { Grid } from "@material-ui/core"

import ModuleCard from "./ModuleCard"

const AMOUNT_OF_CARDS = 5

const seeds: number[] = []

for (let i = 0; i < AMOUNT_OF_CARDS; i++) {
    seeds[i] = Math.random()
}

function ModuleListForGuild() {
    return (
        <Grid container spacing={2}>
            {seeds.map((seed, index) => (
                <Grid item key={index}>
                    <ModuleCard seed={seed}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ModuleListForGuild