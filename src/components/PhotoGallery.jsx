import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { colors } from "../../styles/global";

export default function PhotoGallery({ onSelectPhoto }) {
  const [photos, setPhotos] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: ["photo"],
          sortBy: ["creationTime"],
          first: 40,
        });
        setPhotos(media.assets);
      }
    })();
  }, []);

  if (!hasPermission) {
    return <Text style={styles.noPhotosText}>Немає доступу до медіа</Text>;
  }

  if (photos.length === 0) {
    return <Text style={styles.noPhotosText}>Фотографі не знайдена</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectPhoto(item.uri)}>
            <Image source={{ uri: item.uri }} style={styles.photos} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photos: {
    width: 180,
    height: 140,
    borderRadius: 8,
    margin: 4,
  },
  noPhotosText: {
    fontSize: 16,
    color: colors.lightGray,
    marginTop: 20,
    textAlign: "center",
  },
});
