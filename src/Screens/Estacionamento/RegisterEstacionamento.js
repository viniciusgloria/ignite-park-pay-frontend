import { Picker, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import CustomInput from '../../Components/CustomInput'
import { Context } from '../../Context/authContext'
import api from '../../API'
import Estacionamentos from './Estacionamentos'


const RegisterEstacionamento = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    const { height } = useWindowDimensions()

    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [funcionamento, setFuncionamento] = useState('')
    const [horario, setHorario] = useState('')

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post(`/estacionamento`, {
                idUsuario: state.idUser,
                nome: nome,
                cnpj: cnpj,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                funcionamento: funcionamento,
                horario: horario
            })

            if (authData.status === 200) {
                alert(authData.data.message)
                setNome('')
                setCnpj('')
                setEndereco('')
                setNumero('')
                setBairro('')
                setCidade('')
                setEstado('')
                setFuncionamento('')
                setHorario('')
                dispatch({ type: 'update', payload: true })
            } else {
                console.log(authData.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', padding: '25px' }}>
                <Pressable onPress={() => navigation.navigate("Estacionamentos")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <Text style={{ marginLeft: '5px', marginTop: '4px', fontWeight: '500' }}>Voltar</Text>
            </View>
            <View style={styles.textoRegistro}>
                <Text style={styles.texto}>Registro de Estacionamento</Text>
            </View>

            <View style={styles.view}>
                <CustomInput
                    placeholder='Nome Estabelezimento'
                    value={nome}
                    setValue={setNome}
                />

                <CustomInput
                    placeholder='CNPJ'
                    value={cnpj}
                    setValue={setCnpj}
                />

                <CustomInput
                    placeholder='Endereço'
                    value={endereco}
                    setValue={setEndereco}
                />

                <CustomInput
                    placeholder='Número'
                    value={numero}
                    setValue={setNumero}
                />

                <CustomInput
                    placeholder='Bairro'
                    value={bairro}
                    setValue={setBairro}
                />

                <CustomInput
                    placeholder='Cidade'
                    value={cidade}
                    setValue={setCidade}
                />

                <CustomInput
                    placeholder='Estado'
                    value={estado}
                    setValue={setEstado}
                />

                <Picker
                    selectedValue={funcionamento}
                    onValueChange={setFuncionamento}
                    style={styles.funcionamento}
                >
                    <Picker.Item label="Dia de Funcionamento" value="0" />
                    <Picker.Item label="Seg. Sex." value="Seg. Sex." />
                    <Picker.Item label="Seg. Sab." value="Seg. Sab." />
                    <Picker.Item label="Seg. Dom." value="Seg. Dom." />
                </Picker>


                <Picker
                    selectedValue={horario}
                    onValueChange={setHorario}
                    style={styles.hora}
                >
                    <Picker.Item label="Horario de Funcionamento" value="0" />
                    <Picker.Item label="08h às 18h" value="08h às 18h" />
                    <Picker.Item label="08h às 19h" value="08h às 19h" />
                    <Picker.Item label="08h às 20h" value="08h às 20h" />
                    <Picker.Item label="08h às 21h" value="08h às 21h" />
                    <Picker.Item label="08h às 22h" value="08h às 22h" />
                    <Picker.Item label="24h" value="24h" />
                </Picker>

                <TouchableOpacity
                    onPress={onRegisterPressed}
                    style={styles.cadastrar}
                >
                    <Text style={styles.cadastrarTexto}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RegisterEstacionamento

const styles = StyleSheet.create({
    textoRegistro: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },

    texto: {
        fontSize: 30,
    },

    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    funcionamento: {
        backgroundColor: '#FFF',
        width: '85%',
        marginVertical: 5,
        borderRadius: 5,
        border: 'none',
        height: 46,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 14,
    },

    hora: {
        backgroundColor: '#FFF',
        width: '85%',
        marginVertical: 5,
        borderRadius: 5,
        border: 'none',
        height: 46,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 14,
    },

    cadastrar: {
        backgroundColor: '#FFBA59',
        width: '85%',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 46,
    },

    cadastrarTexto: {
        fontWeight: 'bold',
    }
})
