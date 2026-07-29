import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {View, Text, Button} from 'react-native';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'ProfileTab'>;

export default function ProfileScreen({route, navigation}: Props){
    const {id, name} = route.params;

    return (
        <View className="flex-1 items-center justify-center">
            <Text>User ID: {id}</Text>
            <Text>User Name: {name}</Text>
            <Button
                title='Logout'
                onPress={() =>{
                    navigation.goBack()
                }}
            />

        </View>
    )
}
