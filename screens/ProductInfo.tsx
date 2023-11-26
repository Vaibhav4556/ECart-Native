import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';

import {MyContext} from '../MyContext';
const MovieInfo = (props: any) => {
  const {selecteProdeuct} = props.route.params;

  const {
    data,
    setData,
    cartValue,
    cartId,
    handlePress,
    addproduct,
    isHeartFilled,
    handleHeartPress,
  } = useContext<any>(MyContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 52,
          alignItems: 'center',
          columnGap: 279,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('./assets/Group82.png')}
            style={{
              width: 40,
              height: 40,
              marginLeft: 20,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./assets/cart.jpg')}
            style={{width: 16, height: 18}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.cartValue}
        onPress={() => props.navigation.navigate('Billing')}>
        <Text style={styles.cartValueText}>{addproduct.length}</Text>
      </TouchableOpacity>

      <View style={{marginLeft: 20, position: 'absolute', top: 106}}>
        <Text style={styles.choiceText}>
          Thin Choise <Text style={styles.orangeText}>Top Orange</Text>{' '}
        </Text>
      </View>
     <View style={styles.stars}>
      <Image
            source={require('./assets/Star.png')}
            style={{width: 16, height: 18}}
          />
          <Text style={styles.review}>110 Reviews</Text>
          </View> 
      <View style={{position: 'absolute', top: 281, width: '100%'}}>
        <View style={{height: 207, position: 'relative'}}>
          <Swiper showsButtons={true}>
            {selecteProdeuct.images.map((image: any, index: any) => (
              <View key={index} style={styles.slide}>
                <Image style={styles.image} source={{uri: image}} />
              </View>
            ))}
          </Swiper>
          <TouchableOpacity
            style={styles.heartBox}
            onPress={() => handleHeartPress(selecteProdeuct.id)}>
            <Image
              source={
                isHeartFilled[selecteProdeuct.id]
                  ? require('./assets/heartFill.png')
                  : require('./assets/heartgrey.png')
              }
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text style={styles.price}>
            ${selecteProdeuct.price} <Text style={styles.kg}>/KG</Text>
          </Text>
          <View style={styles.discountBox}>
            <Text style={styles.discount}>
              {selecteProdeuct.discountPercentage}% OFF
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => handlePress(selecteProdeuct)}
              style={styles.addCartbtn}>
              Add To Cart
            </Button>
            <Button
              onPress={() => props.navigation.navigate('Billing')}
              mode="contained"
              style={styles.byuNowBtn}>
              Buy Now
            </Button>
          </View>
          <View
            style={{marginLeft: 22, marginTop: 15, display: 'flex', rowGap: 6}}>
            <Text style={styles.detailesText}>Details</Text>
            <Text style={styles.detText}>{selecteProdeuct.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  choiceText: {
    width: 306,
    color: '#1E222B',
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '300',
    lineHeight: 62.55,
  },
  orangeText: {
    color: '#1E222B',
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '800',
  },
  price: {
    color: '#2A4BA0',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  kg: {
    color: '#2A4BA0',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  discount: {
    color: '#FAFBFD',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.24,
  },
  discountBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#2A4BA0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  addCartbtn: {
    width: 143,
    height: 56,
    borderRadius: 20,
    border: '1px solid  #2A4BA0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  byuNowBtn: {
    width: 169,
    height: 56,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#2A4BA0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 23,
    marginLeft: 20,
    marginTop: 20,
  },

  detailesText: {
    color: '#1E222B',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  detText: {
    width: 327,
    color: '#8891A5',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cartValueText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
  },
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
    right: 21,
    top: 50,
  },
  heartBox: {
    width: 58,
    height: 58,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 35,
    top: 15,
  },
  stars:{display:"flex",flexDirection:"row",alignItems:"center",columnGap:5,position:"absolute",top:240,marginLeft:22},
  review:{"color":"#A1A1AB","textAlign":"center","fontFamily":"Manrope","fontSize":14,"fontStyle":"normal","fontWeight":"400","lineHeight":20}
});

export default MovieInfo;
