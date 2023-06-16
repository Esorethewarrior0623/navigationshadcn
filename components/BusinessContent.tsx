import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useSupabase } from '../src/context/useSupabase'


const BusinessContext = ({account}:any) => {
    const supabase = useSupabase()

    
  return (
    <SafeAreaView>
      <Text>{account.account_name}</Text>
    </SafeAreaView>
  )
}

export default BusinessContext

const styles = StyleSheet.create({})