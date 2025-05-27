import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DoctorProfile from './screens/DoctorProfile';
import BookingScreen from './screens/BookingScreen';
import MyAppointmentsScreen from './screens/MyAppointmentsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ username }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60, paddingBottom: 6 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home';
          if (route.name === 'AppointmentsTab') iconName = 'calendar-today';
          if (route.name === 'FavoritesTab') iconName = 'favorite-border';
          if (route.name === 'ProfileTab') iconName = 'person-outline';
          return <Icon name={iconName} size={28} color={focused ? '#3E69FE' : '#aaa'} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab">
        {() => <HomeScreen username={username} />}
      </Tab.Screen>
      <Tab.Screen name="AppointmentsTab" component={MyAppointmentsScreen} />
      <Tab.Screen name="FavoritesTab" component={require('./screens/FavoritsScreen').default} />
      <Tab.Screen name="ProfileTab">
        {() => {
          const ProfileScreen = require('./screens/MyProfileScreen').default;
          return <ProfileScreen username={username} />;
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs">
            {() => <MainTabs username={username} />}
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
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

