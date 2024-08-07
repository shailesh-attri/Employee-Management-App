import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
const RootLayout = () => {
  return (
    <Provider store={store}>
    <Stack style={styles.container} screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="employees" />
      <Stack.Screen name="addDetails" />
      <Stack.Screen name="markAttendance" />
      <Stack.Screen name="[user]" />
      <Stack.Screen name="summary" />
    </Stack>
    </Provider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000000'
  }
});
