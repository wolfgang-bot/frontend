import React, { FunctionComponent } from "react"

import ArrayInput from "./ArrayInput"
import NumberInput from "./NumberInput"
import StringInput from "./StringInput"

const inputMap: Record<string, FunctionComponent<{
    name: string,
    onChange: (value: any) => void
}>> = {
    "Array": ArrayInput,
    "Number": NumberInput,
    "String": StringInput
}

function DynamicInput({ value, className, name, onChange }: {
    value: any,
    className?: string,
    name: string,
    onChange: (value: any) => void
}) {    
    const InputComponent = inputMap[value.constructor.name]

    if (!InputComponent) {
        throw new Error(`No input component found for data type '${value.constructor.name}'`)
    }

    return (
        <div className={className}>
            <InputComponent name={name} onChange={onChange}/>
        </div>
    )
}

export default DynamicInput