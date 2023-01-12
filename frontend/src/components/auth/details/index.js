import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, register } from '../../../redux/actions/auth'

export default function AuthDetails(props) {
  const {
    authPage,
    setDetailsPage
  } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  function handleLogin() {
    dispatch(login(email, password))
      .then(() => console.log("Login successful"))
      .catch((e) => console.log("Login failed: " + e))
  }

  function handleRegister() {
    dispatch(register(email, password))
      .then(() => console.log("Register successful"))
      .catch((e) => console.log("Register failed: " + e))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Feather name='arrow-left' size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        placeholder='Email'
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder='Password'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => authPage ? handleLogin() : handleRegister()}
      >
        <Text style={styles.buttonText}>{authPage ? 'Log in' : 'Sign up'}</Text>
      </TouchableOpacity>
    </View>
  )
}