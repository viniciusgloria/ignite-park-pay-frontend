import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'


const CustomInput = ({ value, setValue, placeholder, secureTextEntry, editable }) => {
  return (
    <View style={styles.container}>
        <TextInput
            value={ value }
            onChangeText={ setValue }
            placeholder={ placeholder }
            style={ styles.input }
            secureTextEntry={ secureTextEntry }
            editable={ editable }
        />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: '1px',
        borderRadius: 5,
        borderColor: '#E4E4E4',
        outlineColor: "#FFF",
        width: '85%',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20
    },

    input: {
        padding: 15,
        fontWeight: 'bold', 
    },
})