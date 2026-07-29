import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({route, navigation}: Props){
    const {id, name} = route.params;

    return (
        <View className="flex-1 items-center justify-center">
            <Text>Product ID: {id}</Text>
            <Text>Product Name: {name}</Text>
            <Button
                title='Go back to Home'
                onPress={() =>{
                    navigation.goBack()
                }}
            />
        </View>
    )
}
