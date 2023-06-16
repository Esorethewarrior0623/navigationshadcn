import { StyleSheet, Text, View, SafeAreaView,Pressable, TextInput } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}:any) => {
  return (
    <SafeAreaView>
      <Text>LoginScreen!!!!</Text>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text>Register an Account</Text>
    </Pressable>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    
})