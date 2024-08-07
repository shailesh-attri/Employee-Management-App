import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
const Index = () => {
  const router = useRouter()
  const CustomButton = ({ text,path }) => {
    return (
      <Pressable className="bg-gray-700 rounded-lg p-2.5 flex flex-row  items-center my-2.5"
      onPress={() => {
        if (path) {
          router.push(path);
        }
      }}
      >
        <View
          style={{
            padding: 7,
            width: 45,
            height: 45,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="newspaper" color="white" size={30} />
        </View>
        <Text
          className=""
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "600",
            flex: 1,
            color: "white",
          }}
        >
          {text}
        </Text>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="chevron-forward" color="white" size={30} />
        </View>
      </Pressable>
    );
  };
  const CustomButton2 = ({ Icon, text, name }) => {
    return (
      <View
        style={{
          backgroundColor: "#f79d00",
          borderRadius: 6,
          padding: 6,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          margin: 6, 
          minWidth: '45%', 
          maxWidth: '48%',
          minHeight: 100,
        }}
      >
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomIcon Icon={Icon} name={name} />
        </View>
        <Text style={{ marginTop: 7 }}>{text}</Text>
      </View>
    );
  };
  const CustomIcon = ({ Icon, name }) => {
    return <Icon name={name} color="white" size={30} />;
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View
          style={styles.innerContainer}
          className="flex flex-row  items-center justify-between"
        >
          <Icon name="bar-chart" color="white" size={30} />
          <Text style={styles.text}>Employee Management System</Text>
          <Icon name="lock-closed" color="white" size={30} />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Pressable
          onPress={()=>router.push('/(home)/employees')}
            style={{
              backgroundColor: "#FFA500",
              padding: 12,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="people" color="white" size={30} />
            </View>
            <Text style={{ marginTop: 7, fontWeight: "600" }}>
              Employee List
            </Text>
          </Pressable>
          <Pressable
          onPress={()=>router.push('/(home)/markAttendance')}
            style={{
              backgroundColor: "#FFA500",
              padding: 12,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="people" color="white" size={30} />
            </View>
            <Text style={{ marginTop: 7, fontWeight: "600" }}>
              Mark Attendance
            </Text>
          </Pressable>
        </View>
        <View className="">
          <View className="mt-5   rounded-lg">
            <CustomButton text="Attendance Report" />
            <CustomButton text="Summary Report" path="/(home)/summary"/>
            <CustomButton text=" All Generate Reports" />
            <CustomButton text="Overtime Employees" />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <CustomButton2
            Icon={MaterialCommunityIcons}
            name="guy-fawkes-mask"
            text="Attendance Criteria"
          />
          <CustomButton2
            Icon={Feather}
            name="bar-chart"
            text="Increased Workflow"
          />
          <CustomButton2
            Icon={MaterialCommunityIcons}
            name="guy-fawkes-mask"
            text="Cost Savings"
          />
           <CustomButton2
            Icon={Feather}
            name="bar-chart"
            text="Employee Performance"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  innerContainer: {
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
