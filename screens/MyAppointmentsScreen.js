import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewsModal from '../components/MyAppointmentsPage/ReviewsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const DEFAULT_AVATAR = require('../assets/icon.png');
const API_URL = 'http://192.168.0.105:8080'; // используем тот же адрес, что и на других страницах

const MyAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchAppointments = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userId');
          if (!storedUserId) {
            if (isActive) {
              setAppointments([]);
              setLoading(false);
            }
            return;
          }
          const userId = Number(storedUserId);
          const response = await fetch(`${API_URL}/api/books/appointments?userId=${userId}`);
          const data = await response.json();
          const formatted = data.map(item => ({
            id: String(item.id),
            doctor: item.doctorName,
            service: item.service,
            date: item.date,
            time: item.time,
            avatar: item.photoUrl ? { uri: item.photoUrl } : DEFAULT_AVATAR,
            doctorId: item.doctorId,
          }));
          if (isActive) setAppointments(formatted);
        } catch (e) {
          if (isActive) setAppointments([]);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      setLoading(true);
      fetchAppointments();
      return () => { isActive = false; };
    }, [])
  );

  const handleOpenReview = (appointment) => {
    setSelectedDoctor(appointment.doctor);
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleCloseReview = () => {
    setModalVisible(false);
    setSelectedDoctor(null);
    setSelectedAppointment(null);
  };

  const handleSubmitReview = async (reviewData) => {
    if (!selectedAppointment) return;
    try {
      // Получаем userId из AsyncStorage
      const storedUserId = await AsyncStorage.getItem('userId');
      if (!storedUserId) {
        alert('Ошибка: пользователь не найден');
        return;
      }
      const userId = Number(storedUserId);
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedAppointment.doctorId, // теперь всегда корректный doctorId
          userId: userId,
          text: reviewData.review,
          stars: reviewData.rating,
        }),
      });
      if (!response.ok) {
        alert('Ошибка при отправке отзыва');
      }
    } catch (e) {
      alert('Ошибка соединения с сервером');
    }
    handleCloseReview();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctor}>{item.doctor}</Text>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.dateTime}>{item.date} в {item.time}</Text>
      </View>
      <FontAwesome
        name="calendar-check-o"
        size={28}
        color="#4F6CFF"
        style={{ marginLeft: 10 }}
        onPress={() => handleOpenReview(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои записи</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4F6CFF" style={{ marginTop: 40 }} />
      ) : appointments.length === 0 ? (
        <Text style={styles.empty}>У вас пока нет записей</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
      <ReviewsModal
        visible={modalVisible}
        onClose={handleCloseReview}
        onSubmit={handleSubmitReview}
        doctorName={selectedDoctor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 24,
    alignSelf: 'center',
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
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  doctor: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  service: {
    color: '#3E69FE',
    fontSize: 14,
    marginTop: 2,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  empty: {
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default MyAppointmentsScreen;
