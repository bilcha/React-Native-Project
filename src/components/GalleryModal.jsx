import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import PhotoGallery from "./PhotoGallery";
import Button from "./Button";
import { colors } from "../../styles/global";

function GalleryModal({ visible, onClose, onSelectPhoto }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <PhotoGallery
            style={styles.lists}
            onSelectPhoto={(uri) => {
              onSelectPhoto(uri);
              onClose();
            }}
          />
        </View>
        <Button onPress={onClose} isButtonActive={true} buttonSize="large">
          Закрити
        </Button>
      </View>
    </Modal>
  );
}

export default GalleryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 16,
  },
  lists: {
    flex: 1,
    width: "100%",
  },
});
