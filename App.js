
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>Incheon</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  cityname:{
       fontSize:68,
       fontWeight:500
  },
  weather:{
    flex:3,
  },
  day:{
    flex:1,
    backgroundColor:"teal",
    alignItems:"center"
  },
  temp:{
    marginTop:50,
    fontSize:178
  },
  description:{
    marginTop:-10,
    fontSize:50
  }
});


// npx expo login