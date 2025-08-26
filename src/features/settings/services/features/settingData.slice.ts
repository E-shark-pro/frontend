// store/features/org/orgSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Theme, Plan, Tenant } from "@/types/tenant.type"



const initialState: Tenant = {
    id: null,
    name: "",
    slug: "",
    logoUrl: "",
    plan: null,
    owner: null,
    settings: null
}

const orgSlice = createSlice({
    name: "org",
    initialState,
    reducers: {
        setOrg(state, action: PayloadAction<Tenant>) {
            return { ...state, ...action.payload }
        },
        updateTheme(state, action: PayloadAction<Theme>) {
            if (state.settings) {
                state.settings.theme = action.payload
            }
        },
        clearOrg() {
            return initialState
        }
    }
})

export const { setOrg, updateTheme, clearOrg } = orgSlice.actions
export default orgSlice.reducer
