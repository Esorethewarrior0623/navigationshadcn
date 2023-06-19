import { StyleSheet, Text, View,Pressable, Image, ImageSourcePropType, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import { supabase } from '../src/context/SupabaseProvider'
import DocumentPicker, { isCancel, isInProgress, types } from 'react-native-document-picker'

type FeaturedBusinessProps = {
  account_id: string,
  account_name: string,
  url?: string | null,
  navigateToBusinessDetails: (id: string) => void
}

const FeaturedBusiness: React.FC<FeaturedBusinessProps> = ({url, account_id, account_name, navigateToBusinessDetails }) => {





  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => navigateToBusinessDetails(account_id)}>
      <Image style={styles.image}
      source={{uri:url!}} />      
      <Text>{account_name}</Text>
      </Pressable>
    </View>
  );
};


export default FeaturedBusiness;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    width: 200, // Adjust the width and height as per your requirement
    height: 200,
    borderRadius: 10, // Adjust the borderRadius as per your requirement to get the desired roundness
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    
  }
});