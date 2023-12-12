import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import ImgBlock from '../components/ImgContainer';
import MenuInferior from '../components/menuNav';


export default function Home() {
  const navigation = useNavigation();

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
})

