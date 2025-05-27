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
import AdminScreen from './screens/AdminScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AdminSpecScreen from './screens/AdminSpecScreen';
import AdminLogoutScreen from './screens/AdminLogoutScreen';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AdminTab = createBottomTabNavigator();

function MainTabs({ username, onLogout }) {
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
          return <ProfileScreen username={username} onLogout={onLogout} />;
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AdminTabs({ onLogout }) {
  const handleLogoutPress = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти из админ панели?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: onLogout },
      ]
    );
  };
  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60, paddingBottom: 6 },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'AdminDoctors') {
            return <FontAwesome name="user-md" size={28} color={focused ? '#3E69FE' : '#aaa'} />;
          }
          if (route.name === 'AdminSpecs') {
            return <FontAwesome name="stethoscope" size={28} color={focused ? '#3E69FE' : '#aaa'} />;
          }
          if (route.name === 'AdminLogout') {
            return <FontAwesome name="sign-out" size={28} color={focused ? '#FF3B30' : '#aaa'} />;
          }
        },
      })}
    >
      <AdminTab.Screen name="AdminDoctors" component={AdminScreen} />
      <AdminTab.Screen name="AdminSpecs" component={AdminSpecScreen} />
      <AdminTab.Screen name="AdminLogout" component={AdminLogoutScreen} listeners={{
        tabPress: e => {
          e.preventDefault();
          handleLogoutPress();
        },
      }} />
    </AdminTab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          isAdmin ? (
            <Stack.Screen name="AdminTabs">
              {() => <AdminTabs onLogout={() => {
                setIsLoggedIn(false);
                setUsername('');
                setIsAdmin(false);
              }} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="MainTabs">
              {() => <MainTabs username={username} onLogout={() => {
                setIsLoggedIn(false);
                setUsername('');
                setIsAdmin(false);
              }} />}
            </Stack.Screen>
          )
        ) : (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onLoginSuccess={(user, admin) => {
                    setUsername(user);
                    setIsLoggedIn(true);
                    setIsAdmin(admin);
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

