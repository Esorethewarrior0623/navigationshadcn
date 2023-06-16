import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useSupabase } from '../src/context/useSupabase'

const SettingsScreen = () => {
  const {logout} = useSupabase()

  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button title='Sign Out' onPress={logout}/>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})