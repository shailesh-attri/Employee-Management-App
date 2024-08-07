import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const baseurl = 'https://employee-backend-iota.vercel.app';

// Helper query function to fetch api
export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance', async (currentDate) => {
    console.log("Fetching Attendance", currentDate);
    try {
        const response = await axios.get(`${baseurl}/api/v1/attendance/fetchAttendance`, {
            params: {
                date: currentDate, // Corrected date format
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance:", error);
        throw error;
    }
});

export const addAttendance = createAsyncThunk('attendance/addAttendance', async (data) => {
    try {
        const response = await axios.post(`${baseurl}/api/v1/attendance/addAttendance`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding attendance:", error);
        throw error;
    }
});

export const attendanceReport = createAsyncThunk('attendance/attendanceReport', async (data) => {
    try {
        const response = await axios.get(`${baseurl}/api/v1/attendance/attendance-report-all-employees`, {
                params: {
                  month: data.month,
                  year: data.year,
                },
            
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance report:", error);
        throw error;
    }
});

// Slices
const fetchAttendanceSlice = createSlice({
    name: 'fetchAttendance',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

const addAttendanceSlice = createSlice({
    name: 'addAttendance',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAttendance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(addAttendance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

const attendanceReportSlice = createSlice({
    name: 'attendanceReport',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(attendanceReport.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(attendanceReport.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(attendanceReport.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const fetchAttendanceReducer = fetchAttendanceSlice.reducer;
export const addAttendanceReducer = addAttendanceSlice.reducer;
export const attendanceReportReducer = attendanceReportSlice.reducer;
