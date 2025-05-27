import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://192.168.0.105:8080';
const DEFAULT_AVATAR = require('../assets/icon.png');

const FavoritsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // TODO: заменить userId на реальный id авторизованного пользователя
  const userId = 1;

  useEffect(() => {
    const fetchFavorits = async () => {
      try {
        const response = await fetch(`${API_URL}/api/favorits?userId=${userId}`);
        const data = await response.json();
        setDoctors(data.map(doc => ({
          ...doc,
          avatar: doc.photoUrl ? { uri: doc.photoUrl } : DEFAULT_AVATAR,
        })));
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorits();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorService}>{item.service}</Text>
        <Text style={styles.doctorService}>{item.specialization}</Text>
        <Text style={styles.doctorPrice}>{item.price}</Text>
      </View>
      <FontAwesome name="heart" size={28} color="#FF3B30" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FontAwesome name="heart" size={60} color="#FF3B30" style={{ marginBottom: 24 }} />
      <Text style={styles.title}>Избранные доктора</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF3B30" style={{ marginTop: 40 }} />
      ) : doctors.length === 0 ? (
        <Text style={styles.text}>Здесь будут отображаться доктора, которых вы добавили в избранное.</Text>
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: 320,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  doctorService: {
    color: '#3E69FE',
    fontSize: 14,
    marginTop: 2,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  doctorPrice: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
});

export default FavoritsScreen;
