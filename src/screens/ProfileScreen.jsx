import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { selectUser } from "../redux/reducers/authSelector";
import { getPosts, toggleLike } from "../redux/reducers/postOperation";
import { logoutDB, updateAvatarDB } from "../redux/reducers/authOperation";
import {
  selectUsersPosts,
  selectIsLoading,
} from "../redux/reducers/postSelector";

import Posts from "../components/Posts";
import LogOutButton from "../components/LogOutButton";

import { colors, Fonts } from "../../styles/global";
import ImageBG from "../../assets/images/PhotoBG.jpg";
import AddAvatarImg from "../../assets/images/add.png";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const userId = user.uid;
  const selectPostsByUserId = selectUsersPosts(userId);
  const posts = useSelector((state) => selectPostsByUserId(state));

  const [newAvatarUri, setNewAvatarUri] = useState("");

  const changeAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return Toast.show({
        type: "info",
        text1: "Access to photos is required to update your avatar.",
      });
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewAvatarUri(result.assets[0].uri);
      dispatch(updateAvatarDB(result.assets[0].uri));
    }
  };

  const handleLogout = () => {
    dispatch(logoutDB());
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [user.photoURL]);

  const handleLikeToggle = (postId) => {
    dispatch(toggleLike({ postId, userId }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={ImageBG} style={styles.imageBg}>
        <View style={styles.contentBox}>
          <View style={styles.avatarBox}>
            <Image
              style={styles.avatarImg}
              source={{ uri: newAvatarUri ? newAvatarUri : user.photoURL }}
            />

            <TouchableOpacity
              onPress={() => changeAvatar()}
              style={styles.avatarAdd}
            >
              <Image style={styles.tinyLogo} source={AddAvatarImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.exitBtn}>
            <LogOutButton onPress={handleLogout} />
          </View>

          <Text style={styles.contentTitle}>{user.displayName}</Text>

          <View style={styles.fotoList}>
            {isLoading && (
              <ActivityIndicator
                size="150"
                style={styles.loaders}
                color={colors.accentOrange}
              />
            )}
            {!isLoading && (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <Posts
                    onPressComment={() =>
                      navigation.navigate("Comment", { postId: item.id })
                    }
                    onPressLike={() => handleLikeToggle(item.id)}
                    onPressMap={() => navigation.navigate("Maps", { posts })}
                    postImg={item.imageUrl}
                    postName={item.namePhoto}
                    postComment={item.comments.length}
                    location={item.location.name}
                    postLike={item.likes}
                    isLiked={item.likedBy && item.likedBy.includes(userId)}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaders: {
    marginTop: "50%",
  },
  imageBg: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    width: "100%",
    height: "80%",
    backgroundColor: colors.white,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.backgroundGrey,
    borderRadius: 16,
    position: "relative",
    top: -60,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "relative",
  },
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 80,
  },
  exitBtn: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  contentTitle: {
    fontFamily: "RobotoMedium",
    fontSize: Fonts.extraLarge,
    top: -30,
  },
  fotoList: {
    width: "100%",
    height: 500,
  },
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 80,
  },
});
