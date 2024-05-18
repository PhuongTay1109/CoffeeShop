/*eslint-disable */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';
// import FavoritesItemCard from '../components/FavoritesItemCard';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

interface Price {
    size: string;
    price: number;
    currency: string;
}

interface Coffee {
    average_rating: number;
    description: string;
    favourite: boolean;
    id: string;
    imagelink_portrait: string;
    imagelink_square: string;
    index: number;
    name: string;
    prices: Price[];
    roasted: string;
    special_ingredient: string;
    type: string;
}

const FavoritesScreen = ({ navigation }: any) => {
    const tabBarHeight = useBottomTabBarHeight();

    const db = getFirestore();
    const [favouriteList, setFavouriteList] = useState<Coffee[] | null>(null);

    const fetchFavouriteList = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser != null) {
                const userEmail = currentUser.email;
                if (userEmail != null) {
                    const userDocRef = db.collection('users').doc(userEmail);
                    const doc = await userDocRef.get();
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userData && userData.ProductsList) {
                            const productsList = userData.ProductsList;
                            const favouriteProducts = productsList.filter((product: any) => product.favourite === true);
                            setFavouriteList(favouriteProducts);
                        }
                    } else {
                        console.log('No such document!');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching coffee data:', error);
            setFavouriteList(null);
        }
    };


    useEffect(() => {
        fetchFavouriteList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchFavouriteList();
        }, [])
    );

    if (!favouriteList) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    console.log(favouriteList);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Favourites" />
                        {favouriteList.length === 0 ? (
                            <EmptyListAnimation title={'No Favourites'}  />
                        ) : (
                            <View>
                                {favouriteList.map((coffee: Coffee) => (
                                    <View key={coffee.id} style={styles.ListItemContainer}>
                                        <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: coffee.index,
                                                id: coffee.id,
                                                type: coffee.type,
                                                roasted: coffee.roasted,
                                                imagelink_portrait: coffee.imagelink_portrait,
                                                name: coffee.name,
                                                average_rating: coffee.average_rating,
                                                price: coffee.prices,
                                                description: coffee.description,
                                                favourite: coffee.favourite,
                                                imagelink_square: coffee.imagelink_square
                                            });
                                        }}>
                                            <FavoritesItemCard
                                                id={coffee.id}
                                                imagelink_portrait={coffee.imagelink_portrait}
                                                name={coffee.name}
                                                special_ingredient={coffee.special_ingredient}
                                                type={coffee.type}
                                                average_rating={coffee.average_rating}
                                                roasted={coffee.roasted}
                                                description={coffee.description}
                                                favourite={coffee.favourite}
                                                index={coffee.index}
                                                removeFavourite={fetchFavouriteList}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.space_10,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    }
});

export default FavoritesScreen;
