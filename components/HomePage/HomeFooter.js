import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Footer = () => (
  <View style={styles.footer}>
    <Icon name="home" size={28} color="#6474b6" />
    <Icon name="calendar-today" size={28} color="#aaa" />
    <Icon name="favorite-border" size={28} color="#aaa" />
    <Icon name="person-outline" size={28} color="#aaa" />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    marginBottom: 24,
  },
});

export default Footer;
