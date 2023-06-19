import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text }) => {
  return (
    <Pressable
        onPress={onPress}
        style={styles.container}
    >
        <Text style={styles.text}>
            {text}
        </Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC978',
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: '#000'
    },

    text: {
        padding: 15,
        fontWeight: 'bold',
        color: '#000'
    },
})