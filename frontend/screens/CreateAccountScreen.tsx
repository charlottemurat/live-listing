import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '@/firebase';
import { CreateAccountScreenProps } from '../App';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

function CreateAccountScreen({ navigation, route }: CreateAccountScreenProps) {
  const userId = route.params.userId;
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const auth = getAuth(app);

  function createAccount() {
    createUserWithEmailAndPassword(auth, email, confirmedPassword)
    .then((userCredential) => {
      console.log(userCredential);
      setLoggedIn(true);
      navigation.setParams({ userId: userCredential.user.uid })
    })
    .catch((err) => console.log(err));
  }

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
        id: '1', 
        label: 'Moving In',
        value: 'mi'
    },
    {
        id: '2',
        label: 'Moving Out',
        value: 'mo'
    }
  ]), []);

  useEffect(() => {
    if (loggedIn) {
      alert('Account Created')
      // navigation.navigate('Tabs', {
      //   userId: userId
      // });
    }
  }, [loggedIn])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Name'}
          placeholderTextColor="#808080" 
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.radioContainer}>
        <RadioGroup 
          radioButtons={radioButtons} 
          layout='row'
          onPress={(text) => {
            setSelectedId(text);
          }}
          selectedId={selectedId}
        /> 
      </View>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={confirmedPassword}
          placeholder={'Confirm Password'}
          placeholderTextColor="#808080" 
          onChangeText={(text) => {
            setConfirmedPassword(text);
            if (password === text) {
              setPassword(text);
              setErrorMessage('')
            }
            else setErrorMessage("Passwords do not match.")
          }}
          secureTextEntry
        />
        {errorMessage ? <Text>{ errorMessage }</Text> : <Text></Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => createAccount()}>
        <View>
          <Text style={styles.buttonText}>Create Account</Text>
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
  radioContainer : {
    marginBottom: 20,
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

export default CreateAccountScreen;