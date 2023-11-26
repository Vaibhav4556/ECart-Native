import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
 
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {MyContext} from '../MyContext';

const Billing = (props: any) => {
  const navigation = useNavigation();
  const {data, setData, cartValue, addproduct, handleAdd, handleReduce} =
    useContext<any>(MyContext);
  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((data: any) => setData(data.data.products));
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    addproduct.forEach((product: any) => {
      const {id, price} = product;
      const quantity = cartValue[id] || 0; // Default to 0 if quantity is not defined

      totalPrice += price * quantity;
    });

    return totalPrice;
  };
  let charge=0
  const total = calculateTotalPrice();
  if(addproduct.length>0){
     charge=2
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: 21,
          marginTop: 52,
          alignItems: 'center',
          marginBottom: 20,
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
        <Text style={styles.cartItem}>Shopping Cart ({addproduct.length})</Text>
      </View>
      {addproduct.length > 0 &&
        addproduct.map((item: any) => (
          <View key={item.id}>
            <View style={styles.productmanage}>
              <Image
                source={{uri: item.thumbnail}}
                style={{width: 30, height: 30, marginLeft: 30, opacity: 0.6}}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>${item.price * cartValue[item.id]}</Text>
              </View>
              <View style={styles.productmanage}>
                <TouchableOpacity
                  onPress={() => handleReduce(item.id)}
                  style={{
                    paddingHorizontal: 2,
                    paddingVertical: 2,
                    borderRadius: 50,
                    backgroundColor: '#F8F9FB',
                    height: 40,
                    width: 40,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.btn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cartValue}> {cartValue[item.id]}</Text>
                <TouchableOpacity
                  onPress={() => handleAdd(item.id)}
                  style={{
                    paddingHorizontal: 2,
                    paddingVertical: 2,
                    borderRadius: 50,
                    backgroundColor: '#F8F9FB',
                    height: 40,
                    width: 40,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.btn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider style={styles.divider} />
          </View>
        ))}

      <View style={styles.billingContainer}>
        <View style={styles.bill}>
          <Text style={styles.billtext}>Subtotal</Text>
          <Text style={styles.billPrice}>${total}</Text>
        </View>
        <View style={styles.bill}>
          <Text style={styles.billtext}>Delivery</Text>
          <Text style={styles.billPrice}> ${addproduct.length>0?2:0}</Text>
        </View>
        <View style={styles.bill}>
          <Text style={styles.billtext}>Total</Text>
          <Text style={styles.billPrice}>${total + charge}</Text>
        </View>
        <Button mode="contained" style={styles.byuNowBtn}>
          Proceed To checkout
        </Button>
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
  btn: {
    fontSize: 20,
    color: 'black',
    textAlignVertical: 'center',
  },
  cartItem: {
    width: 143,
    color: '#1E222B',
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  productmanage: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    columnGap: 10,
  },
  cartValue: {
    color: '#1E222B',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    marginTop: 16,
    width: 327,
    marginLeft: 30,
    marginBottom: 16,
  },
  billingContainer: {
    width: 359,
    height: 266,
    flexShrink: 0,
    borderRadius: 30,
    backgroundColor: '#F8F9FB',
    marginLeft: 15,
    position: 'absolute',
    bottom: -30,
    display: 'flex',
    rowGap: 13,
    paddingTop: 17,
  },
  bill: {display: 'flex', flexDirection: 'row', columnGap: 185, marginLeft: 36},
  billtext: {
    color: '#616A7D',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    width: 56,
  },
  billPrice: {
    color: '#1E222B',
    textAlign: 'right',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  byuNowBtn: {
    width: 327,
    height: 56,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#2A4BA0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: 34,
  },
});

export default Billing;
