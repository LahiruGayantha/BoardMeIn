import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import configdata from '../../config/config';
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
      //const result = JSON.parse(jsonValue);
      const id = jsonValue
      console.log(id);
      fetch(`${configdata.baseURL}/auth/ownerlogin`)
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
            onPress1={() => navigation.navigate('ChatA',{screen: 'Chat'})}
            onPress2={() => viewProp()}
            img={ouser.pic}
            bio={ouser.bio}
            location={ouser.location}
            nav={() => navigation.navigate('Owner',{screen: 'OEditProfile'})}
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
    backgroundColor: '#9EFE',
  },
});

export default {component: OwnerProfile, name: 'OwnerProfile'};
