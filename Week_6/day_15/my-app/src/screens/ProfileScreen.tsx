import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {View, Text, Button} from 'react-native';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'ProfileTab'>;

export default function ProfileScreen({route, navigation}: Props){
    const {id, name} = route.params;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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