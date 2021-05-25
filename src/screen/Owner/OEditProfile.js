import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import isEmpty from 'validator/lib/isEmpty';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profilepic from '../../../assest/images/profile.png';
import Loader from '../../components/Loader';
import configdata from '../../config/config';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const OEditProfile = ({navigation}) => {
  const [ouser, setOUser] = useState({
    email: '',
    _id: '',
    pic: '',
  });
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pic, setPic] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem('@ouser');
      const result = JSON.parse(jsonValue);
      console.log(result);
      setLoading(false);
      setFirstname(result.firstname)
      setLastname(result.lastname)
      setLocation(result.location)
      setBio(result.bio)
      setOUser({
        ...ouser,
        email: result.email,
        _id: result._id,
        pic: result.pic
      });
    } catch (error) {
      console.log(error);
    }
  };
  const id = ouser._id;
  const handleEdit = () => {
    setLoading(true);
    fetch(`${configdata.baseURL}/oprofile/update/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        pic: ouser.pic,
        location: location,
        bio: bio,
        id: ouser._id,
        email: ouser.email
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => fetchData(), []);
  const img = ouser.pic;
  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <Loader loading={loading} />
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Image style={styles.avatar} source={img ? {uri: img} : null} />
            <StatusBar backgroundColor="#9df9ef" barStyle="light-content" />
            <KeyboardAvoidingView>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={firstname => setFirstname(firstname)}
                value={firstname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={lastname => setLastname(lastname)}
                value={lastname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                editable={false}
                autoCapitalize="none"
                value={ouser.email}
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={location => setLocation(location)}
                value={location}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={styles.input}
                onChangeText={bio => setBio(bio)}
                value={bio}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleEdit()}>
                <Text style={styles.btntxt}>Update</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  container2: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    marginVertical: 50,
  },
  image: {
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: widthScreen,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
  },
  inputLabel: {
    fontSize: 20,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#444444',
  },
  headerTitle: {
    fontSize: 35,
    lineHeight: 35,
    height: 40,
    fontFamily: 'Gilory-Regualr',
    marginBottom: heightScreen * 0.017,
    color: '#000',
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    paddingVertical: heightScreen * 0.012,
    borderBottomWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
  },
  errtxt: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  termsBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: heightScreen * 0.033,
  },
  infoText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-Regular',
    fontWeight: '900',
    fontSize: 14,
    color: '#000',
    letterSpacing: 2,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: heightScreen * 0.057,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightScreen * 0.028,
  },
  greenInfoText: {
    color: '#00a100',
    marginLeft: 5.0,
  },
  buttonText: {
    fontFamily: 'Gilroy-LightItalic',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    height: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#6272E9',
  },
  btntxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'justify',
    padding: 2,
  },
});

export default {component: OEditProfile, name: 'OEditProfile'};
