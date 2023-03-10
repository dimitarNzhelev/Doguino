import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const RegisterHandler = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          await setDoc(doc(firestore, "users", email), {
            email: email,
          });
          navigation.replace("Home", { email: user.email });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={RegisterHandler}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#045c62",
  },

  textInput: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 6,
    fontSize: 24,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: "75%",
  },
  header: {
    marginBottom: "10%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    color: "white",
  },
  registerButton: {
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#379799",
    padding: 10,
    width: "25%",
  },
});
