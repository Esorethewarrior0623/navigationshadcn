import { FlatList, StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { supabase } from '../src/context/SupabaseProvider'
import { useState, useEffect } from 'react';



export default function BusinessDetailsScreen() {
    const route = useRoute();
    const { account_id } = route.params as { account_id: string };

    const [account_name, setAccount_name] = useState('')
    const [product_name, setProduct_name] = useState([]) as any
    const [product_id, setProduct_id] = useState('')
    useEffect(()=> {
        fetchData()
    },[])

    const fetchData = async () => {
        try {
        const {data:accoundData, error} = await supabase
        .from('account').select('account_name')
        .eq('account_id', account_id)
        .single()
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
      setAccount_name(accoundData.account_name);
      
    } catch(error) {
        console.error(error)
    }
    }

    const renderItem =({item} : {item: any}) =>(
      <Text>{item}</Text>
    )


    return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text>Business Details</Text>
          <Text>Account ID: {account_id}</Text>
          <Text>{account_name}</Text>
          <FlatList showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          data={product_name}
          keyExtractor={(item) => item.product_id}
          />
        </SafeAreaView>
      );
      
      
}

//map the Text Pressable so that I can console.log the id
