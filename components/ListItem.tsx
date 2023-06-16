import {Image, Pressable, StyleSheet} from "react-native"

const ListItem =({uri}:any) => {
    return (
    <Pressable>
        <Image  source={{uri}} style={styles.image}/>
    </Pressable>  
    ) 
}

export default ListItem

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 300
    }
})