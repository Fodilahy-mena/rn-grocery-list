import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator, Active} from 'react-native'
import nachos from '../data/nachos';

import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {userCurrentList} from '../util/ListManager'

export default ({navigation}) => {
    const {
        list,
        loading,
        addItem,
        removeItem,
    } = userCurrentList();
    
    if(loading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{flex: 1,}}>
            <KeyboardAvoidingView 
                style={{flex:1,}}
                behavior="padding">
                <FlatList 
                    data={list}
                    renderItem={({item, index}) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => alert("todo: handle favorite")}
                            isFavorite={index < 2}
                            onAddedSwipe={()=> removeItem(item.id)}
                            onDeleteSwipe={()=> removeItem(item.id)}
                            onRowPress={() => {
                                navigation.navigate("ItemDetails", {
                                    item: item
                                })
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent= {() => <AddItem onSubmitEditing={({ nativeEvent: {text}}) => addItem(text)}
                    />
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             {nachos.map((item, index)=> (
    //                 <React.Fragment key={item.id}>
    //                     <ListItem 
    //                         name={item.name}
    //                         onFavoritePress={() => alert("todo: handle favorite")}
    //                         isFavorite={index < 2}/>
    //                     <Separator/>
    //                 </React.Fragment>
    //             ))}
    //         </ScrollView>
    //     </SafeAreaView>

    // )
};


