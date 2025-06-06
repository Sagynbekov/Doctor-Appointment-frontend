import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLoginSuccess, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'http://192.168.0.105:8080'; // IP вашего ПК в локальной сети, ИЗМЕНЕН ПОРТ НА 8080

  const handleLogin = async () => {
    setError('');
    // Хардкод для админа
    if (username === 'Admin' && password === '123') {
      onLoginSuccess('Admin', true);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Получаем userId и сохраняем в AsyncStorage
        const userRes = await fetch(`${API_URL}/user?username=${username}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          await AsyncStorage.setItem('userId', String(userData.id));
        }
        onLoginSuccess(username, false);
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (e) {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход в систему</Text>
      <InputField
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomButton title="Войти" onPress={handleLogin} />
      <CustomButton
        title="Зарегистрироваться"
        onPress={() => navigation.navigate('Registration')}
        variant="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1976d2',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 16,
  },
  success: {
    color: 'green',
    marginBottom: 8,
    fontSize: 16,
  },
});

export default LoginScreen;
