/*eslint-disable */
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from './OrderItemCard';

const OrderHistoryCard = (props: any) => {
  const { orderItems, totalAmount, orderTime} = props;
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View style={styles.HeaderItem}>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubtitle}>{orderTime}</Text>
        </View>
        <View style={[styles.HeaderItem, styles.PriceContainer]}>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderPrice}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {orderItems.map((item: any) => {
          return (
            <OrderItemCard
              imagelink_square={item.imagelink_square}
              name={item.name}
              size={item.size}
              price={item.price}
              quantity={item.quantity} 
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING.space_10,
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  HeaderItem: {
    flex: 1,
    alignItems: 'center',
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  PriceContainer: {
    alignItems: 'flex-end',
  },
  HeaderPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  ListContainer: {
    gap: SPACING.space_20,
  },
});

export default OrderHistoryCard;
