/*eslint-disable*/

import {View, Text, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'

const Input = (props) => {
    const onChangeText = (text) => {
        props.onInputChange(props.id, text)
    }

    return (
        <View style={styles.container}>
            <View 
                style={[styles.inputContainer, {borderColor: COLORS.primaryDarkGreyHex}]}>
                <TextInput
                    {...props}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    style={styles.input}
                    autoCapitalize='none'
                    onChangeText={onChangeText}
                />

            </View>
            {
                props.errorText && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {props.errorText[0]}
                        </Text>

                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryDarkGreyHex,
        marginTop: 40,
        flexDirection: "row"
    },
    input: {
        color: COLORS.primaryLightGreyHex,
        flex: 1,
        fontFamily: FONTFAMILY.poppins_light,
        paddingTop: 0,
        fontSize: FONTSIZE.size_18
    },
    errorContainer: {
        marginVertical: 4
    },
    errorText: {
        color: "red",
        fontSize: FONTSIZE.size_18
    }

})

export default Input;