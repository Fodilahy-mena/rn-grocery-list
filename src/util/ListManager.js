import {useState, useEffect} from 'react';
import 'react-native-get-random-values';
import {v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStoredCurrentList = (list) => {
    // add file id name as '@@GroceryList/currentList'
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

const updateStoredCurrentCart = (cart) => {
    // add file id name as '@@GroceryList/currentCart'
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart))
}

const updateStoredCurrentFavorite = (favorite) => {
    // add file id name as '@@GroceryList/currentFavorite'
    AsyncStorage.setItem('@@GroceryList/currentFavorite', JSON.stringify(favorite))
}

export const userCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list];
        setList(newList)
        updateStoredCurrentList(newList)
    }

    const addToCart = (item) => {
        removeItem(item.id);
        const newCart = [item, ...cart];
        setCart(newCart)
        updateStoredCurrentCart(newCart)
    }

    const addToFavorite = (item) => {
        removeItem(item.id);
        const newFavorite = [item, ...favorite];
        setFavorite(newFavorite)
        updateStoredCurrentFavorite(newFavorite)
    }
    
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        updateStoredCurrentList(newList)
    }
    useEffect(() => {
        setTimeout(() => {
            Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'),
                AsyncStorage.getItem('@@GroceryList/currentCart'),
                AsyncStorage.getItem('@@GroceryList/currentFavorite'),
            ])
            .then(([list, cartItems, favoriteItems]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favoriteItems)])
            .then((([list, cartItems, favoriteItems]) => {
                if(list) {
                    setList(list);
                }
                if(cartItems) {
                    setCart(cartItems);
                }
                if(favoriteItems) {
                    setFavorite(favoriteItems);
                }
                setLoading(false)
            }))
        }, 1000);
    }, []);
    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorite,
        addToFavorite,
    }
};