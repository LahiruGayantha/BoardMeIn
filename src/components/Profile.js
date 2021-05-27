import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const Profile = ({
  username,
  usermail,
  owner,
  btn2,
  onPress1,
  img,
  bio,
  location,
  nav,
  onPress2,
  iname,
  onPress3,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userRow}>
        <Image style={styles.avatar} source={img ? {uri: img} : null} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.info}>{usermail}</Text>
            <Text style={styles.description}>{owner}</Text>
            <Text style={styles.description}>
              {location != '' ? location : 'location'}
            </Text>
            <Text style={styles.description}>{bio != '' ? bio : 'bio'}</Text>
            <TouchableOpacity onPress={nav}>
              <Icon name="account-edit" size={30} color="#323232" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress1}>
        <Text style={styles.btntxt}>
          <Icon name="wechat" size={30} color="#fff" /> Chat{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.btntxt} onPress={onPress2}>
          <Icon name={iname} size={30} color="#fff" /> {btn2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPress3}>
        <Text style={styles.btntxt}>
          <Icon name="file-document-edit" size={30} color="#fff" /> Send Inquery
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: heightScreen * 0.057,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: heightScreen * 0.057,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 6,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 10,
  },
  bodyContent: {
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 18,
    color: '#00f',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: widthScreen * 0.8,
    padding: 10,
    backgroundColor: '#6272E9',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#fff',
  },
  btntxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'justify',
    padding: 2,
  },
  container: {
    width: widthScreen,
    paddingBottom: heightScreen * 0.057,
    alignItems: 'center',
  },
});

export default Profile;
