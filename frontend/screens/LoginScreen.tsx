import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
import { LoginScreenProps } from "../App";

function LoginScreen({ navigation, route }: LoginScreenProps) {
  const userId = route.params.userId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // const navigation = useNavigation();

  function signIn() {
    const auth = getAuth(app);
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setLoggedIn(true);
        navigation.setParams({ userId: userCredential.user.uid })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Could Not Login')
      });
  }

  useEffect(() => {
    if (loggedIn) {
      alert('Logged In Successfully')
      // navigation.navigate('Tabs', {
      //   userId: userId
      // });
    }
  }, [loggedIn])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder={'Email'}
          placeholderTextColor="#808080" 
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={'Password'}
          placeholderTextColor="#808080" 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <View>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('CreateAccount', {
          userId: userId, 
        });
      }}>
        <View>
          <Text style={styles.signUpLink}>Create New Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    marginBottom: 40,
    fontFamily: 'Jersey25-Regular',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2337C6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#2337C6',
  },
});

export default LoginScreen;