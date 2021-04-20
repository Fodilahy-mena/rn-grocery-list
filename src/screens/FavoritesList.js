import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList,SectionList, KeyboardAvoidingView, ActivityIndicator, Active} from 'react-native'
import nachos from '../data/nachos';

import FavoritesItem, {Separator} from '../components/FavoritesItem';
import {userCurrentList} from '../util/ListManager'

export default ({navigation}) => {
    const {
        loading,
        removeItem,
        addToCart, 
        favorite,
        addToFavorite,
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
                    data={favorite}
                    
                    renderItem={({item, index}) => (
                        <FavoritesItem 
                            name={item.name}
                            onFavoritePress={() => addToFavorite(item)}
                            isFavorite={true}
                            onAddedSwipe={()=> addToCart(item)}
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
                />
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};


