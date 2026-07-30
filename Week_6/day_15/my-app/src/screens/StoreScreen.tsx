import { useEffect, useState } from 'react';
import {View, Text, Button, Alert, FlatList} from 'react-native';
import { api } from "../../config/api"
import * as SecureStore from "expo-secure-store"

export default function StoreScreen({navigation}: any){
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const fetchProducts = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
               setProducts(response.data.data)
               console.log("Product fetched successfully")
            } catch (error: any) {
                console.log("Fetch Error: ", error)
                Alert.alert("Access Denied", error.response?.data?.message || "Something is Wrong!")
            } finally {
                setIsLoading(false)
            }
        }

        useEffect(() => {
            fetchProducts();
         }, ([]))

         const handleRefresh = async () => {
            setIsRefreshing(true);
            await fetchProducts;
            setIsRefreshing(false);
         }

        return (
            <View className='flex-1 px-4 bg-white pt-12'>
                <Text className='text-3xl font-bold mb-8 text-center text-indigo-600'>
                    Store Products
                </Text>

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}

                    renderItem={({ item }) => (
                        <View className='bg-white rounded-2xl p-4 shadow-sm w-[40%] mb-4 border border-gray-50 flex-1'>
                            <View className='flex-1'>
                                <Text className='text-lg font-bold text-gray-800 mb-1' numberOfLines={1}>
                                    {item.name}
                                </Text>
                            <Text className='mb-1 font-bold text-[#64748b]'>
                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                </Text>
                                <Text className='text-xs text-gray-500' numberOfLines={2}>
                                {item.description}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
}
