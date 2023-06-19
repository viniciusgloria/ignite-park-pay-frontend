import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Context, Provider } from "./src/Context/authContext";

import Login from "./src/Screens/Login";
import ValidateToken from "./src/Screens/ValidateToken";
import RegisterUser from "./src/Screens/RegisterUser";
import Routes from "./src/Screens/Routes"

const Stack = createNativeStackNavigator()

const App = () => {
    const { state } = useContext(Context)
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* <Stack.Screen name="Routes" component={Routes} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="RegisterUser" component={RegisterUser} /> */}
                    {state.Loading ? (
                        <Stack.Screen name="ValidateToken" component={ValidateToken} />
                    ) : (
                        state.isLogged ? (
                            <>
                                <Stack.Screen name="ValidateToken" component={ValidateToken} />
                                <Stack.Screen name="Routes" component={Routes} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="RegisterUser" component={RegisterUser} />
                            </>
                        )
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    App: {
        flex: 1,
        backgroundColor: '#FFBA52'
    }
})

export default () => {
    return (
        <Provider>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </Provider>
    )
}