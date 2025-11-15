import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@/context/userContext";

const Login = () => {
  const { login,userData } = useUser();
  console.log(userData)
  const navigation = useNavigation();
  const [ci, setCi] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/mobile-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ci, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.mensaje || "Error al iniciar sesión");
        return;
      }

      login(data.data, data.token);
      alert("Incio de sesion exitosa");
      navigation.navigate("(tabs)"); // Cambia al nombre de tu pantalla principal
    } catch (error) {
      alert("Hubo un problema al iniciar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar <Text style={styles.accent}>Sesión</Text></Text>
      <Text style={styles.subtitle}>Event Manager</Text>

      <Text style={styles.label}>Ci</Text>
      <TextInput
        style={styles.input}
        placeholder="8.....0"
        keyboardType="numeric"
        autoCapitalize="none"
        value={ci}
        onChangeText={setCi}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => { }}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  accent: {
    color: "#FF6347",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  forgotPassword: {
    color: "#FF6347",
    textAlign: "right",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  signupSection: {
    marginTop: 24,
    alignItems: "center",
  },
  signupText: {
    color: "#666",
  },
  signupLink: {
    color: "#FF6347",
    fontWeight: "500",
    marginTop: 4,
  },
});
