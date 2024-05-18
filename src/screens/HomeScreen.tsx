/* eslint-disable */
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ToastAndroid,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import { Dimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CoffeeCard from '../components/CoffeeCard';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CustomIcon from '../components/CustomIcon';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

const getCategoriesFromData = (data: any) => {
    if (!data || data.length === 0) {
        return [];
    }
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].type] == undefined) {
            temp[data[i].type] = 1;
        } else {
            temp[data[i].type]++;
        }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};


const getCoffeeList = (category: string, data: any) => {
    if (!data || data.length === 0) {
        return [];
    }
    if (category === 'All') {
        return data;
    } else {
        let coffeeList = data.filter((item: any) => item.type === category);
        return coffeeList;
    }
};

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

const HomeScreen = ({ navigation }: any) => {

   const db = getFirestore();
   const [CoffeeList, setCoffeeList] = useState<Coffee[] | null>(null);

    const fetchCoffeeData = async () => {
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
                            const data: Coffee[] = userData.ProductsList;
                            setCoffeeList(data);
                        }
                    } else {
                        console.log('No such document!');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching coffee data:', error);
            setCoffeeList(null);
        }
    };

    useEffect(() => {
        fetchCoffeeData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchCoffeeData();
        }, [])
    );

    const reloadData = () => {       
        fetchCoffeeData();
        setCategoryIndex({ index: 0, category: 'All' }); // Reset category index
    };

    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const [categories, setCategories] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: 'All',
    });

    const [sortedCoffee, setSortedCoffee] = useState(
        CoffeeList ? getCoffeeList(categoryIndex.category, CoffeeList) : []
    );

    useEffect(() => {
        if (CoffeeList) {
            const initialCategories = getCategoriesFromData(CoffeeList);
            setCategories(initialCategories);
            setCategoryIndex(prevState => ({ ...prevState, category: initialCategories[0] }));
        }
    }, [CoffeeList]);

    useEffect(() => {
        if (CoffeeList) {
            setSortedCoffee(getCoffeeList(categoryIndex.category, CoffeeList));
        }
    }, [CoffeeList, categoryIndex.category]);

    const ListRef: any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

    const searchCoffee = (search: string) => {
        if (search != '' && CoffeeList) {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedCoffee([
                ...CoffeeList.filter((item: any) =>
                    item.type.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };


    const resetSearchCoffee = () => {
        if (CoffeeList) {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedCoffee([...CoffeeList]);
            setSearchText('');
        }
    };

    const CoffeCardAddToCart = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    if (!CoffeeList) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.ScreenContainer} >
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                {/*Header */}
                <View style={styles.header} >
                    <HeaderBar title='Coffee Shop' />

                    <View style={{ marginHorizontal: SPACING.space_30 }}>
                        <View style={styles.bannerContainer}>
                            <Image source={require("../assets/coffee_assets/latte/portrait/latte_pic_3_portrait.jpg")} style={styles.banner} />
                        </View>
                        <Text style={styles.ScreenTitle}>
                            <View>
                                <Text style={styles.promo}>Promo</Text>
                            </View>
                            {"\n"}The best coffee
                            {"\n"}for your choice
                        </Text>
                    </View>

                    {/*Search input*/}
                    <View style={styles.InputContainerComponent}>
                        <TouchableOpacity onPress={() => {
                            searchCoffee(searchText);
                        }}
                        >
                            <Image source={require("../assets/app_images/search.png")}
                                style={{ height: 20, width: 20, marginHorizontal: SPACING.space_20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.TextInputContainer}
                            placeholder='Search for your coffee...'
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text);
                                searchCoffee(text);
                            }}
                        />
                        {searchText.length > 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    resetSearchCoffee();
                                }}>
                                <CustomIcon
                                    style={styles.InputIcon}
                                    name="close"
                                    size={FONTSIZE.size_16}
                                    color={COLORS.primaryLightGreyHex}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>
                </View>

                {/*Category Scroller */}
                <View style={styles.footer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.CategoryScrollViewStyle}>
                        {categories.map((data, index) => (
                            <View
                                key={index.toString()}
                                style={styles.CategoryScrollViewContainer}>
                                <TouchableOpacity
                                    style={styles.CategoryScrollViewItem}
                                    onPress={() => {
                                        ListRef?.current?.scrollToOffset({
                                            animated: true,
                                            offset: 0,
                                        });
                                        setCategoryIndex({ index: index, category: categories[index] });
                                        setSortedCoffee([
                                            ...getCoffeeList(categories[index], CoffeeList),
                                        ]);
                                    }}>
                                    <Text
                                        style={[
                                            styles.CategoryText,
                                            categoryIndex.index == index ? styles.CategoryActiveText : {},
                                        ]}
                                    >
                                        {data}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>


                    {/* Coffee list */}
                    <FlatList
                        horizontal={true}
                        ref={ListRef}
                        ListEmptyComponent={
                            <View style={styles.EmptyListContainer}>
                                <Text style={styles.CategoryText}>No Coffee Available</Text>
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                        data={sortedCoffee}
                        contentContainerStyle={styles.FlatListContainer}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    onPress={() => {
                                        navigation.push('Details', {
                                            index: item.index,
                                            id: item.id,
                                            type: item.type,
                                            roasted: item.roasted,
                                            imagelink_portrait: item.imagelink_portrait,
                                            name: item.name,
                                            average_rating: item.average_rating,
                                            price: item.prices,
                                            description: item.description,
                                            favourite: item.favourite,
                                            reloadData: reloadData,
                                            imagelink_square: item.imagelink_square,
                                            special_ingredient: item.special_ingredient
                                        });
                                    }}>
                                    <CoffeeCard
                                        id={item.id}
                                        index={item.index}
                                        type={item.type}
                                        roasted={item.roasted}
                                        imagelink_square={item.imagelink_square}
                                        name={item.name}
                                        special_ingredient={item.special_ingredient}
                                        average_rating={item.average_rating}
                                        price={item.prices[2]}
                                        buttonPressHandler={CoffeCardAddToCart}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    header: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 345
    },
    footer: {
        marginTop: 50,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    banner: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        objectFit: 'cover',
        justifyContent: 'center',
        borderRadius: 20,
    },
    bannerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    promo: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 7,
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        borderRadius: 10,
        top: 10
    },
    ScreenTitle: {
        position: 'absolute',
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryDarkGreyHex,
        paddingLeft: SPACING.space_10,
    },
    InputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryWhiteHex,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primaryLightGreyHex,
        color: COLORS.primaryOrangeHex,
        marginVertical: 40
    },
    CategoryActiveText: {
        color: COLORS.primaryWhiteHex,
        backgroundColor: COLORS.primaryOrangeHex,
        paddingVertical: 2,
        borderRadius: BORDERRADIUS.radius_10,
        paddingHorizontal: 7
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_16,
        marginBottom: SPACING.space_16,
        marginTop: 10
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
        display: 'flex',
        flexDirection: 'row'
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
        marginRight: SPACING.space_12
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },

    FlatListContainer: {
        gap: SPACING.space_8,
        paddingHorizontal: SPACING.space_2,
        paddingBottom: SPACING.space_28,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 50
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
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
})

export default HomeScreen