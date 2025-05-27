import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://192.168.0.105:8080'; // ИЗМЕНЕН ПОРТ НА 8080

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!fullName || !phone || !birthYear || !username || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          fullName,
          phone,
          birthYear: Number(birthYear),
        }),
      });
      if (response.ok) {
        // Получаем userId и сохраняем в AsyncStorage
        const userRes = await fetch(`${API_URL}/user?username=${username}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          await AsyncStorage.setItem('userId', String(userData.id));
        }
        setSuccess('Регистрация успешна!');
        setTimeout(() => navigation.goBack(), 1500);
      } else if (response.status === 409) {
        setError('Пользователь с таким логином уже существует');
      } else {
        setError('Ошибка регистрации');
      }
    } catch (e) {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <InputField placeholder="ФИО" value={fullName} onChangeText={setFullName} />
      <InputField placeholder="Номер телефона" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField placeholder="Год рождения" value={birthYear} onChangeText={setBirthYear} keyboardType="numeric" />
      <InputField placeholder="Логин" value={username} onChangeText={setUsername} />
      <InputField placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <CustomButton title="Зарегистрироваться" onPress={handleRegister} />
      <CustomButton title="Назад" onPress={() => navigation.goBack()} variant="secondary" />
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

export default RegistrationScreen;
