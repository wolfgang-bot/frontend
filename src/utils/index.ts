import React from "react"

import { DescriptiveObject } from "../config/types"
import Emittable, { EventListener } from "./Emittable"

export const KEY_DELIMITER = "#"

/**
 * Make an array of components which render a descriptive object recursively and return
 * the flattened keys.
 */
export function createNestedElements(data: DescriptiveObject, components: {
    title: React.FunctionComponent<any>,
    container: React.FunctionComponent<any>,
    leaf: React.FunctionComponent<any>
}): [React.ReactElement[], Record<string, string>] {
    const getValue = (data: any) => {
        return "value" in data ? data.value : data
    }

    const keys: Record<string, any> = {}

    function _create(data: object, keyCarry = "", depth = 0) {
        const elements: React.ReactElement[] = []

        const values: { [key: string]: any } = getValue(data)

        for (let key in values) {
            const value = getValue(values[key])
            const desc = values[key].description

            const backtraceKey = keyCarry + key
            
            if (value.constructor.name === "Object") {
                elements.push(React.createElement(components.title, {
                    key: backtraceKey + "title",
                    _key: backtraceKey,
                    desc,
                    depth
                } as any))
                
                // Recursively create elements with depth += 1
                elements.push(React.createElement(components.container, {
                    key: keyCarry + key + "container",
                    children: _create(value as object, backtraceKey + KEY_DELIMITER, depth + 1)
                } as any))
            } else {
                elements.push(React.createElement(components.leaf, {
                    key: backtraceKey + "leaf",
                    _key: backtraceKey,
                    value,
                    desc,
                    depth
                } as any))

                keys[backtraceKey] = value
            }
        }

        return elements
    }

    return [_create(data), keys]
}

/**
 * Create a nested object based on keys delimitted by the KEY_DELIMITER constant.
 * e.g. the keys "foo#bar" and "foo#baz" become: { foo: { bar, baz } }
 */
export function createNestedObject(values: Record<string, string>): object {
    const result = {}

    for (let key in values) {
        // Split the union key into it's single key parts
        const finalKeys = key.split(KEY_DELIMITER)

        let currentObject: any = result

        // Create nested object
        while (finalKeys.length > 1) {
            const firstKey = finalKeys.shift()

            if (!firstKey) {
                break
            }

            if (!currentObject[firstKey]) {
                currentObject[firstKey] = {}
            }

            currentObject = currentObject[firstKey]
        }

        currentObject[finalKeys[0]] = values[key]
    }

    return result
}

/**
 * Flatten an object by the combining keys by a given delimiter.
 */
export function flattenObject(input: object, delimiter = KEY_DELIMITER): object {
    const result: Record<string, any> = {}

    function _flatten(input: any, keyCarry = "") {
        for (let key in input) {
            const backtraceKey = keyCarry + key

            if (input[key].constructor.name === "Object") {
                _flatten(input[key], backtraceKey + delimiter)
            } else {
                result[backtraceKey] = input[key]
            }
        }
    }

    _flatten(input)

    return result
}

/**
 * Convert descriptive object to vanilla object
 */
export function convertDescriptiveObjectToVanillaObject(object: DescriptiveObject) {
    const getValue = (object: any) => object.value || object
    
    const result: { [key: string]: any } = {}

    const values = getValue(object)

    for (let key in values) {
        const value = getValue(values[key])

        if (value.constructor.name === "Object") {
            result[key] = convertDescriptiveObjectToVanillaObject(value)
        } else {
            result[key] = value
        }
    }

    return result
}

/**
 * Attach the listeners to the event target and return a function which removes them.
 */
export function createListeners(target: EventTarget | Emittable, events: Array<[string, EventListener]>) {
    events.forEach(([name, listener]) => {
        target.addEventListener(name, listener)
    })

    return () => events.forEach(([name, listener]) => {
        target.removeEventListener(name, listener)
    })
}