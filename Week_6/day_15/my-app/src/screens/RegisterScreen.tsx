import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

import { api } from "../../config/api"
import { AuthContext } from '../../App';

export default function RegisterScreen({ navigation }: any){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signIn} = useContext(AuthContext);

    const handleRegister = async () => {
        if (!email || !password || !name) {
            Alert.alert('Error', 'Please enter name, email & password');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);

            const response = await api.post('/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
           Alert.alert('Success', 'Registration successful! Please login.')
            navigation.navigate('Login')
           console.log("Register success")
        } catch (error: any) {
            const ErrorMsg = error.response?.data?.message || "Something is Wrong!"
            Alert.alert("Register Failed", ErrorMsg)
            console.log("Register failed", error)
        }
    }

    return (
        <View className='flex-1 justify-center bg-white px-4'>
            <Text className='text-3xl font-bold mb-8 text-center text-indigo-600'>
                Register
            </Text>

            <TextInput
                placeholder='Name'
                value={name}
                onChangeText={setName}
                className='border-gray-300 rounded-xl p-4 mb-4'
                autoCapitalize='words'
            />

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
                onPress={handleRegister}
                className='bg-indigo-600 p-4 rounded-xl items-center mb-4'
            >
                <Text className='text-white font-bold text-lg'>Daftar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className='items-center'
            >
                <Text className='text-indigo-600'>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}
