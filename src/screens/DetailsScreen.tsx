/*eslint-disable */

import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = (props: any) => {
  // Sử dụng props.navigation.getParam() để truy cập các thuộc tính
  const index = props.route.params.index;
  const id = props.route.params.id;
  const type = props.route.params.type;
  const roasted = props.route.params.roasted;
  const imagelink_portrait = props.route.params.imagelink_portrait;
  const name = props.route.params.name;
  const average_rating = props.route.params.average_rating;
  const price = props.route.params.price;
  const description = props.route.params.description;
  const favourite = props.route.params.favourite;

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
            />

            <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            <TouchableWithoutFeedback >
                <Text style={styles.DescriptionText}>
                    {description}
                </Text>
            </TouchableWithoutFeedback>
            <Text style={styles.InfoTitle}>Size</Text>
            <View style={styles.SizeOuterContainer}>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text  style={styles.SizeText}>
                        S
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text  style={styles.SizeText}>
                        M
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text  style={styles.SizeText}>
                        L
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <PaymentFooter />
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