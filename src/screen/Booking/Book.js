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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Book = () => {
  <View style={styles.container}>
    <Text>Book</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    alignItems: 'center',
    paddingTop: heightScreen * 0.001,
    paddingBottom: heightScreen * 0.01,
  },
});

export default {component: Book, name: 'Book'};
