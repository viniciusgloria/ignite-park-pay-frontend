import { StyleSheet, Text, View,  TouchableOpacity, TextInput, Pressable } from "react-native";
import React, { useState } from 'react';
import api from '../API'
import CustomButton from "../Components/CustomButton";
import { AntDesign } from '@expo/vector-icons';
import { Box, Center, Checkbox, Button } from 'native-base' 
import Swal from "sweetalert2";

const RegisterUser = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");


    const onRegisterPressed = async () => {

        try {
            const data = await api.post('/cliente', {
                nome: nome,
                email: email,
                cpf: cpf,
                senha: senha,
                admin: false
            });
            if (data.status === 201) {
                console.log(data)
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
                    icon: 'success',
                    title: `Sejá Bem-Vindo ${data.data.nome}`
                })
                navigation.navigate('Login')
            } else {
                console.log(data)
            }

        } catch (err) {
            console.log(err);
            
            if (err != null) {
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
                    icon: 'error',
                    title: 'Preencha todos os dados corretamente'
                })
            }
        }

    }

    return (
        <View style={styles.view}>
            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <Text style={{ marginLeft: '5px', marginTop: '4px', fontWeight: '500' }}>Voltar</Text>
            </View>

            <Box style={{marginTop: '50px', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: '32px', fontWeight: 'bolder', marginBottom: '25px' }}>Cadastro</Text>
                <Text style={{ fontWeight: '500', textAlign: 'center' }}>Preencha os campos e comece a navegar pela nossa plataforma!</Text>

                <Box style={{ marginTop: '70px', width: '100%' }}>
                    <TextInput
                        placeholder='Nome'
                        value={nome}
                        setValue={setNome}
                        onChangeText={setNome}
                        style={styles.caixaInputs}
                    />

                    <TextInput
                        placeholder='E-mail'
                        value={email}
                        setValue={setEmail}
                        onChangeText={setEmail}
                        style={styles.caixaInputs}
                    />

                    <TextInput
                        placeholder='CPF'
                        value={cpf}
                        setValue={setCpf}
                        onChangeText={setCpf}
                        style={styles.caixaInputs}
                    />

                    <TextInput
                        placeholder='Senha'
                        value={senha}
                        setValue={setSenha}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style={styles.caixaInputs}
                    />

                    <Box style={{ marginTop: '70px', marginBottom: '10px' }}>
                        <Checkbox>
                            <Text> Eu concordo com os <a style={{ color: '#FFBA59', textDecoration: 'underline' }}>Termos e condições</a> e a <a style={{ color: '#FFBA59', textDecoration: 'underline' }}> Política de privacidade. </a></Text>
                        </Checkbox>
                    </Box>

                    <CustomButton text="Cadastrar" onPress={onRegisterPressed} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={styles.register}
                    >
                        <Center>
                            <Text>
                                Já tem uma conta?{" "}
                                <Text style={styles.loginText}>Faça o login</Text>
                            </Text>
                        </Center>
                    </TouchableOpacity>
                </Box>
            </Box>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 30,
        backgroundColor: '#FFF'
    },
    logo: {
        width: '80%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    register: {
        padding: 5,
    },

    caixaInputs: {
        width: '100%',
        height: '50px',
        borderWidth: '1px',
        borderRadius: 5,
        borderColor: '#E4E4E4',
        outlineColor: "#FFF",
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        marginTop: '15px',
        marginBottom: '15px'
    },
});

export default RegisterUser;