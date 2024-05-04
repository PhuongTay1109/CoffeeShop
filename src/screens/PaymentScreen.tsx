import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const PaymentScreen = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.paymentContainer}>
                    <View style={styles.orderContainer}>
                        <View style={styles.order}>
                            <View style={styles.orderDetail}>
                                <View>
                                    <Image source={require('../assets/coffee_assets/americano/square/americano_pic_1_square.jpg')} style={styles.orderImage} />
                                </View>
                                <View style={styles.name}>
                                    <Text style={styles.nameText}>Name</Text>
                                    <Text style={styles.nameText} numberOfLines={1}>Description</Text>
                                </View>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.nameText}>1 x $6 = $6</Text>
                            </View>
                        </View>
                        <View style={styles.order}>
                            <View style={styles.orderDetail}>
                                <View>
                                    <Image source={require('../assets/coffee_assets/americano/square/americano_pic_1_square.jpg')} style={styles.orderImage} />
                                </View>
                                <View style={styles.name}>
                                    <Text style={styles.nameText}>Name</Text>
                                    <Text style={styles.nameText} numberOfLines={1}>Description</Text>
                                </View>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.nameText}>1 x $6 = $6</Text>
                            </View>
                        </View>
                        <View style={{borderWidth:0.5, borderColor: '#BDBDBD'}}></View>
                        <View style={ styles.total}>
                            <Text style={styles.totalText}>Total (USD)</Text>
                            <Text style={styles.totalText}>$6</Text>
                        </View>               
                    </View>
                    <View style={styles.billInfo}>
                        <View>
                            <Text style={styles.billText}>Billing address</Text>
                        </View>
                        <View>
                            <View style={{marginBottom: 20}}>
                                <Text style={styles.infoText}>Recipient name</Text>
                                <TextInput style={styles.input} />
                            </View>
                            <View style={{marginBottom: 20}}> 
                                <Text style={styles.infoText}>Phone number</Text>
                                <TextInput style={styles.input} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.infoText}>Address</Text>
                            <TextInput style={styles.input} />
                        </View>
                    </View>
                    <View style={styles.paymentContact}>
                        <Text style={styles.billText}>Payment</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={styles.radioButton}>
                                <View style={styles.circle}></View>
                            </View>
                            <Text style={styles.infoText}>Payment on delivery</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.orderBtn}>
                            <Text style={styles.orderTxt}>Order</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    paymentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: COLORS.primaryWhiteHex,
        flex: 1
    },
    billInfo: {
        flex: 4,
    },
    paymentContact: {
        flex: 1,
    },
    order : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingTop: 10,
        flex: 8
    },
    orderContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#BDBDBD',
        flex: 3,
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
    },
    price: {
        marginRight: 10,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    },
    total: {
        marginHorizontal: 10,
        height:50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
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
        paddingVertical:5,
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
