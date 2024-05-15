/*eslint-disable */
import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import GradientBGIcon from '../components/GradientBGIcon';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";

const PaymentScreen = (props: any) => {
    const orderItems = props.route.params.orderItems;
    const navigation: NavigationProp<any> = useNavigation();
    const [recipientName, setRecipientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const totalAmount = orderItems.reduce((total: number, item: any) => {
        return total + (item.quantity * item.price);
    }, 0);

    const db = getFirestore();
    const addOrderToFirestore = async (orderData: any) => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser != null) {
                const userEmail = currentUser.email;
                if (userEmail != null) {
                    const userDocRef = db.collection('users').doc(userEmail);
                    const doc = await userDocRef.get();
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userData) {
                            let orderHistoryList = userData.OrderHistoryList || [];
                            orderHistoryList.push(orderData);

                            await userDocRef.update({
                                OrderHistoryList: orderHistoryList,
                                CartList: []
                            });
                        }
                    } else {
                        console.log('No such document!');
                    }
                }
            }
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const handleOrder = () => {
        if (!recipientName || !phoneNumber || !address) {
            Alert.alert('Please fill in complete customer information.');
            return;
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const newOrder = {
            customerName: recipientName,
            phoneNumber: phoneNumber,
            address: address,
            orderItems: orderItems,
            totalAmount: totalAmount,
            orderTime: `${formattedDate} ${formattedTime}`
        };

        addOrderToFirestore(newOrder);

        Alert.alert("You have successfully placed your order!");
        navigation.navigate('History');
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.paymentContainer}>
                    <View style={styles.orderContainer}>
                        <View style={{marginVertical:3}}>
                            {orderItems.map((item: any) => {
                                return (
                                    <View style={styles.order}>
                                        <View style={styles.orderDetail}>
                                            <View>
                                                <Image source={item.imagelink_square} style={styles.orderImage} />
                                            </View>
                                            <View style={styles.name}>
                                                <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                                                    {item.name.length > 9 ? item.name.slice(0, 9) + '...' : item.name}
                                                </Text>
                                                <Text style={styles.sizeText} numberOfLines={1}>Size {item.size}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.price}>
                                            <Text style={styles.priceText}>{item.quantity} x ${item.price} = ${item.quantity * item.price}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: '#BDBDBD' }}></View>
                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total (USD)</Text>
                            <Text style={styles.totalText}>${totalAmount.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{marginVertical: 30}}>
                        <View>
                            <Text style={styles.billText}>Billing address</Text>
                        </View>
                        <View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.infoText}>Recipient name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={recipientName}
                                    onChangeText={(text) => setRecipientName(text)}
                                    placeholder='Your name'
                                    placeholderTextColor={COLORS.secondaryLightGreyHex}
                                />
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.infoText}>Phone number</Text>
                                <TextInput
                                    style={styles.input}
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    placeholder='Your phone number'
                                    placeholderTextColor={COLORS.secondaryLightGreyHex}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.infoText}>Address</Text>
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder='Your address'
                                placeholderTextColor={COLORS.secondaryLightGreyHex}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Text style={styles.billText}>Payment</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={styles.radioButton}>
                                <View style={styles.circle}></View>
                            </View>
                            <Text style={styles.infoText}>Payment on delivery</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleOrder}>
                        <View style={styles.orderBtn}>
                            <Text style={styles.orderTxt}>Order</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    paymentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: COLORS.primaryWhiteHex,
        height: '100%'
    },
    headerBarContainerWithBack: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom:5
    },
    order: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    orderContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#BDBDBD',
    },
    orderImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    orderDetail: {
        display: 'flex',
        flexDirection: 'row',
    },
    name: {
        justifyContent: 'center',
    },
    nameText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
        fontWeight: 'bold',
    },
    sizeText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex
    },
    priceText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryDarkGreyHex,
    },
    price: {
        marginRight: 10,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    },
    total: {
        marginHorizontal: 10,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    totalText: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryOrangeHex,
    },
    billText: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
        marginTop: 15
    },
    infoText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    },
    input: {
        borderColor: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 2,
        borderWidth: 1,
        borderRadius: 8,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 5,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    orderBtn: {
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    orderTxt: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    }
})

export default PaymentScreen
