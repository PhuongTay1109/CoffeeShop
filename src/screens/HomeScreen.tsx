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
} from 'react-native';
import React from 'react'
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import {Dimensions} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.ScreenContainer} >
            <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                {/*Header */}
                <View style={styles.header} >
                    <HeaderBar />

                    <View style={{marginHorizontal: SPACING.space_30}}>
                        <View style={styles.bannerContainer}>
                            <Image source={require("../assets/coffee_assets/cappuccino/portrait/cappuccino_pic_2_portrait.png")} style={styles.banner} />
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
                        <TouchableOpacity>
                            <Image source={require("../assets/app_images/search.png")} style={{height:20, width:20, marginHorizontal: SPACING.space_20}} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.TextInputContainer}
                            placeholder='Search for your coffee...'
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                        />
                    </View>
                </View>

                {/*Category Scroller */}
                <View style={styles.footer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyle}>
                        <View style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity style={styles.CategoryScrollViewItem}>
                                <Text style={[styles.CategoryText, {color: COLORS.primaryOrangeHex}]}>All</Text>
                                <View style={styles.ActiveCategory}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.CategoryScrollViewItem}>
                                <Text style={styles.CategoryText}>Cappuccino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.CategoryScrollViewItem}>
                                <Text style={styles.CategoryText}>Macchiato</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.CategoryScrollViewItem}>
                                <Text style={styles.CategoryText}>Americano</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.CategoryScrollViewItem}>
                                <Text style={styles.CategoryText}>Espresso</Text>
                            </TouchableOpacity>     
                        </View>
                    </ScrollView>
                    
                    {/* Coffee list */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                        <View style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'space-evenly',  paddingBottom: 60}}>
                            <TouchableOpacity activeOpacity={1.0} style={{marginBottom: 20}}>
                                <CoffeeCard />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1.0} style={{marginBottom: 20}} >
                                <CoffeeCard />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1.0}  style={{marginBottom: 20}}>
                                <CoffeeCard />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1.0}  style={{marginBottom: 20}}>
                                <CoffeeCard />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
            height:308
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
            color: COLORS.primaryOrangeHex
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
            paddingHorizontal: SPACING.space_20,
            marginBottom: SPACING.space_20,
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
        ActiveCategory: {
            height: SPACING.space_10,
            width: SPACING.space_10,
            borderRadius: BORDERRADIUS.radius_10,
            backgroundColor: COLORS.primaryOrangeHex,
        },
        FlatListContainer: {
            gap: SPACING.space_20,
            paddingVertical: SPACING.space_20,
            paddingHorizontal: SPACING.space_30,
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
    })

    export default HomeScreen
