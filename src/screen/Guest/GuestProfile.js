import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const GuestProfile = ({navigation}) => {
  const [guser, setGUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
  });

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@guser');
      const result = JSON.parse(jsonValue);
      console.log(result)
      setGUser({
        ...guser,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        _id: result._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => fetchData(), []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Profile
        username={guser.firstname + ' ' + guser.lastname}
        usermail={guser.email}
        owner="Lodger"
        btn2="View Bookings"
        onPress1={() => navigation.pop()}
      />
    </SafeAreaView>
  );
};

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

export default GuestProfile;
