import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../styles/global";

const Button = ({ children, onPress, isButtonActive, buttonSize }) => {
  return (
    <TouchableOpacity
      style={[
        isButtonActive ? styles.button : styles.disabledButton,
        buttonSize === "small"
          ? styles.buttonSmall
          : buttonSize === "medium"
          ? styles.buttonMedium
          : styles.buttonLarge,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: isButtonActive ? colors.white : colors.lightGray },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accentOrange,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: colors.backgroundGrey,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonSmall: {
    width: 34,
    height: 34,
  },
  buttonMedium: {
    width: 70,
    height: 40,
  },
  buttonLarge: {
    width: "100%",
    height: 51,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
