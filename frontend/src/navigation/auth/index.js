import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/auth';
import AuthScreen from '../../screens/auth';
import SavePostScreen from '../../screens/savePost';
import HomeScreen from '../home';

const Stack = createNativeStackNavigator();

export default function Route() {
  const authState = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  if (!authState.loaded) {
    return <View></View>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authState.currentUser && <Stack.Screen name='auth' component={AuthScreen} options={{ headerShown: false }} />}
        {authState.currentUser &&
          <>
            <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='savePost' component={SavePostScreen} options={{ headerShown: false }} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}