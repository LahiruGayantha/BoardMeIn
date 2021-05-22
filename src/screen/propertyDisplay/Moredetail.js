import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const Sampleimg = require('../../../assest/images/SingleRoomsample.jpg');

const Moredetail = ({route, navigation}) => {
  const price = route.params.price;
  const type = route.params.type;
  const location = route.params.location;
  const discription = route.params.description;
  const img = route.params.pimg;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <Image style={styles.productImg} source={{uri: img}}/>
          <Text style={styles.name}>{type}</Text>
          <Text style={styles.price}>
            {'Rs. '}
            {price}
          </Text>
          <Text style={styles.description}>{discription}</Text>
        </View>
        <View style={styles.starContainer}>
          <Stars
            default={4}
            count={5}
            spacing={4}
            starSize={50}
            disabled={true}
            fullStar={require('../../../assest/images/starFull.png')}
            emptyStar={require('../../../assest/images/starEmpty.png')}
          />
        </View>
        <TouchableOpacity
          style={[styles.Button, styles.btnclr1]}
          onPress={() => navigation.navigate('GProfile',{screen:'GuestProfile'})}>
          <Text style={styles.ButtonText}>Contact Owner{' '}<Icon name="chat" size={25} color='#fff'/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styles.btnclr2]} >
          <Text style={styles.ButtonText}>Book Now{' '}<Icon name="check-outline" size={25} color='#fff'/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styles.btnclr3]}>
          <Text style={styles.ButtonText}>Comment & Review{' '}<Icon name="comment-edit-outline" size={25} color='#fff'/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styles.btnclr4]}>
          <Text style={styles.ButtonText}>Complains{' '}<Icon name="emoticon-neutral-outline" size={25} color='#fff'/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styles.btnclr5]} onPress={()=> navigation.navigate('Property',{screen:'GoogleMap'})}>
          <Text style={styles.ButtonText}>View Location{' '}<Icon name="map-marker-radius-outline" size={25} color='#fff'/></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default {component: Moredetail, name: 'Moredetail'};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    alignItems: 'center',
    paddingTop: heightScreen * 0.001,
    paddingBottom: heightScreen * 0.01,
  },
  productImg: {
    width: widthScreen*0.9,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  Button: {
    width: '90%',
    borderRadius: 15.0,
    paddingVertical: heightScreen * 0.017,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightScreen * 0.007,
  },
  btnclr1:{
    backgroundColor: '#51e2f5',
  },
  btnclr2:{
    backgroundColor: '#0028c9',
  },
  btnclr3:{
    backgroundColor: '#bd00de',
  },
  btnclr4:{
    backgroundColor: '#059100',
  },
  btnclr5:{
    backgroundColor: '#db9a00',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  ButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
