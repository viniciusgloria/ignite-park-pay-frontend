import { Text, Pressable, StyleSheet, View, Modal, Alert, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign, Ionicons, MaterialIcons, Entypo, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons'
import { Box, Input, Center, Button, Flex } from 'native-base'
import { BlurView } from 'expo-blur';
import Swal from 'sweetalert2'

import api from '../../API'
import { Context } from '../../Context/authContext'

const RegisterCarteira = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    const [saldoTotal, setSaldoTotal] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [carteira, setCarteira] = useState({})
    const [update, setUpdate] = useState(false)

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post('/wallet', {
                saldoTotal: saldoTotal,
                idUsuario: state.idUser
            })

            if (authData.status === 200) {
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
                    title: 'Saldo atualizado com sucesso'
                })
                setSaldoTotal('')
                setModalVisible(false)
                screenLoad()
                dispatch({ type: 'update', payload: true})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const notificacao = () => {
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
            title: 'Funcionalidade em desenvolvimento'
        })
    }

    const screenLoad = async () => {
        const id = state.idUser
        const list = await api.get('/wallet' + id)
        setCarteira(list.data.saldo)
    }

    useEffect(() => {
        screenLoad()
    }, [update])

    return (
        <Box style={styles.box}>
            <View style={styles.containerGeral}>
                <View style={styles.conta}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                        >
                            <AntDesign
                                name='left'
                                size={30}
                                color='#FFBA52'
                                style={styles.setaIcone}
                            />
                        </Pressable>

                        <Pressable onPress={() => setModalVisible(true)}>
                            <SimpleLineIcons style={{ marginTop: '10px' }} name="wallet" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View style={{ marginLeft: '5px' }}>
                        <Text style={styles.textoConta}>Saldo Disponível</Text>
                        <Text style={styles.textoDinheiro}>R$ {carteira.saldoTotal ? carteira.saldoTotal : '0.00'}</Text>
                    </View>
                </View>


                <View style={styles.ContainerBotoes}>
                    <View style={styles.botao1}>
                        <Pressable style={styles.botao} onPress={notificacao}>
                            <MaterialIcons name="attach-money" size={30} color="black" />
                        </Pressable>
                        <Text style={styles.textoBotao}>Cashback</Text>
                    </View>
                    <View style={styles.botao1}>
                        <Pressable onPress={notificacao} style={styles.botao}>
                            <MaterialIcons name="phone-iphone" size={30} color="black" />
                        </Pressable>
                        <Text style={styles.textoBotao} t>Recarga</Text>
                    </View>
                    <View style={styles.botao1}>
                        <Pressable onPress={notificacao} style={styles.botao}>
                            <Entypo name="map" size={30} color="black" />
                        </Pressable>
                        <Text style={styles.textoBotao}>Mapa</Text>
                    </View>
                    <View style={styles.botao1}>
                        <Pressable onPress={notificacao} style={styles.botao}>
                            <FontAwesome5 name="user-friends" size={25} color="black" />
                        </Pressable>
                        <Text style={styles.textoBotao}>Convidar</Text>
                    </View>
                </View>
                
                <Box style={{ width: '100%' }}>
                    <Box style={{ marginTop: '15px', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ fontWeight: '600', marginBottom: '4px' }}>Histórico</Text>
                        <Input
                            variant="filled"
                            placeholder='Buscar'
                            backgroundColor='#FFC978'
                            color='#000'
                            placeholderTextColor='#000'
                        />
                    </Box>
                    
                    <ScrollView style={{ marginTop: '10px' }}>
                        <FlatList
                            data={carteira.data}
                            style={{ width: '100%' }}
                            renderItem={({ item }) => {
                                console.log(item)
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingLeft: '20px', paddingRight: '20px', display: 'flex', paddingTop: '10px' }}>
                                        <Ionicons name="add-circle-outline" size={44} color="black" />
                                        <Box>
                                            <Box style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: '14px', fontWeight: '600' }}>Crédito Adicionado</Text>
                                                <Text style={{ color: 'gray' }}>{}</Text>
                                            </Box>
                                            <Text style={{ color: 'gray' }}>Cartão de crédito</Text>
                                            <Text style={{ color: 'gray' }}>R${item.saldoTotal}</Text>
                                        </Box>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.idUsuario}
                        />
                    </ScrollView>
                </Box>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed')
                        setModalVisible(false)
                    }}
                >
                    <Center>
                        <BlurView intensity={30} tint='light'>
                            <Center height={200} width={{ base: 500, lg: 550 }} style={styles.editModal}>
                                <Box>
                                    <Center>
                                        {/* <Text style={{}}>Adicionar</Text> */}
                                        <Text style={{ fontWeight: '400', marginBottom: '25px', fontSize: '24px' }}>Adicionar</Text>
                                        <Input variant="underlined" placeholder='R$: 0.00' type='' value={saldoTotal} onChangeText={setSaldoTotal} />
                                        <Button size='sm' onPress={onRegisterPressed} style={styles.botaoSaldo}>
                                            <Text style={{ fontSize: '16px' }}>Inserir Saldo</Text>
                                        </Button>
                                    </Center>
                                </Box>
                            </Center>
                        </BlurView>

                    </Center>

                </Modal>
            </View>
        </Box>
    )
}

export default RegisterCarteira

const styles = StyleSheet.create({

    box: {
        backgroundColor: '#FFF',
        flex: 1
    },
    containerGeral: {
        // backgroundColor: '#FFF'
    },

    texto: {
        fontWeight: 'bolder',
        fontSize: '22px'
    },

    textoConta: {
        fontSize: '14px',
        marginTop: '25px',
        fontWeight: '600'
    },

    textoDinheiro: {
        fontSize: '30px',
        fontWeight: '600'
    },

    conta: {
        padding: '25px',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    setaIcone: {
        marginTop: '5px',
    },

    ContainerBotoes: {
        flex: 1,
        flexDirection: 'row',
        gap: '35px',
        justifyContent: 'center'
    },
    botao: {
        width: 50,
        height: 50,
        backgroundColor: '#FFC978',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botao1: {
        alignItems: 'center',
        gap: "3px"
    },
    textoBotao: {
        fontWeight: 600
    },
    editModal: {
        backgroundColor: '#FFFC',
        fontWeight: '400',
        marginTop: '50%',
        borderRadius: '20px',
        color: 'white',
    },
    botaoSaldo: {
        backgroundColor: '#FFC978',
        borderRadius: '5px',
        marginTop: '10px',
        textAlign: 'center',
        fontWeight: '600'
    }
})