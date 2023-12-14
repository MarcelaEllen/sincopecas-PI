import { View, ScrollView, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CaixaTexto from '../components/caixaTexto';
import Header from '../components/Header';
import { Botao } from '../components/button';
import { useNavigation } from '@react-navigation/native';

export const CadastroScreen = () => {

  const navigation = useNavigation();

  const handleContinuarPress = () => {

    // Lógica para enviar dados 

    navigation.navigate('proximaCadastro');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <Text style={styles.titulo}>Cadastro de Usuário</Text>
      <View
        style={{
          flexDirection: 'column',
          margin: 10,
          alignSelf: 'center',
          width: '90%',
          padding: 10,
          elevation: 8,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}
      >
        <CaixaTexto label={'Nome completo *'} />
        <CaixaTexto label={'CPF'} keyboardType={'numeric'} />
        <CaixaTexto label={'Email *'} />
        <CaixaTexto label={'Data de nascimento'} keyboardType={'numeric'} placeholder={'DD/MM/AAAA'} />
        <CaixaTexto label={'Telefone'} keyboardType={'phone-pad'} placeholder={'(99) 99999-9999'} />
        <CaixaTexto label={'CEP *'} keyboardType={'numeric'} placeholder={'12345-000'} />
        <CaixaTexto label={'Endereço *'} />
        <CaixaTexto label={'Cidade *'} />
        <CaixaTexto label={'Estado *'} />

        <Botao texto={'Continuar'} onPress={handleContinuarPress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginBottom: 10,
  },
});


export const ProximaCadastro = () => {

  const [isChecked, setChecked] = useState(false);

  const handleSwitchChange = () => {
    setChecked(!isChecked);
  };

  const handleAcceptTerms = () => {
    if (isChecked) {
      // Lógica para aceitar os termos
      console.log('Termos aceitos!');
    } else {
      console.log('Você precisa aceitar os termos para continuar.');
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <View
        style={{
          flexDirection: 'column',
          margin: 10,
          alignSelf: 'center',
          width: '90%',
          padding: 10,
          elevation: 8,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <CaixaTexto label={'Empresa'} />
        <CaixaTexto label={'Cargo'} />
        <CaixaTexto label={'Senha *'} secureTextEntry={true} />

        <Text>Por favor, aceite os termos de uso:</Text>
        <View style={styles.switchContainer}>
        <TouchableOpacity onPress={handleAcceptTerms} disabled={!isChecked}>
          <Text style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]}>
            Aceitar Termos
          </Text>
        </TouchableOpacity>
        <Switch
          value={isChecked}
          onValueChange={handleSwitchChange}
        />
        </View>
        <Botao texto={'Cadastre-se'} />
      </View>
    </ScrollView>
  )
}

