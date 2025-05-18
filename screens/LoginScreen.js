import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь будет логика авторизации
    alert(`Логин: ${username}\nПароль: ${password}`);
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
      <CustomButton title="Войти" onPress={handleLogin} />
      <CustomButton
        title="Зарегистрироваться"
        onPress={() => alert('Переход к регистрации')}
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
});

export default LoginScreen;
