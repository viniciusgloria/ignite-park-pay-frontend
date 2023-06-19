import { StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, AntDesign } from '@expo/vector-icons'

import { Context } from '../Context/authContext'
import Home from './Home'
import EstacionamentoRoutes from './Estacionamento/EstacionamentoRoutes.js'
import RegisterCarteira from './Carteira/RegisterCarteira.js'
import Login from './Login'
import api from '../API'

const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='home' size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Estacionamento"
                component={EstacionamentoRoutes}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name='car' size={30} />
                    )
                }}
            />

            <Tab.Screen
                name="Carteira"
                component={RegisterCarteira}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name='wallet' size={30} />
                    )
                }}
            />

            <Tab.Screen
                name="Sair"
                component={Login}
                options={{
                    tabBarIcon: () => (
                        <Entypo
                            name='log-out'
                            size={20}
                            style={{ margin: 10 }}
                            onPress={() => dispatch({ type: 'logOut' })}
                            color="#000"
                        />
                    )
                }}
            />

            {/* {state.isAdmin ? (
                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{
                        tabBarIcon: () => (
                            <Entypo name='user' size={30} />
                        )
                    }}
                />
            ) : (
                <></>
            )
            } */}

        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({})