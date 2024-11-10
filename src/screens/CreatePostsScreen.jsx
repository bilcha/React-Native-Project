import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { createPost } from "../redux/reducers/postOperation";
import { selectAuthError } from "../redux/reducers/authSelector";
import { selectUser } from "../redux/reducers/authSelector";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import InputField from "../components/InputField";
import Button from "../components/Button";
import PhotoCamera from "../components/PhotoCamera";
import GalleryModal from "../components/GalleryModal";
import LocationFetcher from "../components/PhotoLocation";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { colors, Fonts } from "../../styles/global";

const CreatePostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectAuthError);
  const user = useSelector(selectUser);
  const userId = user.userId ? user.userId : user.uid;

  console.log("message", user);

  const [namePhoto, setNamePhoto] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [isButtonTreshActive, setButtonTreshActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);

  const handleNameChange = (value) => {
    setNamePhoto(value);
  };

  const handleSelectPhoto = (uri) => {
    setPhotoUri(uri);
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    if (namePhoto && location && photoUri) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }

    if (namePhoto || location || photoUri) {
      setButtonTreshActive(true);
    } else {
      setButtonTreshActive(false);
    }
  }, [namePhoto, location, photoUri]);

  const reset = () => {
    setNamePhoto("");
    setLocation(null);
    setGeocode(null);
    setPhotoUri(null);
  };

  const onSubmit = () => {
    const newPost = {
      id: Date.now(),
      userId,
      namePhoto,
      location: {
        geo: geocode,
        name: location,
      },
      imageUrl: photoUri,
      likes: 0,
      likedBy: [],
      comments: [],
    };

    if (newPost.namePhoto && newPost.imageUrl && newPost.userId) {
      dispatch(createPost({ userId, newPost })).then((response) => {
        if (response.type === "posts/create/fulfilled") {
          Toast.show({
            type: "success",
            text1: "Пост успішно додано",
          });
          navigation.navigate("Posts");
          reset();
        } else {
          return Toast.show({
            type: "error",
            text1: "Щось пішло не так.",
            text2: `${errorMessage}`,
          });
        }
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Помилка.",
        text2: "Всі поля повинні бути заповнені",
      });
    }
  };

  return (
    <View style={styles.container}>
      <LocationFetcher setLocation={setLocation} setGeocode={setGeocode} />

      <View style={styles.imgSection}>
        <View style={styles.imgContainer}>
          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}

          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : isCameraActive ? (
            <PhotoCamera style={styles.came} onCapture={handleSelectPhoto} />
          ) : (
            <TouchableOpacity onPress={() => setCameraActive(true)}>
              <Text style={styles.activateCameraText}>Включити камеру</Text>
            </TouchableOpacity>
          )}
        </View>

        {photoUri ? (
          <Text style={styles.fotoWork} onPress={() => setPhotoUri(null)}>
            Видалити фото
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setIsGalleryOpen(true)}>
            <Text style={styles.fotoWork}>Завантажте фото</Text>
          </TouchableOpacity>
        )}
      </View>

      <GalleryModal
        visible={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />

      <View>
        <View style={styles.positionContainer}>
          <InputField
            value={namePhoto}
            onTextChange={handleNameChange}
            placeholder="Назва..."
          />
        </View>

        <View style={[styles.positionContainer, styles.positionContainerImg]}>
          <Feather
            style={styles.inputImg}
            name="map-pin"
            size={24}
            color={location ? colors.accentOrange : colors.lightGray}
          />

          <InputField
            value={location}
            placeholder="Місцевість..."
            onChangeText={setLocation}
          />
        </View>

        <Button
          onPress={() => {
            onSubmit();
          }}
          buttonSize="large"
          isButtonActive={isButtonActive}
        >
          Опубліковати
        </Button>

        <TouchableOpacity style={styles.treshBtn}>
          <Button
            buttonSize="medium"
            onPress={() => reset()}
            isButtonActive={isButtonTreshActive}
          >
            <Feather
              name="trash-2"
              size={24}
              color={!isButtonTreshActive ? colors.lightGray : colors.white}
            />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: colors.white,
    borderColor: colors.backgroundGrey,
    borderWidth: 1,
  },
  imgSection: {
    marginBottom: 48,
  },
  inputImg: {
    marginRight: 5,
  },
  imgContainer: {
    width: "100%",
    height: 240,
    backgroundColor: colors.backgroundGrey,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  came: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#BDBDBD30",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoWork: {
    fontFamily: "RobotoRegular",
    fontSize: Fonts.normal,
    color: colors.lightGray,
  },
  positionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  positionContainerImg: {
    marginRight: 20,
  },
  treshBtn: {
    alignItems: "center",
    marginTop: 120,
  },
  activateCameraText: {
    color: colors.lightGray,
    fontSize: Fonts.normal,
    fontFamily: "RobotoRegular",
  },
});
