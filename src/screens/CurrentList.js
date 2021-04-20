import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList,SectionList, KeyboardAvoidingView, ActivityIndicator, Active} from 'react-native'
import nachos from '../data/nachos';

import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {userCurrentList} from '../util/ListManager'
import AsyncStorage from '@react-native-community/async-storage';

export default ({navigation}) => {
    const {
        list,
        loading,
        addItem,
        removeItem,
        addToCart, 
        cart,
        favorite,
        addToFavorite,
        unFavoriteItem,
        removeFromCart,
    } = userCurrentList();


    if(loading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        )
    }
    // console.log("items", list)
    // AsyncStorage.clear();
    return (
        <SafeAreaView style={{flex: 1,}}>
            <KeyboardAvoidingView 
                style={{flex:1,}}
                behavior="padding">
                <SectionList 
                    sections={[
                        {title: 'List', data: list},
                        {title: 'Cart', data: cart}
                    ]}
                    renderSectionHeader={({section}) => (
                        <SectionHeader title={section.title}/>
                    )}
                    renderItem={({item, index}) => (
                        <ListItem 
                            name={item.name}
                            onFavoritePress={() => favorite.find(fav => fav.id === item.id) ? unFavoriteItem(item.id) : addToFavorite(item)}
                            isFavorite={favorite.find(fav => fav.id === item.id)}
                            onAddedSwipe={()=> cart.find(c => c.id === item.id) ? removeFromCart(item) : addToCart(item)}
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


