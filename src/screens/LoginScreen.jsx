import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";

import Button from "../components/Button";
import Inputs from "../components/InputMain";
import ImageBG from "../../assets/images/PhotoBG.jpg";
import { colors, Fonts } from "../../styles/global";
import { loginDB } from "../redux/reducers/authOperation";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../redux/reducers/authSelector";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (email && password) {
      setButtonActive(true);
      return;
    }
    setButtonActive(false);
  }, [email, password]);

  const navi = () => {
    navigation.navigate("Registration");
  };

  const signIn = () => {
    if (email && password) {
      dispatch(
        loginDB({
          inputEmail: email,
          inputPassword: password,
        })
      ).then((response) => {
        if (response.type === "auth/login/fulfilled") {
          Toast.show({
            type: "success",
            text1: `${email}`,
            text2: "Ви успішно увійшли!",
          });
          reset();
        } else {
          return Toast.show({
            type: "error",
            text1: "Щось пішло не так.",
            text2: `${errorMessage}`,
          });
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={ImageBG} style={styles.imageBg}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.contentBox}>
              <Text style={styles.contentTitle}>Увійти</Text>

              <Inputs
                value={email}
                onTextChange={handleEmailChange}
                placeholder="Адреса електронної пошти"
                showPassword={true}
                keyboard="email-address"
              />

              <View style={styles.inputPass}>
                <Inputs
                  value={password}
                  onTextChange={handlePasswordChange}
                  placeholder="Пароль"
                  keyboard="numeric"
                  showPassword={showPassword}
                />
                <TouchableOpacity
                  style={styles.passHide}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.passHideText}>
                    {showPassword ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                buttonSize="large"
                isButtonActive={isButtonActive}
                onPress={signIn}
              >
                Увійти
              </Button>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Немає акаунту?</Text>
                <TouchableOpacity onPress={navi}>
                  <Text style={[styles.text, styles.textSolid]}>
                    Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  contentBox: {
    width: "100%",
    height: "75%",
    backgroundColor: colors.white,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  contentTitle: {
    fontFamily: "RobotoMedium",
    fontSize: Fonts.extraLarge,
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    backgroundColor: colors.backgroundGrey,
    width: "100%",
    height: 50,
    padding: 16,
    marginBottom: 16,
  },
  inputPass: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    marginBottom: 43,
  },
  passHide: {
    position: "relative",
    left: -90,
    top: 15,
  },
  passHideText: {
    color: colors.blue,
  },
  textContainer: {
    flexDirection: "row",
  },
  text: {
    color: colors.blue,
    fontFamily: "RobotoRegular",
    fontSize: Fonts.normal,
  },
  textSolid: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
