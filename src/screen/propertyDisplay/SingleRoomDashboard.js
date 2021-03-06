import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import configdata from '../../config/config';
import Moredetail from './Moredetail';

const SingleRoomDashboard = ({props, navigation}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => getData(), []);

  const getData = () => {
    const abortController = new AbortController();
    const signal = AbortController.signal;

    setLoading(true);
    fetch(`${configdata.baseURL}/properties/singlerooms`, {signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.products);
        setData(responseJson.products);
        setLoading(false);        
      })
      .catch(error => {
        console.error(error);
      });

    return function cleanup() {
      abortController.abort();
    };
    
  };
  
  const ItemView = ({item}) => {
    const img = item.images.url;
    return (
      // Flat List Item
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri: img}} />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.description}>{item.location}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {'Rs.'}
                {item.price}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.socialBarContainer}>
            <View style={styles.socialBarSection}>
              <Text style={styles.socialBarLabel} onPress={() => book()}>
                Book now
              </Text>
            </View>
            <View style={styles.socialBarSection}>
              <Text
                style={styles.socialBarLabel}
                onPress={() => moreDetail(item)}>
                More details...
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const moreDetail = item => {
    //Function for click on an item
    navigation.navigate('Moredetail', {
      type: item.category,
      price: item.price,
      location: item.location,
      description: item.description,
      pimg: item.images.url,
    });
  };

  const book = () => {
    //Function for click on an item
    navigation.pop();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    marginLeft: 1,
    backgroundColor: 'white',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#EEEEEE',
  },
  cardImage: {
    flex: 1,
    height: 200,
    width: null,
  },

  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    color: '#555',
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {component: SingleRoomDashboard, name: 'SingleRoomDashboard'};
