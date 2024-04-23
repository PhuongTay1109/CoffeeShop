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

const DetailsScreen = () => {

  return (
    <View style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewFlex}>
            <ImageBackgroundInfo />

            <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            <TouchableWithoutFeedback >
                <Text style={styles.DescriptionText}>
                    Mô tả....
                </Text>
            </TouchableWithoutFeedback>
            <Text style={styles.InfoTitle}>Size</Text>
            <View style={styles.SizeOuterContainer}>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text>
                        S
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text>
                        M
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SizeBox}>
                    <Text>
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
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default DetailsScreen;