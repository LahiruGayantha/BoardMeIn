import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OwnerPropView from './OwnerPropView';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const OwnerProfile = ({navigation}) => {
  const [ouser, setOUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
    pic: '',
    bio: '',
  });

  const viewProp = () => {
    navigation.navigate('OwnerPropView', {
      id: ouser._id,
    });
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ouser');
      const result = JSON.parse(jsonValue);
      console.log(result.email)
      setOUser({
        ...ouser,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        _id: result._id,
        pic: result.pic,
        location: result.location,
        bio: result.bio,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => fetchData(), []);
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Profile
        username={ouser.firstname + ' ' + ouser.lastname}
        usermail={ouser.email}
        owner="Owner"
        btn2="View my rent places"
        onPress1={() => navigation.pop()}
        onPress2={() => viewProp()}
        img={ouser.pic}
        bio={ouser.bio}
        location={ouser.location}
        nav={() => Alert.alert('ok')}
        iname="home-city"
      />
      </View>
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: widthScreen,
    alignItems: 'flex-start',
    paddingHorizontal: widthScreen * 0.073,
    paddingBottom: heightScreen * 0.057,
    paddingTop: heightScreen * 0.057,
  },
});

export default {component: OwnerProfile, name: 'OwnerProfile'};
