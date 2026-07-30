import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

import { api } from "../../config/api"
import * as SecureStore from "expo-secure-store"
import { AuthContext } from '../../App';

export default function LoginScreen({ navigation }: any){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signIn} = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email & password');
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password,
            });

           signIn(response.data.token)
        } catch (error: any) {
            const ErrorMsg = error.response?.data?.message || "Something is Wrong!"
            Alert.alert("Login Failed", ErrorMsg)
        }
    }

    return (
        <View className='flex-1 justify-center bg-white px-4'>
            <Text className='text-3xl font-bold mb-8 text-center text-indigo-600'>
                Login
            </Text>

            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                className='border-gray-300 rounded-xl p-4 mb-4'
                autoCapitalize='none'
            />

            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                className='border-gray-300 rounded-xl p-4 mb-4'
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={handleLogin}
                className='bg-indigo-600 p-4 rounded-xl items-center'
            >
                <Text className='text-white font-bold text-lg'>Masuk</Text>
            </TouchableOpacity>
        </View>
    )
}