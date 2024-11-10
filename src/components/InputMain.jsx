import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../styles/global";

const InputMain = ({
  placeholder,
  keyboard,
  showPassword,
  autoComplete,
  onTextChange,
  value,
}) => {
  const normalStyle = {
    borderColor: colors.border,
    color: colors.lightGray,
    backgroundColor: colors.backgroundGrey,
  };

  const focusStyle = {
    borderColor: colors.accentOrange,
    color: colors.darkText,
    backgroundColor: colors.white,
  };

  const [inputFocus, setInputFocus] = useState({ ...normalStyle });

  return (
    <TextInput
      onChangeText={onTextChange}
      value={value}
      secureTextEntry={showPassword ? false : true}
      onFocus={() => {
        setInputFocus({ ...focusStyle });
      }}
      onBlur={() => {
        setInputFocus({ ...normalStyle });
      }}
      style={[styles.input, inputFocus]}
      placeholder={placeholder}
      placeholderTextColor={colors.lightGray}
      keyboardType={keyboard}
      autoComplete={autoComplete}
    />
  );
};

export default InputMain;

const styles = StyleSheet.create({
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
});
