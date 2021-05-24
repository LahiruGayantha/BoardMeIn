import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const GuestProfile = ({navigation}) => {
  const [guser, setGUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
    pic:'',
    location:'',
    bio:''
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('@guser');
      const result = JSON.parse(jsonValue);
      console.log(result);
      setLoading(false);
      setGUser({
        ...guser,
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
            username={guser.firstname + ' ' + guser.lastname}
            usermail={guser.email}
            owner="Lodger"
            btn2="View Bookings"
            onPress1={() => navigation.pop()}
            img={guser.pic}
            bio={guser.bio}
            location={guser.location}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

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

export default GuestProfile;
