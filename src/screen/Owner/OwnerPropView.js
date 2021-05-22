import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import configdata from '../../config/config';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const OwnerPropView = ({props, navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [propty, setPropty] = useState([]);
  const oid = route.params.id;

  useEffect(() => getData(), []);

  const getData = () => {
    const abortController = new AbortController();
    const signal = AbortController.signal;

    setLoading(true);
    fetch(`${configdata.baseURL}/properties/ownerproperty/${oid}`, {
      signal: signal,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        setPropty(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

    return function cleanup() {
      abortController.abort();
    };
  };

  const ItemView = ({item}) => {
    const img = item.images.url;
    return (
      // Flat List Item
      <Text>{item._id}</Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const addPlace = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*       <View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.btntxt} onPress={() => addPlace()}>
            <Icon name="plus" size={30} color="#00f" />
            Add new place
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: '#323232',
          borderBottomWidth: 1,
        }}
      />
      <Text>Previous Add-ons</Text>
      <Text>{propty._id}</Text> */}
      <View style={styles.container}>
        <FlatList
          data={propty}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={false}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default {component: OwnerPropView, name: 'OwnerPropView'};
