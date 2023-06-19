import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { Context } from '../Context/authContext';
import api from '../API';

const ValidateToken = ({ navigation }) => {
    const { state, dispatch } = useContext(Context);
    setTimeout(() => {
        const validateToken = async () => {
            const authorization = await AsyncStorage.getItem("Authorization");
            if (authorization) {
                try {
                    const data = await api.get('/login', {
                        headers: {
                            authorization: authorization
                        }
                    });
                    await dispatch({ type: 'verify', payload: data.data.authData })
                    navigation.navigate("Routes")
                } catch (error) {
                    console.log(error)
                    dispatch({ type: 'logIn', payload: false })
                }
            } else {
                dispatch({ type: 'logIn', payload: false })
            }
        };
        validateToken();
    }, 500);

    return (
        <View style={styles.container}>
            <ActivityIndicator color="#FFBA52" size={80} />
        </View>
    )
}

// rgba(255,169,0,100)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ValidateToken