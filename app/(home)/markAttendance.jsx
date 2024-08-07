import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../redux/Slices/employeeSlice.js";
import moment from "moment";
import { fetchAttendance } from '../../redux/Slices/attendanceSlice.js';
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DatePicker from 'react-native-date-picker';
import LoaderKit from 'react-native-loader-kit'
const MarkAttendance = React.memo(() => {
    const dispatch = useDispatch();
    const router = useRouter();

    const EmployeesData = useSelector((state) => state.fetchEmployees.data);
    const fetchEmployeesStatus = useSelector((state) => state.fetchEmployees.status);

    const AttendanceData = useSelector((state) => state.fetchAttendance.data);
    const AttendanceStatus = useSelector((state) => state.fetchAttendance.status);

    const [currentDate, setCurrentDate] = useState(moment());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (fetchEmployeesStatus === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [fetchEmployeesStatus, dispatch]);

    useEffect(() => {
        if (fetchEmployeesStatus === 'succeeded' && AttendanceStatus === 'idle') {
            dispatch(fetchAttendance(currentDate.format("YYYY-MM-DD")));
        }
    }, [currentDate, fetchEmployeesStatus, AttendanceStatus, dispatch]);

    const goToNextDay = useCallback(() => {
        setCurrentDate(prevDate => moment(prevDate).add(1, 'days'));
    }, []);

    const goToPrevDay = useCallback(() => {
        setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days'));
    }, []);

    const formatDate = date => moment(date).format("MMMM D, YYYY");

    const employeeWithAttendance = EmployeesData.map((employee) => {
        const attendanceRecord = Array.isArray(AttendanceData) ? AttendanceData.find(
            (record) => record.employeeId === employee.employeeId
        ) : null;

        return {
            ...employee,
            status: attendanceRecord ? attendanceRecord.status : "",
        };
    });

    if (fetchEmployeesStatus === 'loading' || AttendanceStatus === 'loading') {
        return (
        <View style={{minHeight:'100%', flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'black' }}>
            <Text style={{color:'#FFA500', fontWeight:'bold'}}>Loading...</Text>
        </View>
    )
    }

    if (fetchEmployeesStatus === 'failed' || AttendanceStatus === 'failed') {
        return <View style={{minHeight:'100%', flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'black' }}>
        <Text style={{color:'#FFA500', fontWeight:'bold'}}>Error loading data</Text>
    </View>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Pressable>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginVertical: 20,
                    }}
                >
                    <AntDesign
                        onPress={goToPrevDay}
                        name="left"
                        size={24}
                        color="white"
                    />
                    <Text style={{color:"white"}}>{formatDate(currentDate)}</Text>
                    <AntDesign
                        onPress={goToNextDay}
                        name="right"
                        size={24}
                        color="white"
                    />
                </View>

                <View style={{ marginHorizontal: 12 }}>
                    {employeeWithAttendance.map((item, index) => (
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: "/[user]",
                                    params: {
                                        name: item.employeeName,
                                        id: item.employeeId,
                                        salary: item?.salary,
                                        designation: item?.designation,
                                    },
                                })
                            }
                            key={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginVertical: 10,
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    padding: 10,
                                    backgroundColor: "#FFA500",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 16 }}>
                                    {item?.employeeName?.charAt(0)}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color:'white' }}>
                                    {item?.employeeName}
                                </Text>
                                <Text style={{ marginTop: 5, color: "gray" }}>
                                    {item?.designation} ({item?.employeeId})
                                </Text>
                            </View>
                            {item?.status && (
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 8,
                                        padding: 10,
                                        backgroundColor: "#FF69B4",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                                    >
                                        {item.status.charAt(0)}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </View>
            </Pressable>

            <DatePicker
                modal
                open={open}
                date={currentDate.toDate()}
                onConfirm={(date) => {
                    setOpen(false);
                    setCurrentDate(moment(date));
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </View>
    );
});

export default MarkAttendance;

const styles = StyleSheet.create({});

// 43.255.166.150/32