import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseurl = 'https://employee-backend-iota.vercel.app'


// Helper query function to fetch api
export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async()=>{
    console.log("Function is called")
    try {
        const response = await axios.get(`${baseurl}/api/v1/employee/employees`)
        // console.log(response)
        return response.data
    } catch (error) {
        console.error("Error fetching employees:", error)     
        return error.message
    }
})
export const addEmployee = createAsyncThunk('employee/addEmployee', async(formData)=>{
    try {
        const response = await axios.post(`${baseurl}/api/v1/employee/addEmployee`, formData)
        return response.data
    } catch (error) {
        console.error("Error addEmployee :", error)     
        return error.message
    }
})

// Slices
const fetchEmployeesSlice = createSlice({
    name:'fetchEmployees',
    initialState: {
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEmployees.pending, (state)=>{
            state.status='loading'
        })
        .addCase(fetchEmployees.fulfilled, (state,action)=>{
            state.status='succeeded'
            state.data = action.payload
        })
        .addCase(fetchEmployees.rejected, (state,action)=>{
            state.status='loading'
            state.error= action.error.message
        })
    }
})

const addEmployeeSlice = createSlice({
    name:'addEmployee',
    initialState: {
        data:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addEmployee.pending, (state)=>{
            state.status='loading'
        })
        .addCase(addEmployee.fulfilled, (state,action)=>{
            state.status='succeeded'
            state.data = action.payload
        })
        .addCase(addEmployee.rejected, (state,action)=>{
            state.status='loading'
            state.error= action.error.message
        })
    }
})
export const fetchEmployeesReducer = fetchEmployeesSlice.reducer
export const addEmployeeReducer = addEmployeeSlice.reducer