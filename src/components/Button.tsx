/*eslint-disable */

import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { FONTFAMILY, FONTSIZE } from '../theme/theme';

export default function Button(props) {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 30,
    width: "80%",
    marginLeft: 40
  },
  text: {
    fontSize: FONTSIZE.size_20,
    lineHeight: 21,
    fontFamily: FONTFAMILY.poppins_bold,
    color: 'white',
  },
});
