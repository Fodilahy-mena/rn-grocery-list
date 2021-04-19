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
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import {Text} from 'react-native';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Shopping List" component={CurrentList}/>
                <Stack.Screen name="ItemDetails" component={ItemDetails}
                    options={({route}) => {
                        return {
                            headerTitle: () => {
                                return <Text>{route.params.name}</Text>
                            }
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack;
