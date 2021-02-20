import React, { useState, useEffect } from "react"
import { Tabs, Tab, Paper } from "@material-ui/core"

function GroupSelect({ groups, onChange, className }: {
    groups: string[],
    onChange: (group: string) => void,
    className?: string
}) {
    const [value, setValue] = useState(0)

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        onChange(groups[value])

        // eslint-disable-next-line
    }, [value])

    return (
        <Paper
            variant="outlined"
            square
            className={className}    
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"

            >
                {groups.map(group => (
                    <Tab label={group} key={group}/>
                ))}
            </Tabs>
        </Paper>
    )
}

export default GroupSelect