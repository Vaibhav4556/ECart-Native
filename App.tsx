import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import MovieInfo from './screens/ProductInfo';
import Billing from './screens/Billing';
import {MyContext} from './MyContext';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View} from 'react-native';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function App() {
  const [data, setData] = useState<any>();
  const initialHeartFilledState = false;
  const [isHeartFilled, setHeartFilled] = useState<any>({});
  const [addproduct, setAddproduct] = useState<any>([]);
  const cartId: any = [];

  const [cartValue, setCartValue] = useState<any>({});

  const handlePress = (selectedProduct: any) => {
    // Check if the selectedProduct is already in the array
    if (addproduct && !addproduct.includes(selectedProduct)) {
      // If not, add it to the array
      setAddproduct((prevProducts: any) => [...prevProducts, selectedProduct]);
    }
    handleAdd(selectedProduct.id);
  };

  const handleAdd = (id: any) => {
    // Get the current quantity for the product or default to 0
    const currentQuantity = cartValue[id] || 0;

    // Update the quantity in the cartValues object
    setCartValue({
      ...cartValue,
      [id]: currentQuantity + 1,
    });
  };

  const handleHeartPress = (id: any) => {
    // Toggle the heart-filled state for the specific product ID
    const currentQuantity = isHeartFilled[id] || false;

    setHeartFilled((prevHeartFilled: any) => ({
      ...prevHeartFilled,
      [id]: !currentQuantity,
    }));
  };

  const handleReduce = (id: any) => {
    // Get the current quantity for the product or default to 0
    const currentQuantity = cartValue[id] || 0;

    // Update the quantity in the cartValues object
    if (currentQuantity > 0) {
      const updatedCartValue = {
        ...cartValue,
        [id]: currentQuantity - 1,
      };

      // If the quantity becomes zero, remove the item from the cart
      if (currentQuantity === 1) {
        delete updatedCartValue[id];

        // Remove the item from the addproduct array
        setAddproduct((prevProducts: any) =>
          prevProducts.filter((product: any) => product.id !== id),
        );
      }

      setCartValue(updatedCartValue);
    }
  };

  return (
    <MyContext.Provider
      value={{
        cartId,
        data,
        setData,
        cartValue,
        setCartValue,
        addproduct,
        setAddproduct,
        handlePress,
        handleAdd,
        handleReduce,
        isHeartFilled,
        handleHeartPress,
      }}>
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Movie Details"
            component={MovieInfo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Billing"
            component={Billing}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        </NavigationContainer>


        {/* implemented bottom navigation  */}
        {/* <NavigationContainer>
          
        <Tab.Navigator initialRouteName="Home" barStyle={{backgroundColor:"#fff"}}>
          <Tab.Screen
            name="Home"
            component={Home}
            
            options={{
              tabBarIcon: () => (
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Icon name="home" color={'#E0B420'} size={20} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Billing}
            options={{
              tabBarIcon: ({color}) => (
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Icon name="list" color={'#fff'} size={20} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Favourites"
            component={Billing}
            options={{
              tabBarIcon: ({color}) => (
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Icon name="heart" color={'#fff'} size={20} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="More"
            component={Billing}
            options={{
              tabBarIcon: ({color}) => (
                <View
                  style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Icon name="ellipsis-vertical" color={'#fff'} size={20} />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer> */}
    </MyContext.Provider>
  );
}
export default App;
