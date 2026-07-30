import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from  '@react-navigation/native-stack'
import './global.css'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen';
import StoreScreen from './src/screens/StoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {View, Text} from 'react-native'
import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useMemo, useState } from 'react';


export type RootStackParamList = {
  Login: undefined,
  MainApp: undefined,
  Detail: {id: number, name: string},
}

export type RootTabParamList = {
  HomeTab: undefined,
  Analytics: undefined,
  Activity: undefined,
  StoreTab: undefined,
  ProfileTab: {id: number, name: string},
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabs() {
  return(
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if(route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'notifications-sharp' : 'notifications-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }


          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: 'white'}
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{title: 'Home'}}/>
      <Tab.Screen name="Analytics" component={StoreScreen} options={{title: 'Store'}}/>
      <Tab.Screen name="Activity" component={StoreScreen} options={{title: 'Store'}}/>
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{title: 'Profile'}} initialParams={{id: 1, name: 'User'}}/>
    </Tab.Navigator>
  )
}

export const AuthContext = createContext<any>(null);

export default function App(){
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checktoken = async () => {
      try{
        const token = await SecureStore.getItemAsync('userToken');
        setUserToken(token)
      } catch (error) {
        console.error("Failed to fetch token:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checktoken()
  }, [])

  const signIn = async(token: string) => {
    await SecureStore.setItemAsync('userToken', token);
    setUserToken(token);
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  }

  const authContext = useMemo(() => ({
    signIn,
    signOut
  }), [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Text>Loading...</Text>
          </View>
        ) : (
          <Stack.Navigator>
              {userToken == null ? (
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
              ): (
              <>
                <Stack.Screen name="MainApp" component={BottomTabs} options={{headerShown: false}}/>
                 <Stack.Screen 
                  name="Detail"
                  component={DetailScreen}
                  options={{
                    title: 'Product Information',
                    headerStyle: {
                      backgroundColor: '#232F34'
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                      fontWeight: 'bold'
                    }
                  }}
                  />
              </>
              )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
