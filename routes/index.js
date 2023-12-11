import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

import Home from '../pages/Home'
import PreProvaScreen from '../pages/preProva'
import AprendaMais from '../pages/aprendaMais'
import LoginScreen from '../pages/login'
import {CadastroScreen, ProximaCadastro}  from '../pages/cadastro'


export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
                <Stack.Screen name="PreProva" component={PreProvaScreen} options={{headerShown : false}}/>
                <Stack.Screen name="aprendaMais" component={AprendaMais} options={{headerShown : false}}/>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown : false}}/>
                <Stack.Screen name="cadastro" component={CadastroScreen} options={{headerShown : false}}/>
                <Stack.Screen name="proximaCadastro" component={ProximaCadastro} options={{headerShown : false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}