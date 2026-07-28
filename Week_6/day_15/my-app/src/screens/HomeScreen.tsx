import {View, Text, Button} from 'react-native';

export default function HomeScreen({navigation}: any){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is Home </Text>
            <Button
                title='Go back to Detail'
                onPress={() =>{
                    navigation.navigate('Detail', {id: 1, name: 'Lemari'})
                }}
            />
        </View>
    )
}