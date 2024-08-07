import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SearchResult = ({ data, input, setInput }) => {
  // Filter data based on input
  const filteredData = data.filter(item => 
    item?.employeeName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <View style={{ padding: 10 }}>
      {filteredData.length === 0 ? (
        <>
        <Text style={styles.noResultsText}>No such employee found in Database</Text>
        <Text style={styles.noResultsText}>Add your employee by tapping on + Button</Text>
        </>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View
              style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
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

              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }}>
                  {item?.employeeName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item?.employeeId.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchResult;
