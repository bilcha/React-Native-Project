import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";
import ButtomTabNavigator from "./ButtomTabNavigator";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const StackNavigator = () => {

  const user = useSelector((state) => state.auth.isLogged);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  return (
    <Stack.Navigator initialRouteName="Login">
      {user ? (
        <Stack.Screen
          options={{ presentation: "modal", headerShown: false }}
          name="Home"
          component={ButtomTabNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            options={{ presentation: "modal", headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ presentation: "modal", headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
        </>
      )}
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Коментарі",
          headerTitleAlign: "center",
        }}
        name="Comment"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Мапа",
          headerTitleAlign: "center",
        }}
        name="Maps"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
