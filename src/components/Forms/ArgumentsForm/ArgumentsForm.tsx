import React from "react"

import { API } from "../../../config/types"
import ArgumentInput from "./ArgumentInput"

function ArgumentsForm({ args, guild }: {
    args: API.Argument[],
    guild: API.Guild
}) {
    return (
        <>
            { args.map(arg => (
                <ArgumentInput arg={arg} guild={guild} key={arg.name}/>
            )) }
        </>
    )
}

export default ArgumentsForm