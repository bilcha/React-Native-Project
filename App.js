import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import "react-native-gesture-handler";
import store from "./src/redux/store.jsx";
import { authStateChanged } from "./src/utils/authListener.js";
import Toast from "react-native-toast-message";

export default function App() {
  const [loaded, error] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || error) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authStateChanged(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackNavigator />
      <Toast />
    </NavigationContainer>
  );
};
