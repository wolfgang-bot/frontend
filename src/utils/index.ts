import React from "react"

import { DescriptiveObject } from "../config/types"

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
    const keys: Record<string, any> = {}

    function _create(data: DescriptiveObject, keyCarry = "", depth = 0) {
        const elements: React.ReactElement[] = []

        for (let key in data) {
            const value = data[key].value
            const desc = data[key].description

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
                    children: _create(value as DescriptiveObject, backtraceKey + KEY_DELIMITER, depth + 1)
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
 * Attach the listeners to the event target and return a function which removes them.
 */
export function createListeners(target: EventTarget, events: Array<[string, EventListenerOrEventListenerObject]>) {
    events.forEach(([name, fn]) => {
        target.addEventListener(name, fn, false)
    })

    return () => events.forEach(([name, fn]) => {
        target.removeEventListener(name, fn, false)
    })
}