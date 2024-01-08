import * as Location from "expo-location";
import { useEffect,useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setcity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  setTimeout(() => {
    setDays([
      {
        temp: { day: 19.49 },
        weather: [{ main: "Clouds", description: "broken clouds" }],
      },
      {
        temp: { day: 22.03 },
        weather: [{ main: "Clear", description: "clear sky" }],
      },
      {
        temp: { day: 19.92 },
        weather: [{ main: "Clouds", description: "few clouds" }],
      },
      {
        temp: { day: 19.39 },
        weather: [{ main: "Clouds", description: "overcast clouds" }],
      },
      {
        temp: { day: 19.7 },
        weather: [{ main: "Clouds", description: "few clouds" }],
      },
      {
        temp: { day: 17.19 },
        weather: [{ main: "Clouds", description: "broken clouds" }],
      },
      {
        temp: { day: 17.32 },
        weather: [{ main: "Rain", description: "light rain" }],
      },
      {
        temp: { day: 18.04 },
        weather: [{ main: "Clouds", description: "few clouds" }],
      },
    ]);
  }, 2000);

  const API_KEY = "3ec3b59f14f08e45d16702c5f6e927b1";

  const getWeather = async() => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if(!granted){
        setOk(false)
    }

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({latitude,longitude} ,{useGoogleMaps:false});
    setcity(location[0].city);


      const { list } = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
        )
      ).json();
      const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));
      setDays(filteredList);



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
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{marginTop:10}} size="large"/>
          </View>
        ) : (
          days.map((day,index)=>{
                <View key={index} style={styles.day}>
                      <Text style={styles.temp}>{day.temp}</Text>
                      <Text style={styles.description}>{day.weather[0].main}</Text>
                </View>
          })
        )}
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
