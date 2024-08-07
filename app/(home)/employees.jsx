import { Pressable, RefreshControl, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../redux/Slices/employeeSlice.js";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SearchResult from "../../components/SearchResult.js";

const Employees = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchEmployeesData = useSelector((state) => state.fetchEmployees.data);
  const fetchEmployeesError = useSelector((state) => state.fetchEmployees.error);
  const fetchEmployeesStatus = useSelector((state) => state.fetchEmployees.status);

  useEffect(() => {
    if (fetchEmployeesStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, fetchEmployeesStatus]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchEmployees())
      .unwrap() // Unwrap promise to handle success and failure directly
      .then(() => setRefreshing(false))
      .catch(() => {
        setRefreshing(false);
        Alert.alert('Error', 'Failed to refresh data');
      });
  }, [dispatch]);

  if (fetchEmployeesStatus === 'failed') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {fetchEmployeesError}</Text>
      </View>
    );
  }

  if (fetchEmployeesStatus === 'loading') {
    return (
      <View style={{minHeight:'100%', flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'black' }}>
            <Text style={{color:'#FFA500', fontWeight:'bold'}}>Loading...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#FFA500']} // Optional: Custom color for the refresh indicator
      />
    }>
      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.backIcon}
          name="arrow-back"
          size={24}
          color="white"
        />
        <Pressable style={styles.searchContainer}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="white"
          />
          <TextInput
            value={input}
            onChangeText={setInput}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#7B7B8B"
          />
          {fetchEmployeesData.length > 0 && (
            <Pressable onPress={() => router.push("/(home)/addDetails")}>
              <AntDesign name="pluscircle" size={30} color="#FFA500" />
            </Pressable>
          )}
        </Pressable>
      </View>
      {fetchEmployeesData.length > 0 ? (
        <SearchResult data={fetchEmployeesData} input={input} setInput={setInput} />
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
          <Pressable onPress={() => router.push("/(home)/addDetails")}>
            <AntDesign style={styles.plusIcon} name="pluscircle" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    height: 70,
    justifyContent: "center",
  },
  backIcon: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "black",
    borderRadius: 3,
    height: 40,
    flex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    backgroundColor: '#1B1B1B',
    padding: 2,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    flex: 1,
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    marginTop: 30,
  },
});

export default Employees;
