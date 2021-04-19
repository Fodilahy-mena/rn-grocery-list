import React from 'react';
import {View, Text} from 'react-native';

export default ({route, navigation}) => {
    return (
        <View>
            <Text>{JSON.stringify(route.params.item, null, 2)}</Text>
        </View>
    )
};
