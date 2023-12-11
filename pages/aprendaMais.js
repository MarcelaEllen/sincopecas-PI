import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../components/Header';

const AprendaMais = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
     
      <View style={styles.main}>
        {/* Vídeos */}
        <View style={styles.videoContent}>
          <View style={styles.videoTexto}>
            <Text style={styles.texto}>
              Em parceria com o Senac, nossa plataforma oferece cursos sob medida para impulsionar sua carreira.
              Acesse facilmente no seu celular e eleve seu desempenho profissional com a excelência do Senac.
            </Text>
          </View>
          <View style={styles.videoWrapper}>
            {/* Primeiro vídeo */}
            <Image style={styles.videoThumbnail} source={{ uri: 'https://i.ytimg.com/vi/Br4xr9BpqSc/hqdefault.jpg' }} />
          </View>
        </View>

        {/* Segundo vídeo */}
        <View style={styles.videoWrapper}>
          <Image style={styles.videoThumbnail} source={{ uri: 'https://i.ytimg.com/vi/7hY7NPvILo8/hqdefault.jpg' }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  menuLink: {
    marginBottom: 10,
    color: 'green',
  },
  main: {
    alignItems: 'center',
    marginTop: 20,
  },
  videoContent: {
    marginBottom: 20,
  },
  videoTexto: {
    marginBottom: 10,
  },
  texto: {
    textAlign: 'center',
  },
  videoWrapper: {
    width: 280,
    height: 215,
    marginBottom: 20,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
});

export default AprendaMais;
