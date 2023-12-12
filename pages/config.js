import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { BotaoIcon } from '../components/button';
import Footer from '../components/footer';

const ConfigScreen = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Header />
            <View>
            <BotaoIcon iconSource={require('../assets/user.png')} cor={'#1d568b'} texto={'Minha conta'} onPress={() => navigation.navigate('profile')} />
            <BotaoIcon iconSource={require('../assets/casa.png')} cor={'#1d568b'} texto={'Voltar ao menu'} onPress={() => navigation.navigate('Home')} />
            </View>
            <Footer footerStyle={{marginTop:'140%'}}/>
        </View>
    )
}

export default ConfigScreen;