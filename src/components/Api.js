import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Colors,
  Button,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {countryDataSmall} from '../../assets/citiesSmall';
import SelectDropdown from 'react-native-select-dropdown';

export default function Api({navigation, route}) {
  //https://home.openweathermap.org/
  //3f2e5dbaf5cf57927bf90f6b1acf3206   api key
  //https://openweathermap.org/current
   const [selectedCity, setSelectedCity] = useState(null); //selected city
  const [allCities, setAllCities] = useState(countryDataSmall); //dropdown data
  const citiesDropdownRef = useRef({});

  const selectDataHandler = () => {
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
    //https://openweathermap.org/current

    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=3f2e5dbaf5cf57927bf90f6b1acf3206

    //https://programmingwithmosh.com/react-native/make-api-calls-in-react-native-using-fetch/

    const lat = selectedCity.CapitalLatitude.toString();
    const lon = selectedCity.CapitalLongitude.toString();
    getWeatherFromApi(lat, lon);

    fetch(
      'https:/api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=3f2e5dbaf5cf57927bf90f6b1acf3206',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
        }),
      },


    );
  };

  const getWeatherFromApi = async (props) => {
    let response = await fetch(
       'https:/api.openweathermap.org/data/2.5/weather?lat=' +
        props.lat +
        '&lon=' +
        props.lon +
        '&appid=3f2e5dbaf5cf57927bf90f6b1acf3206'
    );
    let json = await response.json();
    return json.movies;
  }
};
 
  return (
    <View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => selectDataHandler()}
          style={styles.UpdateButton}>
          <Text style={styles.UpdateButtonText}>Show Weather</Text>
        </TouchableOpacity>

        <SelectDropdown
          ref={citiesDropdownRef}
          data={allCities}
          onSelect={(selectedItem, index) => {}}
          defaultButtonText={'Select city'}
          buttonTextAfterSelection={(selectedItem, index) => {
            setSelectedCity(selectedItem);

            //https://www.npmjs.com/package/react-native-select-dropdown
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.CapitalName;
          }}
        />

        <ScrollView>
          {countryDataSmall.map((item, index) => {
            return (
              <View>
                <Text
                  key={index}
                  style={[
                    styles.item,
                    {marginLeft: 50, alignSelf: 'flex-end'},
                  ]}>
                  {item.CapitalName}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
  },

  UpdateButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpdateButtonText: {
    color: '#fff',
  },
  DeleteButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeleteButtonText: {
    color: '#fff',
  },
});

// {
//   "coord": {
//     "lon": 139,
//     "lat": 35
//   },
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 283.88,
//     "feels_like": 282.52,
//     "temp_min": 283.88,
//     "temp_max": 283.88,
//     "pressure": 1011,
//     "humidity": 58
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 2.76,
//     "deg": 58,
//     "gust": 5.14
//   },
//   "clouds": {
//     "all": 0
//   },
//   "dt": 1647357046,
//   "sys": {
//     "type": 2,
//     "id": 2019346,
//     "country": "JP",
//     "sunrise": 1647377649,
//     "sunset": 1647420692
//   },
//   "timezone": 32400,
//   "id": 1851632,
//   "name": "Shuzenji",
//   "cod": 200
// }
