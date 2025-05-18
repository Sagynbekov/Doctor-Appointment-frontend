import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, variant === 'secondary' && styles.buttonTextSecondary]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1976d2',
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  buttonTextSecondary: {
    color: '#1976d2',
  },
});

export default CustomButton;
