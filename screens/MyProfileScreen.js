import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';

const API_URL = 'http://192.168.0.115:8080'; // поменяйте на ваш актуальный IP

const MyProfileScreen = ({ username, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`${API_URL}/user?username=${username}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки профиля');
        setLoading(false);
      });
  }, [username]);

  const handleLogout = () => {
    Alert.alert('Выход', 'Вы уверены, что хотите выйти?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Выйти', style: 'destructive', onPress: () => {
        if (onLogout) onLogout();
      } },
    ]);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#3E69FE" /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text style={{ color: 'red' }}>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/icon.png')} style={styles.avatar} />
        <Text style={styles.name}>{user?.fullName || '—'}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <View style={styles.infoRow}>
          <FontAwesome name="phone" size={20} color="#3E69FE" />
          <Text style={styles.infoText}>{user?.phone || '—'}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="calendar" size={20} color="#3E69FE" />
          <Text style={styles.infoText}>{user?.birthYear || '—'}</Text>
        </View>
      </View>
      <CustomButton title="Выйти из аккаунта" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    padding: 28,
    marginBottom: 32,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  username: {
    color: '#888',
    fontSize: 15,
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 10,
    width: 220,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default MyProfileScreen;
