import React, { useState, useRef, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { colors } from "../../styles/global";

function PhotoCamera({ onCapture }) {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const camera = useRef();

  useEffect(() => {
    const requestPermissions = async () => {
      if (!cameraPermission || !libraryPermission) {
        await requestCameraPermission();
        await requestLibraryPermission();
      }
    };
    requestPermissions();
  }, [cameraPermission, libraryPermission]);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Підтвердіть надання дозволу для використання камери
        </Text>
        <Button onPress={requestCameraPermission} title="Надати дозвіл" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePhoto = async () => {
    if (!camera.current) return;

    const image = await camera.current.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);
    onCapture(image.uri);
  };

  return (
    <CameraView ref={camera} style={styles.camera} facing={facing}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialIcons
            name="flip-camera-android"
            size={24}
            color={colors.white}
          />
          <Text style={styles.text}>Повернути камеру</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color={colors.white} />
          <Text style={styles.text}>Зробити фото</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

export default PhotoCamera;

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: 489,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 15,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
  },
});
