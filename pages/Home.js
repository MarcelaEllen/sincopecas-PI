import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import ImgBlock from '../components/ImgContainer';
import MenuInferior from '../components/menuNav';
import * as Location from 'expo-location';

export default function Home() {
  const navigation = useNavigation();

  // Função para solicitar permissão de localização
  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permissão para acessar a localização foi negada.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const navigateToConfig = () => {
    navigation.navigate('config');
  };

  const navigateToSenac = () => {
    navigation.navigate('aprendaMais');
  };

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity onPress={() => navigation.navigate('PreProva')}>
        <ImgBlock
          imageSource={require('../assets/simulado.png')}
          containerStyle={{ marginBottom: 35, marginTop: 40 }}
          text={'Avaliação'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('resultado')}>
        <ImgBlock
          imageSource={require('../assets/avaliacao.png')}
          containerStyle={{ marginBottom: 40 }}
          text={'Resultado'}
        />
      </TouchableOpacity>
      <MenuInferior
        Image1={require('../assets/configuracao.png')}
        onPress1={navigateToConfig}
        Image2={require('../assets/diplomado.png')}
        onPress2={navigateToSenac}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
