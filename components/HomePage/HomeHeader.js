import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeHeader = ({ username }) => (
  <View style={styles.header}>
    <Image source={require('../../assets/icon.png')} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.hello}>Добро пожаловать, {username}!</Text>
    </View>
    <TouchableOpacity style={styles.iconButton}>
      <Icon name="notifications-none" size={28} color="#1976d2" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  hello: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  iconButton: {
    padding: 6,
  },
});

export default HomeHeader;
