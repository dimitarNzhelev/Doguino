import { StyleSheet, Text, TouchableOpacity, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductInformation from "./screens/ProductInformation";
import RegisterScreen from "./screens/RegisterPage";
import RegisterCollar from "./screens/RegisterCollarScreen";
import React, { useState, useEffect } from "react";
import useLocation from "./getLocation";

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    async function fetchLocation() {
      const locationData = await useLocation();
      setLocation(locationData);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            headerTitle: "Home",
            headerStyle: {
              backgroundColor: "#369399",
            },
            headerShadowVisible: true,
            headerLeft: () => "",
            headerTitleStyle: {
              fontSize: 21,
              fontWeight: "400",
              color: "lightgrey",
            },
            headerRight: () => (
              <HomeScreenSignOutButton navigation={navigation} />
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Product"
          component={ProductInformation}
          initialParams={{ location }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterCollar"
          component={RegisterCollar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreenSignOutButton({ navigation }) {
  const signoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableOpacity onPress={signoutHandler}>
      <Text style={{ color: "lightgrey", fontSize: 19 }}>Sign out</Text>
    </TouchableOpacity>
  );
}
