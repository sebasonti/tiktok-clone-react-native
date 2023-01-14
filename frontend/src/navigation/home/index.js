import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CameraScreen from '../../screens/camera';
import ProfileScreen from '../../screens/profile';
import SearchScreen from '../../screens/search';

const Tab = createMaterialBottomTabNavigator();

function EmptyScreen() {
  return <View />
}

export default function HomeScreen() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: 'black' }}
      initialRouteName='Feed'
      activeColor='white'
    >
      <Tab.Screen
        name='Feed'
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Discover'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='search' size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Add'
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='plus-square' size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Inbox'
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='message-square' size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Me'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='user' size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}