/*eslint-disable */

import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useNavigation, NavigationProp } from '@react-navigation/native';

const DetailsScreen = (props: any) => {
  const { index, id, roasted, imagelink_portrait, name, average_rating, price, description, favourite, reloadData, imagelink_square, special_ingredient } = props.route.params;

  // State to hold the selected size
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Find the price of the selected size
  const selectedPrice = price.find((sizePrice: any) => sizePrice.size === selectedSize)?.price || '0.00';

  // Function to handle adding item to cart
  const db = getFirestore();
  const navigation: NavigationProp<any> = useNavigation();

  const addToCart = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser != null) {
        const userEmail = currentUser.email;
        if (userEmail != null) {
          const userDocRef = db.collection('users').doc(userEmail);
          const selectedItem = {
            id,
            index,
            name,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1,
            imagelink_square,
            roasted
          };
  
          const snapshot = await userDocRef.get();
          const userData = snapshot.data();
          if (userData) {
            let cartList = userData.CartList || [];
  
            // Tìm kiếm sản phẩm trong giỏ hàng
            const foundIndex = cartList.findIndex((item: any) => item.id === id && item.size === selectedSize);
  
            if (foundIndex !== -1) {
              // Nếu sản phẩm đã tồn tại, cập nhật số lượng
              cartList[foundIndex].quantity += 1;
              
            } else {
              // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
              cartList.push(selectedItem);      
            }  

            // Cập nhật lại danh sách giỏ hàng vào Firebase
            await userDocRef.update({
              CartList: cartList
            });

            Alert.alert('Item added to cart successfully!');              
          }
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          average_rating={average_rating}
          name={name}
          roasted={roasted}
          favourite={favourite}
          imagelink_portrait={imagelink_portrait}
          id={id}
          index={index}
          reloadData={reloadData}
          showLeftIcon={true}
          special_ingredient={special_ingredient}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          <TouchableWithoutFeedback>
            <Text style={styles.DescriptionText}>{description}</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {price.map((sizePrice: any) => (
              <TouchableOpacity
                key={sizePrice.size}
                style={styles.SizeBox}
                onPress={() => setSelectedSize(sizePrice.size)} // Set the selected size when pressed
              >
                <Text style={styles.SizeText}>{sizePrice.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter price={selectedPrice} text="ADD TO CART" onPress={addToCart} />
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
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex
  },
});

export default DetailsScreen;