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
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import configdata from '../../config/config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Loader from '../../components/Loader';
import CaptureImage from '../../helpers/imageupload';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const AddPlace = ({route}) => {
  const oid = route.params.oid
  const [data, setData] = useState({
    location: '',
    address: '',
    category: '',
    images: [(public_id: ''), (url: '')],
    description: '',
    price: '',
    owner_id: oid,
  });
  const [img, setImg] = useState({});
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const imgUpload = () => {
    const images = target.files[0];
    if (!images) return alert('File not exist.');

    if (images.size > 1024 * 1024)
      // 1mb
      return alert('Size too large!');

    if (images.type !== 'image/jpeg' && images.type !== 'image/png')
      // 1mb
      return alert('File format is incorrect.');

    fetch(`${configdata.baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('image uploaded');
        setImg(responseJson);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (success === true) {
    setLoading(true);
    fetch(`${configdata.baseURL}/properties/addproperty`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: location,
        address: address,
        category: category,
        images: [(public_id: img.public_id), (url: img.url)],
        description: description,
        price: price,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.msg);
        Alert.alert('Place added successfuly');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View>
      <CaptureImage />
    </View>
  );
};

export default {component:AddPlace, name:"AddPlace"}