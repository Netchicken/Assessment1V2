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
  const citiesDropdownRef = useRef({});

  const selectDataHandler = () => {
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
    //https://openweathermap.org/current

    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=3f2e5dbaf5cf57927bf90f6b1acf3206

    selectedCity;
  };
  const [selectedCity, setSelectedCity] = useState(null); //selected city
  const [allCities, setAllCities] = useState(countryDataSmall); //dropdown data
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
            return item;
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
