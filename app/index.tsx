import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginForm from './login_form';

export default function LoginScreen() {
    const router = useRouter();
    const { width } = Dimensions.get('window');
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
                <LoginForm />
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/pokemon')}
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
        justifyContent: 'center',
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

