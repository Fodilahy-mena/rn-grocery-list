import React from 'react'

import { View, Text, SafeAreaView} from 'react-native'

import nachos from '../data/nachos'
export default () => {
    return (
        <SafeAreaView>
            {nachos.map((item, index)=>{

                return <Text key={index}>{item.name}</Text>

            })}
        </SafeAreaView>

    )

};

