import { MaterialIcons } from '@expo/vector-icons';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({navigation}: any){
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-row justify-between items-center px-4 pb-8'>
                <View>
                    <Text className="text-[24px] font-bold text-black/50 tracking-light">Hello, John Doe</Text>
                    <Text className='text-[14px] text-gray-400 mt-1'>Here is your performance overview.</Text>
                </View>

                <View className='w-11 h-11 rounded-full shadow-sm overflow-hidden'>
                    <Image
                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwRHgONzy5Kh1V3_3wUTn9dPqNww-egjEpuauzyjm2b5mXuDDaQNh8dYK&s=10'}}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View className='flex-row flex-wrap justify-between px-4'>
                <View className='bg-white rounded-2xl p-4 shadow-sm w-[40%] mb-4 border border-gray-50'>
                    <View className='flex-row justify-between items-start mb-4'>
                        <MaterialIcons name='people-outline' size={24} color={'#575e72'} />
                        <View className='flex-row items-center bg-green-500/10 px-2 py-1 rounded-full'>
                            <MaterialIcons name='arrow-upward' size={12} color="cyan"/>
                            <Text className='text-[11px] font-bold text-[#10b981] ml-1'>2.4%</Text>
                        </View>
                    </View>
                    <Text className='text-[28px] font-bold text-[#64748b]'>1,204</Text>
                    <Text className='text-[12px] font-bold text-[#575e72] uppercase tracking-wider mb-3'>Followers</Text>
                    <TouchableOpacity className='bg-gray-900 rounded-lg py-2 items-center'>
                        <Text className='text-white text-[12px] font-semibold'>View Detail</Text>
                    </TouchableOpacity>
                </View>

                <View className='bg-white rounded-2xl p-4 shadow-sm w-[40%] mb-4 border border-gray-50'>
                    <View className='flex-row justify-between items-start mb-4'>
                        <MaterialIcons name='chat-bubble-outline' size={24} color={'#575e72'} />
                        <View className='flex-row items-center bg-green-500/10 px-2 py-1 rounded-full'>
                            <MaterialIcons name='arrow-upward' size={12} color={'#c2bdbdfd'}/>
                            <Text className='text-[11px] font-bold text-[#c2bdbdfd] ml-1'>0.0%</Text>
                        </View>
                    </View>
                    <Text className='text-[28px] font-bold text-[#64748b]'>45</Text>
                    <Text className='text-[12px] font-bold text-[#575e72] uppercase tracking-wider mb-3'>Threads</Text>
                    <TouchableOpacity className='bg-gray-900 rounded-lg py-2 items-center'>
                        <Text className='text-white text-[12px] font-semibold'>View Detail</Text>
                    </TouchableOpacity>
                </View>

                <View className='bg-white rounded-2xl p-4 shadow-sm w-[40%] mb-4 border border-gray-50'>
                    <View className='flex-row justify-between items-start mb-4'>
                        <MaterialIcons name='favorite-outline' size={24} color={'#575e72'} />
                        <View className='flex-row items-center bg-green-500/10 px-2 py-1 rounded-full'>
                            <MaterialIcons name='arrow-upward' size={12} color="cyan"/>
                            <Text className='text-[11px] font-bold text-[#10b981] ml-1'>8.1%</Text>
                        </View>
                    </View>
                    <Text className='text-[28px] font-bold text-[#64748b]'>8,430</Text>
                    <Text className='text-[12px] font-bold text-[#575e72] uppercase tracking-wider mb-3'>Total Likes</Text>
                    <TouchableOpacity className='bg-gray-900 rounded-lg py-2 items-center'>
                        <Text className='text-white text-[12px] font-semibold'>View Detail</Text>
                    </TouchableOpacity>
                </View>

                <View className='bg-white rounded-2xl p-4 shadow-sm w-[40%] mb-4 border border-gray-50'>
                    <View className='flex-row justify-between items-start mb-4'>
                        <MaterialIcons name='reply' size={24} color={'#575e72'} />
                        <View className='flex-row items-center bg-green-500/10 px-2 py-1 rounded-full'>
                            <MaterialIcons name='arrow-upward' size={12} color="cyan"/>
                            <Text className='text-[11px] font-bold text-[#10b981] ml-1'>4.2%</Text>
                        </View>
                    </View>
                    <Text className='text-[28px] font-bold text-[#64748b]'>1,120</Text>
                    <Text className='text-[12px] font-bold text-[#575e72] uppercase tracking-wider mb-3'>Replies</Text>
                    <TouchableOpacity className='bg-gray-900 rounded-lg py-2 items-center'>
                        <Text className='text-white text-[12px] font-semibold'>View Detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
