import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import { AuthContext, RootTabParamList } from '../../App';
import { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = BottomTabScreenProps<RootTabParamList, 'ProfileTab'>;

export default function ProfileScreen({route, navigation}: Props){
    const {id, name} = route.params;
    const {signOut} = useContext(AuthContext);

    return (
        <View className="flex-1 items-center justify-center">
            <Text>User ID: {id}</Text>
            <Text>User Name: {name}</Text>
            <TouchableOpacity onPress={signOut}>
                <MaterialIcons name='logout' size={20} color={'red'}/>
            </TouchableOpacity>

        </View>
    )
}
