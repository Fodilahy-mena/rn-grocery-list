// import {createStackNavigation, createAppContainer } from 'react-navigation';

// import CurrentList from '../screens/CurrentList';

// const CurrentListStack = createStackNavigation({
//     CurrentList: {
//         screen: CurrentList,
//     },
//     // ItemDetails: {

//     // },
// })

// export default createAppContainer(CurrentListStack);


import React from 'react';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavoritesList from '../screens/FavoritesList';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import {Text, Image, Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CurrentListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CurrentList" component={CurrentList}/>
            <Stack.Screen name="ItemDetails" component={ItemDetails}
                options={({route}) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }}
            />
        </Stack.Navigator>
    )
}
const FavoritesListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoritesList" component={FavoritesList} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    
    return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let image;
            const routName = route.name;

            if(routName ==="Shopping List") {
                image = Platform.select({
                    ios: require('../assets/icons/ios-list.png'),
                    android: require('../assets/icons/md-list.png')
                });
            } else {
                image = Platform.select({
                    ios: focused 
                    ? require('../assets/icons/ios-star.png')
                    : require('../assets/icons/ios-star-outline.png'),
                    android: focused 
                    ? require('../assets/icons/md-star.png')
                    : require('../assets/icons/md-star-outline.png')
                });
            }
            // You can return any component that you like here!
            return <Image source={image} 
                    resizeMode='contain' 
                    style={{width: size, tintColor: color}} />;
          },
        })}>
            <Tab.Screen name="Shopping List" component={CurrentListStack} />
            <Tab.Screen name="Favorites" component={FavoritesListStack} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    
}

export default Tabs;
