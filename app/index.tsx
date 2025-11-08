import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginForm from './login_form';

export default function LoginScreen() {
    const router = useRouter();
    const { width } = Dimensions.get('window');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const myapiUrl = '';

    const handleLogin = async () => {
            if (username.length < 3) {
                setErrorMessage("Le nom d'utilisateur doit contenir au moins 3 caractères.");
                return false;
            }
            if (password.length < 8) {
                setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
                return false;
            }
            setErrorMessage('');
            setLoading(true);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Login successful');
                    setLoading(false);
                    resolve(true);
                }, 1500);
            });

            /*try {
                const reponse = await fetch(`${myapiUrl}/login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ username, password }),
                });
                if (!reponse.ok) {
                    setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
                    setLoading(false);
                    return false;
                }
                const data = await reponse.json();
                const token = data.token;
                setLoading(false);
                return true;
            } catch (error) {
                setErrorMessage("Probleme de serveur. Veuillez reessayer plus tard.");
                setLoading(false);
                return false;
            }*/
        };
        const onPressVoirPokemon = async () => {
            const loginSuccess = await handleLogin();
            if (loginSuccess) {
                router.push('/pokemon');
            }
        };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f6f8fc' }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.innerContainer}>
                <Image
                    source={{ uri: 'https://user-images.githubusercontent.com/9741252/81717987-83b84000-947b-11ea-9ac9-5ad1d59adf7a.png' }}
                    style={{ width: width * 0.32, height: width * 0.32, marginBottom: 16, alignItems: 'center', }}
                />
                <Text style={styles.title}>Bienvenue sur MyPokedex</Text>
                <Text style={styles.subtitle}>Connecte-toi pour explorer et compléter ton Pokédex !</Text>
            </View>

            <View style={styles.innerContainer_two}>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    errorMessage={errorMessage}
                />
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={onPressVoirPokemon}
                >
                    <Text style={styles.primaryButtonText}>Voir les Pokémon</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
    },
    innerContainer_two: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2b2d42',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#5c5e66',
        marginBottom: 22,
        textAlign: 'center',
    },
    primaryButton: {
        marginTop: 28,
        backgroundColor: '#368ad6',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 34,
        alignSelf: 'stretch',
        alignItems: 'center',
        elevation: 2, // Android shadow
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 3,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

