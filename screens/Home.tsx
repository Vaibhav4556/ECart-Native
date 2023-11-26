import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  TextInput,
  ActivityIndicator,
  Button,
  Searchbar,
} from 'react-native-paper';
import axios from 'axios';
import {MyContext} from '../MyContext';

const Home = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const {data, setData, cartValue, cartId, addproduct, isHeartFilled} =
    useContext<any>(MyContext);
  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((data: any) => setData(data.data.products));
  }, []);

  const renderItem1 = ({item}: any) => (
    <View style={styles.productViewList}>
      <Image
        source={
          isHeartFilled[item.id]
            ? require('./assets/heartFill.png')
            : require('./assets/heartgrey.png')
        }
        style={{width: 14.55, height: 13.35, margin: 13}}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 20, right: 49}}
        onPress={() =>
          props.navigation.navigate('Movie Details', {
            selecteProdeuct: item,
          })
        }>
        <Image
          source={{uri: item.thumbnail}}
          style={{
            width: 68,
            height: 68,
            marginLeft: 22,
            opacity: 0.6,
            objectFit: 'cover',
          }}
        />
      </TouchableOpacity>
      <View style={{position: 'absolute', bottom: 20, left: 17}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 70,
          }}>
          <Text
            style={{
              color: '#1E222B',
              fontFamily: 'Manrope',
              fontSize: 14,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            ${item.price}
          </Text>
          <TouchableOpacity
            style={{
              width: 24,
              height: 24,
              backgroundColor: '#2A4BA0',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('./assets/plusIcon.png')}
              style={{width: 12, height: 12}}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#616A7D',
            fontFamily: 'Manrope',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
            letterSpacing: 0.24,
            width: 112,
            height: 16,
          }}>
          {/* Clown Tang.H03
           */}
          {item.title}
        </Text>
      </View>
    </View>
  );

  const renderItem = () => <Container />;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.headerView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 215,
            }}>
            <Text style={styles.header}>Hey, Rahul</Text>
            <View>
              <Image
                source={require('./assets/cart.jpg')}
                style={{width: 16, height: 18, position: 'relative'}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.cartValue} onPress={()=>props.navigation.navigate("Billing")}>
            <Text style={styles.cartValueText}>{addproduct.length}</Text>
          </TouchableOpacity>

          <Searchbar
            placeholder="Search Products or store"
            placeholderTextColor="#8891A5"
            value=""
            style={styles.serachBox}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 202,
            left: 30,
            gap: 207,
          }}>
          <Text style={styles.textDelivery}>DELIVERY TO</Text>
          <Text style={styles.textDelivery}>WITHIN</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 221,
            left: 30,
            gap: 135,
          }}>
          <Text style={styles.textDelivery}>Green Way 3000, Sylhet</Text>
          <Text style={styles.textDelivery}>1 Hour</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={Array.from({length: 5})}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View style={{marginLeft: 20, marginTop: 27}}>
        <Text style={styles.RecommendedText}>Recommended</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem1}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />

      {/* <View style={styles.productViewList}>
        <Image
          source={require('./assets/heartFill.png')}
          style={{width: 14.55, height: 13.35, margin: 13}}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 20, right: 49}}
          onPress={() => props.navigation.navigate('Movie Details')}>
          <Image
            source={require('./assets/ImageGrey.png')}
            style={{
              width: 68,
              height: 68,
              marginLeft: 22,
              opacity: 0.6,
            }}
          />
        </TouchableOpacity>
        <View style={{position: 'absolute', bottom: 20, left: 17}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 70,
            }}>
            <Text
              style={{
                color: '#1E222B',
                fontFamily: 'Manrope',
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 20,
              }}>
              $325
            </Text>
            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                backgroundColor: '#2A4BA0',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./assets/plusIcon.png')}
                style={{width: 12, height: 12}}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#616A7D',
              fontFamily: 'Manrope',
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 16,
              letterSpacing: 0.24,
            }}>
            Clown Tang.H03
          </Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textDelivery: {
    color: '#F8F9FB',
    fontFamily: 'Manrope',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: 0.22,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  serachBox: {
    width: 335,
    height: 56,
    borderRadius: 100,
    position: 'absolute',
    top: 55,
    backgroundColor: '#153075',
  },
  header: {
    color: '#F8F9FB',
    fontFamily: 'Manrope',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  productViewList: {
    width: 160,
    height: 194,
    flexShrink: 0,
    borderRadius: 12,
    backgroundColor: '#F8F9FB',
    marginLeft: 22,
    marginTop: 12,
    position: 'relative',
  },
  RecommendedText: {
    color: '#1E222B',
    fontFamily: 'Manrope',
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 38,
  },
  searchContainer: {
    width: '100%',
    height: 252,
    flexShrink: 0,
    backgroundColor: '#2A4BA0',
  },
  headerView: {height: 30, width: 110, position: 'absolute', top: 52, left: 26},
  cartValue: {
    padding: 1,
    backgroundColor: '#F9B023',
    borderRadius: 50,
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 325,
    top: -6,
  },
  cartValueText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Home;

const Container = () => {
  return (
    <View
      style={{
        height: 123,
        width: 269,
        marginTop: 27,
        backgroundColor: '#F9B023',
        borderRadius: 25,
        marginLeft: 20,
        overflow: 'hidden',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 44,
          marginTop: 20,
        }}>
        <Image
          source={require('./assets/imgIcon.png')}
          style={{width: 68, height: 68, marginLeft: 22}}
        />
        <View>
          <Text
            style={{
              width: 34,
              height: 28.878,
              flexShrink: 0,
              color: '#FFF',
              fontFamily: 'Manrope',
              fontSize: 20,
              fontWeight: '300',
            }}>
            Get
          </Text>
          <Text
            style={{
              width: 114,
              height: 38.504,
              flexShrink: 0,
              color: '#FFF',
              fontFamily: 'Manrope',
              fontSize: 26,
              fontWeight: '800',
            }}>
            50% OFF
          </Text>
          <Text
            style={{
              width: 96,
              height: 19.252,
              flexShrink: 0,
              color: '#FFF',
              fontFamily: 'Manrope',
              fontSize: 13,
              fontWeight: '300',
            }}>
            On first 03 order
          </Text>
        </View>
      </View>
    </View>
  );
};
