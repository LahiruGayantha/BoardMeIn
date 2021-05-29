import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import isEmpty from 'validator/lib/isEmpty';
import configdata from '../../config/config';
import * as ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Loader from '../../components/Loader';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const AddPlace = ({route, navigation}) => {
  const oid = route.params.oid;
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState({});
  const [imageSource, setImageSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Single bedroom', value: 'SingleRoom'},
    {label: 'Shared bedroom', value: 'SharedRoom'},
    {label: 'Annex', value: 'Annex'},
    {label: 'House', value: 'Home'},
  ]);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        // ADD THIS
        setImageSource(source.uri);
      }
    });
  }

  const createFormData = imageSource => {
    const data = new FormData();

    data.append('images', {
      name: imageSource.fileName,
      type: imageSource.type,
      uri:
        Platform.OS === 'android'
          ? imageSource.uri
          : imageSource.uri.replace('file://', ''),
    });
    return data;
  };

  const uploadImage = file => {
    fetch(`${configdata.baseURL}/upload`, {
      method: 'POST',
      body: createFormData(file),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        setFilePath(response);
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  const uploadData = imageSource => {
    uploadImage(imageSource);
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
        content: content,
        price: price,
        description: description,
        category: value,
        images: filePath,
        owner_id: oid,
        product_id: filePath.public_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson.msg);
        Alert.alert(responseJson.msg);
        setImageSource(null);
        setLocation('');
        setContent('');
        setPrice('');
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Loader loading={loading} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add new place</Text>
          <View style={styles.imageContainer}>
            {imageSource === null ? (
              <Image
                source={null}
                style={styles.imageBox}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={{uri: imageSource}}
                style={styles.imageBox}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              onPress={selectImage}
              style={[
                styles.selectButtonContainer,
                {backgroundColor: '#999999'},
              ]}>
              <Text style={styles.selectButtonTitle}>Add photo</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.form}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={location => setLocation(location)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={content => setContent(content)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.minput}
                multiline
                numberOfLines={4}
                onChangeText={description => setDescription(description)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={price => setPrice(price)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.userRow}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  onPress={() => setOpen(true)}
                  containerStyle={{
                    width: widthScreen * 0.5,
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                  maxHeight={200}
                  closeAfterSelecting={true}
                  color="#000"
                />
                <View style={{marginTop: heightScreen * 0.11}} />
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadData(filePath)}>
                  <Text style={{color: '#fff'}}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

export default {component: AddPlace, name: 'AddPlace'};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 20,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#444444',
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    paddingVertical: heightScreen * 0.012,
    borderWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
    width: widthScreen * 0.9,
  },
  userRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: heightScreen * 0.057,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 6,
  },
  minput: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    borderWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
    width: widthScreen * 0.9,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  flex: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  },
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    marginLeft: 10,
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18,
  },
  // ADD BELOW
  imageContainer: {
    borderWidth: 3,
    width: widthScreen * 0.6,
    padding: 5,
    marginBottom: 10,
  },
  imageBox: {
    width: widthScreen * 0.5,
    height: 150,
  },
  uploadBtn: {
    padding: 10,
    margin: 10,
    backgroundColor: '#00f',
  },
  title: {
    fontFamily: 'Gilroy-Heavy',
    fontSize: 28,
  },
});
