import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { sampleData } from '../data'
import ListItem from '../components/ListItem'
import FeaturedBusiness from '../components/FeaturedBusiness'
import { supabase } from '../src/context/SupabaseProvider'
import { useNavigation } from '@react-navigation/native'

type DataType = Array<{ [key: string]: any }>;

const HomeScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = React.useState<DataType>([]);

  React.useEffect(() => {
    fetchData()

  },[])

 



  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('account').select('account_name, account_id, account_profile_picture', ).limit(5);
      console.log(data)
      if (error) {
        console.error(error);
        return;
      }
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToBusinessDetails = (account_id : string) => {
    navigation.navigate('BusinessDetails', { account_id });
  };
  
  const renderItem = ({ item }: { item: any }) => (
    <FeaturedBusiness
      account_id={item.account_id}
      account_name={item.account_name}
      navigateToBusinessDetails={navigateToBusinessDetails}
      url={item.account_profile_picture}
    />
  );
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen!</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        keyExtractor={(item) => item.account_id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})



