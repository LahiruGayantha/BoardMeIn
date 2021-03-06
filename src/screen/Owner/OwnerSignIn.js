import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {validate} from 'validate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configdata from '../../config/config';
import Loader from '../../components/Loader';
import OwnerProfile from './OwnerProfile';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const OwnerSignIn = ({navigation}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@ouser', jsonValue);
    } catch (e) {
      console.log('Error with storing data');
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = () => {
    setErrorMsg('');
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
//
    fetch(`${configdata.baseURL}/auth/ownerlogin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson);
        if (responseJson.success == true) {
          storeData(responseJson.user);
          AsyncStorage.setItem('role', responseJson.user.role.toString());
          console.log(responseJson.user.email);
          navigation.navigate('Owner', { screen: 'OwnerProfile' });
        } else {
          setErrorMsg(responseJson.errorMessage);
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.form}>
        <StatusBar backgroundColor="#9df9ef" barStyle="light-content" />
        <View>
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={{marginTop: heightScreen * 0.021}} />
        </View>
        <KeyboardAvoidingView behavior={behavior}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={email => setEmail(email)}
            autoCapitalize="none"
            placeholderTextColor="#BFC9CA"
          />
          <View style={{marginTop: heightScreen * 0.011}} />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={password => setPassword(password)}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#BFC9CA"
          />
          <View style={{marginTop: heightScreen * 0.011}} />
          <View>
            {errorMsg != '' ? (
              <Text style={styles.errtxt}>{errorMsg}</Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
        <View style={styles.termsBox}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.infoText}>Haven't an account?</Text>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={[styles.infoText, styles.greenInfoText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d9f9ef',
  },
  logo: {
    alignSelf: 'center',
    marginTop: heightScreen * 0.032,
    marginBottom: heightScreen * 0.102,
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
  button: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#22AFD1',
    marginBottom: 100,
    position: 'relative',
    bottom: -100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 35,
    borderRadius: 30,
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
  button: {
    width: '100%',
    borderRadius: 19.0,
    paddingVertical: heightScreen * 0.027,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#51e2f5',
  },
  buttonText: {
    fontFamily: 'Gilroy-LightItalic',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    height: 20,
  },
});

export default {component: OwnerSignIn, name: 'OwnerSignIn'};
