import * as Location from "expo-location";
import { useEffect,useState } from "react";
import { StyleSheet, Dimensions, Text, View, ScrollView } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, Setcity] = useState("Loading...");
  const [days, SetDays] = useState([]);
  const [ok, setOk] = useState(true);

  const API_KEY = "3ec3b59f14f08e45d16702c5f6e927b1";

  const getWeather = async() => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if(!granted){
        setOk(false)
    }

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({latitude,longitude} ,{useGoogleMaps:false});
    Setcity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();
    console.log(json)
  };

  useEffect(() => { 

    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    fontSize: 68,
    fontWeight: 500,
  },
  weather: {},
  day: {
    width: 390,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -10,
    fontSize: 50,
  },
});

// npx expo login
