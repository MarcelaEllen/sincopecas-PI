import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Botao = ({ onPress, texto }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    botao: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#28a745', // Cor verde do Bootstrap
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width:'80%',
        alignSelf:'center',
      },
      textoBotao: {
        color: '#28a745', // Cor verde do Bootstrap
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Botao;
