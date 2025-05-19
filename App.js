import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return isLoggedIn ? (
    <HomeScreen username={username} />
  ) : (
    <LoginScreen onLoginSuccess={(user) => {
      setUsername(user);
      setIsLoggedIn(true);
    }} />
  );
}

