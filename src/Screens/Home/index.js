import { Text, Alert, Pressable, StyleSheet, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign, Ionicons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Swal from 'sweetalert2';

import { Context } from '../../Context/authContext'
import Map from '../../../assets/images/Map.jpeg'
import api from '../../API'

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(Context)
  const [carteira, setCarteira] = useState({})
  const [update, setUpdate] = useState(false)

  const alertasDesenvolvimento = () => {
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

  const modalActive = () => {
    Swal.fire({
      title: 'Perfil',
      html:
        '<input id="swal-input1"}>' +
        '<input id="swal-input2">',
      showConfirmButton: true,
      showCancelButton: true
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

    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Pressable
          onPress={() => modalActive()}
          style={styles.perfil}
        >
          <FontAwesome
            name='user'
            size={30}
            color='#000'
            style={styles.icon}
          />
        </Pressable>

        <Text style={styles.texto}>Olá, {state.name}</Text>

        <Pressable
          onPress={() => alert('config')}
          style={styles.config}
        >
          <FontAwesome
            name='gear'
            size={30}
            color='#000'
            style={styles.icon}
          />
        </Pressable>
      </View>

      <View style={styles.conta}>
        <View>
          <Text style={styles.textoConta}>Conta</Text>
          <Text style={styles.textoDinheiro}>R$ {carteira.saldoTotal ? carteira.saldoTotal : '0.00'}</Text>
        </View>

        <View>
          <Pressable>
            <AntDesign
              name='right'
              size={30}
              color='#FFBA52'
              style={styles.setaIcone}
              onPress={() => navigation.navigate('Carteira')}
            />
          </Pressable>
        </View>

      </View>
      <View style={styles.div}>
        <TouchableOpacity
          style={styles.botaoCartao}
          onPress={alertasDesenvolvimento}
        >
          <Ionicons
            name='md-card'
            size={25}
            color='black'
            style={{ marginLeft: '15px' }}
          />
          <Text style={styles.textoConta}>Meus cartões</Text>
        </TouchableOpacity>

        <Image
          source={Map}
          style={styles.imagemMapa}
        />

      </View>

      {/* <View style={styles.centeredView}>
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
              <Center height={950} width={650} style={styles.editModal}>
                <Box>
                  <Center>
                    <Text style={{ marginBottom: '50px', fontSize: '22px', fontWeight: '600' }}>Perfil</Text>
                    <Box>
                      <Box>
                        <Text>Nome</Text>
                        <Input variant="underlined" />
                      </Box>

                      <Box>
                        <Text>E-mail</Text>
                        <Input variant="underlined" />
                      </Box>

                      <Box>
                        <Text>CPF</Text>
                        <Input variant="underlined" />
                      </Box>

                      <Box>
                        <Text>Data de nascimento</Text>
                        <Input variant="underlined" />
                      </Box>
                    </Box>

                    <Box style={{ flexDirection: 'row', gap: '15px' }}>
                      <Button size='sm' style={styles.botaoSaldo}>
                        <Text style={{ fontWeight: '600' }}>Fechar</Text>
                      </Button>

                      <Button size='sm' style={styles.botaoSaldo}>
                        <Text style={{ fontWeight: '600' }}>Salvar</Text>
                      </Button>
                    </Box>

                    <Box>
                      <Button size='md' style={styles.botaoSenha}>
                        <Text style={{ fontWeight: '600' }}>Alterar senha</Text>
                      </Button>
                    </Box>
                  </Center>
                </Box>
              </Center>
            </BlurView>

          </Center>

        </Modal>
      </View > */}
    </View>

  )
}

export default Home

const styles = StyleSheet.create({
  tela: {
    flex: '1',
    backgroundColor: '#FFF'
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFBA52',
    alignItems: 'center',

  },

  perfil: {
    margin: 30,
    width: 50,
    height: 50,
    backgroundColor: '#FFC978',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    textAlign: 'center',
    paddingVertical: 'auto',
  },

  config: {
    margin: 30,
    width: 50,
    height: 50,
    backgroundColor: '#FFC978',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  texto: {
    fontWeight: 'bold',
    fontSize: '22px'
  },

  textoConta: {
    fontSize: '18px'
  },

  textoDinheiro: {
    fontSize: '18px',
    padding: '1px'
  },

  conta: {
    padding: '25px',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  setaIcone: {
    marginTop: '5px'
  },

  div: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoCartao: {
    width: '70%',
    height: '50px',
    borderRadius: '5px',
    backgroundColor: '#FFC978',
    fontWeight: 'bolder',
    textAlign: 'center',
    gap: '20px',
    fontSize: '20px',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px outset #000',
    marginTop: '20px'
  },

  imagemMapa: {
    width: '90%',
    height: 450,
    marginTop: '40px',
    borderRadius: '10px',
    border: '1px solid black',
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1,
  },

  editModal: {
    backgroundColor: '#FFFC',
    fontWeight: '400',
    borderRadius: '20px',
    color: 'white',

    // color='white' bg='gray.100' fontWeight={400} marginTop={'50%'}
  },
  botaoSaldo: {
    backgroundColor: '#FFC978',
    borderRadius: '5px',
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: '800'
  },

  containerInputs: {
    marginTop: '55px'
  },
  botaoSenha: {
    backgroundColor: '#FFC978',
    borderRadius: '5px',
    marginTop: '10px',
    textAlign: 'center',
    width: '145px',
  },
  ContainerBotoes: {
    flex: 1,
    flexDirection: 'row',
    gap: '40px',
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
    textAlign: 'center',
  },
  textoBotao: {
    fontWeight: 600
  },
})
