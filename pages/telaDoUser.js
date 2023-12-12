import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {

    const navigation = useNavigation();
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        photo: null, // Armazenará a imagem do usuário
    });

    const handleInputChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={require('../assets/semFoto.png')} />
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Idade"
                    onChangeText={(text) => handleInputChange('age', text)}
                />
            </View>

            <TouchableOpacity style={styles.Button}>
                <Text style={styles.ButtonText}>Salvar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.ButtonText}>Voltar ao menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('login')}>
                <Text style={styles.ButtonText}>Sair</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    changePhotoText: {
        color: 'blue',
        fontSize: 16,
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    Button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#1d568b', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
    },
    ButtonText: {
        color: '#1d568b',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UserProfileScreen;
