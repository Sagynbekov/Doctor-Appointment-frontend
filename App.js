import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DoctorProfile from './screens/DoctorProfile';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home">
            {() => <HomeScreen username={username} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onLoginSuccess={(user) => {
                    setUsername(user);
                    setIsLoggedIn(true);
                  }}
                  navigation={navigation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
        <Stack.Screen
          name="DoctorProfile"
          component={DoctorProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

