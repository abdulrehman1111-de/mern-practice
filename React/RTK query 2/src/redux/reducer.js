import { createSlice } from "@reduxjs/toolkit";

export const myreducer = createSlice({
    name: "myreducer",
    initialState: {resource: "posts"},
    reducers: {
        setResource: (state, action)=>{
            state.resource = action.payload
        }
    }
})

export const {setResource} = myreducer.actions







