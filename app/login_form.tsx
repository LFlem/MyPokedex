import { useState } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { width } = Dimensions.get('window');

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    };
    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="Email"
                onChangeText={handleEmailChange}
                value={email}
                style={styles.input}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                placeholder="Mot de passe"
                onChangeText={handlePasswordChange}
                value={password}
                style={styles.input}
                secureTextEntry
            />

        </View>
    );
};

const styles = {
    formGroup: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        height: 44,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fafafa",
        marginBottom: 20,
    },
};

export default LoginForm;