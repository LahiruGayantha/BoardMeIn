import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

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
  const [loading, setLoading] = useState(false);

  const viewProp = () => {
    navigation.navigate('OwnerPropView', {
      id: ouser._id,
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('@ouser');
      const result = JSON.parse(jsonValue);
      console.log(result.email);
      setLoading(false);
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
    <>
      <Loader loading={loading} />
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
    </>
  );
};
//
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: widthScreen,
    height: heightScreen,
    alignItems: 'flex-start',
    paddingTop: heightScreen * 0.057,
    backgroundColor: '#9EFEB4',
  },
});

export default {component: OwnerProfile, name: 'OwnerProfile'};
