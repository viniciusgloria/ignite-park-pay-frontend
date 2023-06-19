import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView, Pressable} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Center, Wrap } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import api from '../../API'
import { Context } from '../../Context/authContext'
import CustomButton from '../../Components/CustomButton'

const Estacionamentos = ({ navigation }) => {
  const { state, dispatch } = useContext(Context)
  const [update, setUpdate] = useState(false)
  const [estacionamento, setEstacionamento] = useState({})

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [funcionamento, setFuncionamento] = useState('')
  const [horario, setHorario] = useState('')

  const screenLoad = async () => {
    const list = await api.get('/estacionamento')
    setEstacionamento(list.data.estacionamento)
  }

  useEffect(() => { 
    screenLoad()
  }, [update])

  const deletarId = async (id) => {
    await api.delete(`/estacionamento/${id}`)
    setUpdate(!update)
  }

  const atualizarEstacionamento = async (id) => {
    try {
      const authData = await api.patch(`/estacionamento/${id}`, {
        idUsuario: id,
        nome: 'teste',
        cnpj: '321',
        endereco: 'teste',
        numero: '21',
        bairro: 'teste',
        cidade: 'teste',
        estado: 'te',
        funcionamento: 'seg.sex',
        horario: '18h19h'
      })

      if (authData.status == 200) {
        alert('Dados atualizados')
      } else {
        alert('Erro ao atualizar dados')
      }
    } catch(error) {
      console.log(error)
    }
  }



  return (
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>
      <Center style={{ paddingVertical: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: '25px' }}>Estacionamento</Text>
        <View style={styles.containerCabecalho}>
          {state.isAdmin ? (
            <View style={styles.botaoNovo}>
              <CustomButton
                text='Novo Estacionamento'
                onPress={() => navigation.navigate('RegisterEstacionamento')}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </Center>

      <ScrollView style={styles.containerCard}>
        <FlatList
          data={estacionamento}
          renderItem={({ item }) => {
            return (
              <Center style={{ marginTop: '0px' }}>
                <View style={styles.container}>
                  <View style={{ marginLeft: '25px' }}>
                    <Text style={styles.text}>
                      <Text style={styles.text2}>Estacionamento: </Text>{item.nome}
                    </Text>

                    <Text style={styles.text}>
                      <Text style={styles.text2}>Endereço: </Text>{item.endereco}, {item.numero}
                    </Text>

                    <Text style={styles.text}>
                      <Text style={styles.text2}>Bairro: </Text>{item.bairro}
                    </Text>

                    <Text style={styles.text}>
                      <Text style={styles.text2}>Horários: </Text>{item.horario}
                    </Text>
                  </View>

                  {state.isAdmin ? (
                    <View>
                      <View style={styles.containerBotao}>
                        <TouchableOpacity
                          onPress={() => atualizarEstacionamento(item.id)}
                          style={styles.botao}
                        >
                          <Entypo
                            name='pencil'
                            size={20}
                            color='#000'
                          />
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.containerBotao}>
                        <TouchableOpacity
                          onPress={() => deletarId(item.id)}
                          style={styles.botao}
                        >
                          <Entypo
                            name='trash'
                            size={20}
                            color='#000'
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </Center>
            )
          }}
          style={styles.list}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  )
}

export default Estacionamentos

const styles = StyleSheet.create({
  containerCabecalho: {
    width: '70%'
  },

  botaoNovo: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerCard: {

  },

  container: {
    width: '90%',
    height: '15vh',
    backgroundColor: '#FFBA52',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between'

  },

  containerBotao: {
    width: '20%',
    paddingVertical: 5,
    marginRight: 10
  },

  botao: {
    boder: 'none',
    borderRadius: 20,
    backgroundColor: '#FFC978',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '40px'
  },


  text: {
    fontSize: 14,
    marginTop: '5px'
  },

  text2: {
    fontWeight: 800,
  }
})
