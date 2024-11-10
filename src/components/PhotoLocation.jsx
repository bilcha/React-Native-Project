import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

const PhotoLocation = ({ setLocation, setGeocode }) => {
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Дозвіл на локацію",
            "Додаток потребує доступу до вашого місцеположення. Увімкніть доступ у налаштуваннях пристрою."
          );
          return;
        }

        let geoLoc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setGeocode(geoLoc);

        const grantedLocation = await Location.reverseGeocodeAsync(
          geoLoc.coords
        );
        const country = grantedLocation[0]?.country || "Невідомо";
        const city = grantedLocation[0]?.city || "Невідомо";
        setLocation(`${country}, ${city}`);
      } catch (error) {
        Alert.alert(
          "Помилка отримання локації",
          "Переконайтеся, що GPS увімкнено та надано доступ до локації для додатку."
        );
        console.error("Помилка отримання локації:", error);
      }
    };

    fetchLocation();
  }, []);

  return null;
};

export default PhotoLocation;
