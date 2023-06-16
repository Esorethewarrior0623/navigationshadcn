import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native'
import React from 'react'
import { useSupabase } from "../src/context/useSupabase";
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store"
const RegisterScreen = () => {

const navigation = useNavigation();
const {register, getGoogleOAuthUrl, setOAuthSession} = useSupabase();


    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loading, setLoading] = React.useState(false);

    const handleRegister = async () => {
        try {
          setLoading(true);
          await register(email, password);
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      React.useEffect(() => {
        WebBrowser.warmUpAsync()
        return () => {
            WebBrowser.coolDownAsync();
        }
      },[])

       const onSignInWithGoogle = async () => {
           setLoading(true);
           try {
             const url = await getGoogleOAuthUrl();
             if (!url) return;
         
             const result = await WebBrowser.openAuthSessionAsync(
               url,
               "mysupabaseapp://google-auth?",
               {
                 showInRecents: true,
               }
             );
         
             if (result.type === "success") {
               const data = extractParamsFromUrl(result.url);
        
               if (!data.access_token || !data.refresh_token) return;
        
               setOAuthSession({
                 access_token: data.access_token,
                 refresh_token: data.refresh_token,
               });
        
               // You can optionally store Google's access token if you need it later
               SecureStore.setItemAsync(
                 "google-access-token",
                 JSON.stringify(data.provider_token)
               );
             }
           } catch (error) {
             // Handle error here
             console.log(error);
           } finally {
             setLoading(false);
           }
           
         };
        
         const extractParamsFromUrl = (url: string) => {
           const params = new URLSearchParams(url.split("#")[1]);
           const data = {
             access_token: params.get("access_token"),
             expires_in: parseInt(params.get("expires_in") || "0"),
             refresh_token: params.get("refresh_token"),
             token_type: params.get("token_type"),
             provider_token: params.get("provider_token"),
           };
        
           return data;
         };

  return (
    <SafeAreaView>
      <Text>RegisterScreen</Text>
      <View>
      <TextInput onChangeText={setEmail} style={styles.input} value={email} placeholder="Email" />
      <TextInput secureTextEntry={true} onChangeText={setPassword} style={styles.input} value={password} placeholder="Password" />
      <Button title='register' onPress={handleRegister} />
      <Button title='Register With Google' onPress={onSignInWithGoogle}  />
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})