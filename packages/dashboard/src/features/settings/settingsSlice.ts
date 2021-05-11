import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isDarkMode: true
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Partial<typeof initialState>>) => {
            for (let key in action.payload) {
                if (!(key in state)) {
                    return
                }

                (state as any)[key] = (action.payload as any)[key]
            }
        }
    }
})

export const { set } = settingsSlice.actions

export default settingsSlice.reducer
