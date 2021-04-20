import React from 'react'
import { SafeAreaView,SectionList, KeyboardAvoidingView, ActivityIndicator} from 'react-native'

import FavoritesItem, {Separator, SectionHeader} from '../components/FavoritesItem';
import {userCurrentList} from '../util/ListManager'

export default ({navigation}) => {
    const {
        loading,
        removeItem,
        addToCart, 
        favorite,
        addToFavorite,
        unFavoriteItem,
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
                <SectionList 
                    sections={[
                        {title: 'Favorites', data: favorite},
                    ]}
                    renderSectionHeader={({section}) => (
                        <SectionHeader title={section.title}/>
                    )}
                    renderItem={({item, index}) => (
                        <FavoritesItem 
                            name={item.name}
                            onFavoritePress={() => unFavoriteItem(item.id)}
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


