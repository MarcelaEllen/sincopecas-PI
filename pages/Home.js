import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/footer';
import ImgBlock from '../components/ImgContainer';


export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
      <Header />
      <TouchableOpacity onPress={() => navigation.navigate('PreProva')}>
        <ImgBlock
          imageSource={require('../assets/simulado.png')}
          containerStyle={{ marginBottom: 35, marginTop: 40 }}
          text={'Avaliação'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('cadastro')}>
        <ImgBlock
          imageSource={require('../assets/avaliacao.png')}
          containerStyle={{ marginBottom: 35 }} 
          text={'Resultado'}
        />
        </TouchableOpacity>
      <Footer />
   
    </View>
  );

}


