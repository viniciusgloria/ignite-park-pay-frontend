import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RegisterEstacionamento from './RegisterEstacionamento'
import Estacionamentos from './Estacionamentos'

const Stack = createNativeStackNavigator()

const EstacionamentoRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Estacionamentos' component={Estacionamentos} />
        <Stack.Screen name='RegisterEstacionamento' component={RegisterEstacionamento} />
    </Stack.Navigator>
  )
}

export default EstacionamentoRoutes
