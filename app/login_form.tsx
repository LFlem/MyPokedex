import { Text, TextInput, View } from "react-native";

const LoginForm = ({ username , setUsername, password, setPassword, errorMessage } :
    { username: string;
      setUsername: (username: string) => void;
      password: string;
      setPassword: (password: string) => void;
      errorMessage: string;
    }
) => {

    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <TextInput
                placeholder="3 caractères min"
                onChangeText={setUsername}
                value={username}
                style={styles.input}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                placeholder="8 caractères min"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                secureTextEntry
            />
            {errorMessage.length > 0 && (
                <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text>
            )}

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