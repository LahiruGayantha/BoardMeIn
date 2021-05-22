import React, {useState, useEffect, createRef} from 'react';
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
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Button, Dialog, Portal} from 'react-native-paper';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import showLoading from '../../helpers/loading';
import configdata from '../../config/config';
import Loader from '../../components/Loader';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const OwnerSignUp = ({props, navigation}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      alert('All fields are required');
      return;
    } else if (!isEmail(email)) {
      alert('Inavalid email');
      return;
    } else if (!equals(password, password2)) {
      alert('Passwords do not match');
      return;
    } else {
      setLoading(true);

      fetch(`${configdata.baseURL}/auth/ownersignup`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          setLoading(false);
          console.log(responseJson);
          if (responseJson.success == true) {
            setIsRegistraionSuccess(true);
            setVisible(true);
            console.log('Registration Successful. Please Login to proceed');
          } else {
            alert(responseJson.errorMessage);
          }
        })
        .catch(error => {
          setLoading(false);
          console.error(error);
        });
    }
  };
  if (isRegistraionSuccess) {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Image
            source={require('../../.././assest/images/success.png')}
            style={{
              height: 150,
              marginTop: 20,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Dialog.Title>Registration Successful.</Dialog.Title>
          <Dialog.Title>Please Login</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                navigation.navigate('OwnerSignIn');
                hideDialog();
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
  return (
    <>
      <Loader loading={loading} />
      <ScrollView style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.form}>
          <StatusBar backgroundColor="#9df9ef" barStyle="light-content" />
          <View>
            <Text style={styles.headerTitle}>Owner Sign up</Text>
            <View style={{marginTop: heightScreen * 0.021}} />
          </View>
          <KeyboardAvoidingView behavior={behavior}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={firstname => setFirstname(firstname)}
              autoCapitalize="none"
              placeholderTextColor="#BFC9CA"
            />
            <View style={{marginTop: heightScreen * 0.011}} />
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={lastname => setLastname(lastname)}
              autoCapitalize="none"
              placeholderTextColor="#BFC9CA"
            />
            <View style={{marginTop: heightScreen * 0.011}} />
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
            <Text style={styles.inputLabel}>Conform Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={password2 => setPassword2(password2)}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#BFC9CA"
              onSubmitEditing={Keyboard.dismiss}
            />
          </KeyboardAvoidingView>
          <View style={styles.termsBox}>
            <Text style={styles.infoText}>
              By continuing you agree to our{' '}
              <Text style={[styles.infoText, styles.greenInfoText]}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={[styles.infoText, styles.greenInfoText]}>
                Privacy Policy
              </Text>
            </Text>
            <View style={{marginTop: heightScreen * 0.011}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.infoText}>Already have an owner account? </Text>
            <TouchableOpacity
              onPress={() => navigation.pop()}>
              <Text style={[styles.infoText, styles.greenInfoText]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default {component: OwnerSignUp, name: 'OwnerSignUp'};

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
    fontSize: 10,
    position: 'absolute',
    bottom: 90,
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
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
