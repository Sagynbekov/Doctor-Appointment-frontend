import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DoctorCard from '../components/HomePage/HomeDoctorCards';

const API_URL = 'http://192.168.0.105:8080';
const DEFAULT_AVATAR = require('../assets/icon.png');

const FavoritsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchFavorits = async () => {
        try {
          const uid = await AsyncStorage.getItem('userId');
          if (!uid) {
            if (isActive) {
              setDoctors([]);
              setLoading(false);
            }
            return;
          }
          const response = await fetch(`${API_URL}/api/favorits?userId=${uid}`);
          const data = await response.json();
          // Получаем рейтинги для всех докторов
          const doctorsWithAvatar = data.map(doc => ({
            ...doc,
            avatar: doc.photoUrl ? { uri: doc.photoUrl } : DEFAULT_AVATAR,
          }));
          // Получаем рейтинги
          const ratingsObj = {};
          await Promise.all(
            doctorsWithAvatar.map(async (doc) => {
              try {
                const res = await fetch(`${API_URL}/api/reviews?doctorId=${doc.id}`);
                const reviews = await res.json();
                if (Array.isArray(reviews) && reviews.length > 0) {
                  const avg = reviews.reduce((acc, r) => acc + (r.stars || 0), 0) / reviews.length;
                  ratingsObj[doc.id] = avg;
                } else {
                  ratingsObj[doc.id] = null;
                }
              } catch {
                ratingsObj[doc.id] = null;
              }
            })
          );
          if (isActive) setDoctors(doctorsWithAvatar.map(doc => ({ ...doc, rating: ratingsObj[doc.id] })));
        } catch {
          if (isActive) setDoctors([]);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      setLoading(true);
      fetchFavorits();
      return () => { isActive = false; };
    }, [])
  );

  const renderItem = ({ item }) => (
    <DoctorCard
      doctor={item}
      rating={item.rating}
      onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
      style={{ marginBottom: 14, width: 320 }}
    />
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
});

export default FavoritsScreen;
