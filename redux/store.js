import {configureStore} from '@reduxjs/toolkit'
import {fetchEmployeesReducer,addEmployeeReducer} from './Slices/employeeSlice.js'
import {fetchAttendanceReducer,addAttendanceReducer,attendanceReportReducer} from './Slices/attendanceSlice.js'
const store = configureStore({
    reducer:{
        // For each employee
        fetchEmployees:fetchEmployeesReducer,
        addEmployee:addEmployeeReducer,

        // For attendance
        fetchAttendance:fetchAttendanceReducer,
        addAttendance:addAttendanceReducer,
        attendanceReport:attendanceReportReducer
    }
})
export {store}