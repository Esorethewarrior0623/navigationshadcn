import { FlatList, StyleSheet, Text, View, SafeAreaView, Dimensions, Image  } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { supabase } from '../src/context/SupabaseProvider'
import { useState, useEffect, useLayoutEffect  } from 'react';



export default function BusinessDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { account_id } = route.params as { account_id: string };

    const [account_name, setAccount_name] = useState('')
    const [product_name, setProduct_name] = useState([]) as any
    const [product_id, setProduct_id] = useState('')
    const [imageUrl, setImage_url] = useState('')
    useEffect(()=> {
        fetchData()
        
    },[])

    const fetchData = async () => {
        try {
        const {data:accountData, error} = await supabase
        .from('account').select('account_name, image_url')
        .eq('account_id', account_id)
        .single()
        console.log(accountData?.image_url)
        if(error) {
            console.log(error)
            return
        }
        const { data: productData, error: productError } = await supabase
        .from('product')
        .select('name, product_id')
        .eq('account_id', account_id)
        console.log(productData)
  
      if (productError) {
        console.log(productError);
        return;
      }        
      setProduct_name(productData ? productData.map((product: any) => product.name) : []);
      setAccount_name(accountData.account_name);
      setImage_url(accountData.image_url);
      
    } catch(error) {
        console.error(error)
    }
    }

    const renderItem =({item} : {item: any}) =>(
      <Text>{item}</Text>
    )

    useLayoutEffect(() => {
      navigation.setOptions({
        title: account_name
      })
    })


    return (
        <SafeAreaView style={styles.container}>
          {/* <Text>Business Details</Text>
          <Text>Account ID: {account_id}</Text> */}
          <Rectangle accountName={account_name} />
          <Image style={{width: '100%', height:250, flex: 1}} source={{uri: imageUrl!}} />
          <FlatList showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          data={product_name}
          keyExtractor={(item) => item.product_id}
          />
        </SafeAreaView>
      );
      
      
}

type RectangleProps = {
  accountName: string
}

const Rectangle = ({accountName} : RectangleProps) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.containerTriangle}>
      <View style={[styles.triangle, {borderRightWidth: screenWidth}]}>
      <Text style={styles.text}>{accountName}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  containerTriangle: {
    position: 'absolute',
    top: 102,
    left: 0,
    bottom: 0,
    right: 0,
    marginTop: 10,
    overflow: 'hidden',
    zIndex: 2,
    height: 200
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 200,
    borderRightColor: 'transparent',
    borderBottomColor: 'white', // Change the color as needed
  }, 
  text: {
    position: 'absolute',
    top: 80,
    left: 20,
    color: 'black', // Change the color as needed
    
  }
})



//map the Text Pressable so that I can console.log the id
