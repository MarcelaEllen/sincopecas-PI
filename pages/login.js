import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
      </View>

      <View style={styles.ola}>
        <Text>Olá,</Text>
        <Text>Faça login em sua conta</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="CPF" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
        <Text style={styles.forgotPassword}>
          <Text>
            Esqueceu sua senha?
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('cadastro')}>
      <Text style={styles.signupText}>
        Não tem uma conta? <Text style={styles.signupLink}>CRIE UMA AQUI</Text>
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white',
    },
    logoContainer: {
      marginBottom: 40,
      width: '100%',
    },
    logo: {
      width: '100%', 
      height: '100', 
      padding:42,
    },
    ola: {
      textAlign: 'center',
      marginBottom: 10,
      marginTop:70,
      fontSize:22,
    },
    inputContainer: {
      width: '100%',
      marginBottom: '10%',
    },
    input: {
      width: '100%',
      padding: 10,
      marginTop: 15,
      marginBottom: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: 16,
    },
    forgotPassword: {
      textAlign: 'center',
      color: 'black',
    },
    loginButton: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 50,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    signupText: {
      marginTop: 20,
      color: 'black',
    },
    signupLink: {
      fontWeight: 'bold',
      color: 'green',
    },
  });
  
  export default LoginScreen;