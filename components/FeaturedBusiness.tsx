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

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const storageBaseURL=`https://ephqkuiishssehevnmnt.supabase.co`
      const imageUrl = `${storageBaseURL}/storage/v1/object/public/account_profile_picture/${path}`
      console.log(path)
      console.log(imageUrl)
      const { data, error } = await supabase.storage.from('account_profile_picture').download(path)
     
      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setImageUrl(imageUrl)

      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }


  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => navigateToBusinessDetails(account_id)}>
      {imageUrl && <Image source={{uri: imageUrl}} />}      
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
  picture: {

  }
});