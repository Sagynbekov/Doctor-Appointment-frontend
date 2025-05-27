import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyProfileScreen = () => (
  <View style={styles.container}>
    <Image source={require('../assets/icon.png')} style={styles.avatar} />
    <Text style={styles.title}>Мой профиль</Text>
    <Text style={styles.text}>Здесь будет информация о вашем профиле, настройках и выход из аккаунта.</Text>
    <View style={styles.infoBox}>
      <FontAwesome name="user" size={20} color="#3E69FE" />
      <Text style={styles.infoText}>Ваше имя: Имя Фамилия</Text>
    </View>
    <View style={styles.infoBox}>
      <FontAwesome name="phone" size={20} color="#3E69FE" />
      <Text style={styles.infoText}>Телефон: +7 777 777 77 77</Text>
    </View>
    <View style={styles.infoBox}>
      <FontAwesome name="calendar" size={20} color="#3E69FE" />
      <Text style={styles.infoText}>Год рождения: 2000</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  text: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 10,
    width: 260,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },
});

export default MyProfileScreen;
