import {
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
  import OrderItemCard from './OrderItemCard';

  const OrderHistoryCard = () => {
    return (
      <View style={styles.CardContainer}>
        <View style={styles.CardHeader}>
          <View>
            <Text style={styles.HeaderTitle}>Order Time</Text>
            <Text style={styles.HeaderSubtitle}>20th November</Text>
          </View>
          <View style={styles.PriceContainer}>
            <Text style={styles.HeaderTitle}>Total Amount</Text>
            <Text style={styles.HeaderPrice}>$ 8.40</Text>
          </View>
        </View>
        <View style={styles.ListContainer}>
            <TouchableOpacity >
              <OrderItemCard />
            </TouchableOpacity>
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