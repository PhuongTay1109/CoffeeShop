/*eslint-disable */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    padding: 30, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'gray'
  },
  messageText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    textAlign: 'center'
  },
  closeText: {
    color: COLORS.primaryWhiteHex, 
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_light 
  },
  closeButton: {
    marginTop: 10, 
    backgroundColor: COLORS.primaryOrangeHex, 
    padding: 10, 
    borderRadius: 10
  }
})

export default CustomAlert;
