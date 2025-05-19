import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const API_URL = 'http://192.168.0.105:8080'; // IP вашего ПК в локальной сети

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        onLoginSuccess(username);
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (e) {
      setError('Ошибка соединения с сервером');
    }
  };

  const handleRegister = async () => {
    setRegError('');
    setRegSuccess('');
    if (!username || !password) {
      setRegError('Введите логин и пароль');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setRegSuccess('Регистрация успешна! Теперь войдите.');
      } else if (response.status === 409) {
        setRegError('Пользователь с таким логином уже существует');
      } else {
        setRegError('Ошибка регистрации');
      }
    } catch (e) {
      setRegError('Ошибка соединения с сервером');
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
      {regError ? <Text style={styles.error}>{regError}</Text> : null}
      {regSuccess ? <Text style={styles.success}>{regSuccess}</Text> : null}
      <CustomButton title="Войти" onPress={handleLogin} />
      <CustomButton
        title="Зарегистрироваться"
        onPress={handleRegister}
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
