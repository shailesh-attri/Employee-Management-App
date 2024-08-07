import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { attendanceReport } from "../../redux/Slices/attendanceSlice";
import { useSelector, useDispatch } from "react-redux";

const Summary = () => {
    const dispatch = useDispatch();
    const attendanceReportData = useSelector(state => state.attendanceReport.data.report);
    const attendanceReportStatus = useSelector(state => state.attendanceReport.status);
    const attendanceReportError = useSelector(state => state.attendanceReport.error);

    const [currentDate, setCurrentDate] = useState(moment());

    const goToNextMonth = () => {
        const nextMonth = moment(currentDate).add(1, "months");
        setCurrentDate(nextMonth);
    };

    const goToPrevMonth = () => {
        const prevMonth = moment(currentDate).subtract(1, "months");
        setCurrentDate(prevMonth);
    };

    const formatDate = (date) => {
        return date.format("MMMM, YYYY");
    };

    useEffect(() => {
        if (attendanceReportStatus === 'idle') {
            const data = {
                month: currentDate.month() + 1, // moment months are 0-based
                year: currentDate.year(),
            };
            dispatch(attendanceReport(data));
        }
    }, [attendanceReportStatus, dispatch, currentDate]);

    if (attendanceReportStatus === 'loading') {
        return (
            <View style={{ minHeight: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                <Text style={{ color: '#FFA500', fontWeight: 'bold' }}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginVertical: 20,
                }}
            >
                <AntDesign
                    onPress={goToPrevMonth}
                    name="left"
                    size={24}
                    color="white"
                />
                <Text style={{ color: "white" }}>{formatDate(currentDate)}</Text>
                <AntDesign
                    onPress={goToNextMonth}
                    name="right"
                    size={24}
                    color="white"
                />
            </View>

            <View style={{ marginHorizontal: 12 }}>
                {attendanceReportData?.map((item, index) => (
                    <View key={index} style={{ marginVertical: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
                                    {item?.name?.charAt(0)}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
                                    {item?.name}
                                </Text>
                                <Text style={{ marginTop: 5, color: "gray" }}>
                                    {item?.designation} ({item?.employeeId})
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: "#A1FFCE", borderRadius: 5 }}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>P</DataTable.Title>
                                    <DataTable.Title>A</DataTable.Title>
                                    <DataTable.Title>HD</DataTable.Title>
                                    <DataTable.Title>H</DataTable.Title>
                                    <DataTable.Title>NW</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{item?.present}</DataTable.Cell>
                                    <DataTable.Cell>{item?.absent}</DataTable.Cell>
                                    <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                                    <DataTable.Cell>1</DataTable.Cell>
                                    <DataTable.Cell>8</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Summary;

const styles = StyleSheet.create({});
