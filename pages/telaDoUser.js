import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        // Substitua 'Home' pelo nome da tela para a qual você deseja navegar após o logout.
        // O segundo parâmetro do reset é o índice da rota para definir como ativa.
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    };

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        // photo: null, // Removido, pois a foto será obtida do backend
    });

    useEffect(() => {
        // Função para carregar os dados do usuário do backend ao carregar o componente
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            // Substitua a URL abaixo com o endpoint correto para obter os dados do usuário
            const response = await fetch('https://seu-backend.com/api/user');
            const user = await response.json();

            setUserData(user);
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            // Substitua a URL abaixo com o endpoint correto para atualizar os dados do usuário
            const response = await fetch('https://seu-backend.com/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Verifique a resposta e lide com o resultado conforme necessário

        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // Substitua a URL abaixo com o endpoint correto para excluir a conta do usuário
            const response = await fetch('https://seu-backend.com/api/user', {
                method: 'DELETE',
            });

            // Verifique a resposta e lide com o resultado conforme necessário

            // Navegue de volta para a tela de login após excluir a conta
            navigation.navigate('login');

        } catch (error) {
            console.error('Erro ao excluir conta do usuário:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                {/* Exiba a foto do usuário aqui */}
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={userData.name}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Idade"
                    value={userData.age}
                    onChangeText={(text) => setUserData({ ...userData, age: text })}
                />
            </View>

            <TouchableOpacity style={styles.Button} onPress={handleUpdateProfile}>
                <Text style={styles.ButtonText}>Salvar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.ButtonText}>Voltar ao menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={handleDeleteAccount}>
                <Text style={styles.ButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={handleLogout}>
                <Text style={styles.ButtonText}>Sair da conta</Text>
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
