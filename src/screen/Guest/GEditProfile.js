import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import isEmpty from 'validator/lib/isEmpty';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profilepic from '../../../assest/images/profile.png'
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const GEditProfile = ({navigation}) => {
  const [guser, setGUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
  });
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@guser');
      const result = JSON.parse(jsonValue);
      console.log(result);
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

  const handleedit = () => {
    if (
      isEmpty(firstname) ||
      isEmpty(lastname)
    ) {
      alert('Fields cannot be empty');
      return;
    } else if (!equals(password, password2)) {
      alert('Passwords do not match');
      return;
    } else {
      setLoading(true);
      //....
    }
  };
  useEffect(() => fetchData(), []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <Loader loading={loading} />
        <ScrollView style={styles.container}>
          <Image style={styles.logo} source={Profilepic} />
          <View style={styles.form}>
            <StatusBar backgroundColor="#9df9ef" barStyle="light-content" />
            <KeyboardAvoidingView behavior={behavior}>
            <Image style={styles.logo} source={logo} />
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={firstname => setFirstname(firstname)}
                value={guser.firstname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={lastname => setLastname(lastname)}
                value={guser.lastname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                editable={false}
                autoCapitalize="none"
                value={guser.email}
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </>
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

export default {component: GEditProfile, name: 'GeditProfile'};
