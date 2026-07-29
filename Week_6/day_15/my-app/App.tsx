import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from  '@react-navigation/native-stack'
import './global.css'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen';
import StoreScreen from './src/screens/StoreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './src/screens/ProfileScreen';

export type RootStackParamList = {
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

export default function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainApp">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
