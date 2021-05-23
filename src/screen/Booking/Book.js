import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configdata from '../../config/config';

const payHere = require('../../../assest/images/payHerelogo.png');
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const Book = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState([]);
  const oid = route.params.oid;
  const img = route.params.img;
  const price = route.params.price;
  const type = route.params.type;
  const location = route.params.location;
  const address = route.params.address;
  const getDetails = () => {
    try {
      const abortController = new AbortController();
      const signal = AbortController.signal;
      console.log(oid);
      fetch(`${configdata.baseURL}/oprofile/${oid}`, {signal: signal})
        .then(response => response.json())
        .then(responseJson => {
          setOwner(responseJson.data);
        });
      return function cleanup() {
        abortController.abort();
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getDetails(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking details</Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.subtitle}>Place Owner</Text>
        <View style={styles.valuecontainer}>
          <Text style={styles.value}>
            {owner.firstname} {owner.lastname}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Place type</Text>
        <View style={styles.valuecontainer}>
          <Text style={styles.value}>{type}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Place address</Text>
        <View style={styles.valuecontainer}>
          <Text style={styles.value}>{address}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Payment</Text>
        <View style={styles.valuecontainer}>
          <Text style={styles.value}>
            {price}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => Alert.alert('Connect to the payment gateway')}>
          <Image style={styles.image} source={payHere} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    paddingTop: heightScreen * 0.001,
    paddingBottom: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.05,
  },
  line: {borderBottomColor: '#232323', borderBottomWidth: 4, paddingTop: 10},
  row: {
    alignItems: 'flex-start',
    padding: 10,
  },
  image: {
    width: 150,
    height: 50,
  },
  title: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 25,
    color: '#004',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#323232',
  },
  valuecontainer: {
    borderWidth: 2,
    borderColor: '#004',
    width: widthScreen * 0.9,
    padding: 10,
    marginTop: 10,
  },
});

export default {component: Book, name: 'Book'};
