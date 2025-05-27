import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FavoritsScreen = () => (
  <View style={styles.container}>
    <FontAwesome name="heart" size={60} color="#FF3B30" style={{ marginBottom: 24 }} />
    <Text style={styles.title}>Избранные доктора</Text>
    <Text style={styles.text}>Здесь будут отображаться доктора, которых вы добавили в избранное.</Text>
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
  },
});

export default FavoritsScreen;
