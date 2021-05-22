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
} from 'react-native';
import {validate} from 'validate.js';
import configdata from '../../config/config';
import Loader from '../../components/Loader';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const AddFeedback = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d9f9ef',
  },
  
});

export default {component: AddFeedback, name: 'AddFeedback'}
