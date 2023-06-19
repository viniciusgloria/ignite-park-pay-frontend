import { StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Box, Button, Center } from 'native-base';
import Swal from 'sweetalert2';

import api from '../API';
import { Context } from '../Context/authContext';
import Logo from "../../assets/images/Logo.png";

const Login = ({ navigation }) => {
    const { dispatch } = useContext(Context);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onLoginPressed = async () => {
        try {
            const authData = await api.post('/login', {
                email: email,
                senha: senha
            })
            if(authData.status === 200){
                await AsyncStorage.setItem('Authorization', authData.data.token)
                dispatch({type:'logIn', payload: true})
            } else {
                alert('Email/Senha Inválidos assa')
                setEmail('')
                setSenha('')
            }
        } catch (error) {
            alert('Email/Senha Inválidos')
            setEmail('')
            setSenha('')
        }
    }

    const desenvolvimento = () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        toast.fire({
            icon: 'info',
            title: `Em Desenvolvimento...`
        })
    }

    return (
        <View style={styles.containerGeral}>
            <Center>
                <Box style={styles.topo}>
                    <Image
                        source={Logo}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.loginImage}>Entre e faça seu login!</Text>
                </Box>

                <Box style={styles.inputs}>
                    <Box style={styles.inputsSeparado}>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.caixaInputs}
                        />
                    </Box>

                    <Box style={styles.inputsSeparado}>
                        <TextInput
                            placeholder='Senha'
                            value={senha}
                            secureTextEntry={true}
                            onChangeText={setSenha}
                            style={styles.caixaInputs}
                        />
                    </Box>

                    <Pressable
                        style={styles.esqueceuSenha}
                        onPress={desenvolvimento}
                    >
                        <Text>Esqueceu a senha?</Text>
                    </Pressable>
                </Box>

                <Box style={styles.botoes}>
                    <Box style={styles.botoesSeparados}>
                        <Button 
                            onPress={onLoginPressed}
                            style={[styles.customBotao, { backgroundColor: '#FFBA52'}]}
                        >
                            <Text style={{fontWeight: 'bold'}}>Login</Text>
                        </Button>
                    </Box>

                    <Box style={styles.botoesSeparados}>
                        <Button
                            onPress={() => navigation.navigate("RegisterUser")}
                            style={[styles.customBotao, { backgroundColor: '#FFF', borderWidth: '1px', borderColor: '#FFBA52' }]}
                        >
                            <Text style={{fontWeight: 'bold'}}>Cadastre-se</Text>
                        </Button>
                    </Box>

                    <Text style={{textAlign: 'center', paddingVertical: 30}}>Ou</Text>

                    <Box style={styles.botoesSeparados}>
                        <Button
                            style={styles.botoesAPI}
                            onPress={desenvolvimento}
                        >
                            <FontAwesome
                                name="google"
                                size={20}
                                color='#000'
                                style={{ marginLeft: '-30px'}}
                            />
                            <Text style={{ marginTop: '-18px' }}>Entrar com o Google</Text>
                        </Button>
                    </Box>

                    <Box style={styles.botoesSeparados}>
                        <Button
                            style={styles.botoesAPI}
                            onPress={desenvolvimento}
                        >
                            <FontAwesome5
                                name="facebook"
                                size={20}
                                style={{ marginLeft: '-30px'}}
                            />
                            <Text style={{ marginTop: '-18px' }}>Entrar com o Facebook</Text>
                        </Button>
                    </Box>
                </Box>
            </Center>
        </View>
    )
};

const styles = StyleSheet.create({
    containerGeral: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    topo: {
        justifyContent: 'center',
        paddingVertical: 30
    },

    image: {
        paddingVertical: 100
    },

    loginImage: {
        marginTop: -40,
        marginBottom: 30
    },

    inputs: {
        width: '90%',
        height: '30%',
        marginTop: -50
    },

    inputsSeparado: {
        paddingVertical: 10,
        marginTop: 10
    },

    caixaInputs: {
        height: '50px',
        borderWidth: '1px',
        borderRadius: 5,
        borderColor: '#E4E4E4',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20
    },

    botoes: {
        width: '90%',
    },

    botoesSeparados: {
        paddingVertical: 10
    },

    customBotao: {
        height: '50px',
        borderRadius: 5,
    },

    botoesAPI: {
        backgroundColor: '#FFF',
        borderWidth: '1px',
        borderColor: '#E4E4E4',
        borderRadius: 5,
        height: '50px'
    },
    
})

export default Login;