import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import DoctorAvailableDate from '../components/BookingPage/doctorAvailableDate';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Список всех возможных времен (09:00 - 15:00)
const allTimes = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
];

const getNext6Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      label: date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
      value: date.toISOString().split('T')[0],
    });
  }
  return days;
};

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = route.params?.doctor;
  const screenWidth = Dimensions.get('window').width;
  const [selectedDate, setSelectedDate] = useState(getNext6Days()[0].value);
  const [selectedTime, setSelectedTime] = useState(null);
  const [busyTimes, setBusyTimes] = useState([]);
  const [allBusyTimes, setAllBusyTimes] = useState({}); // { '2025-05-28': ['09:00', ...], ... }
  const days = getNext6Days();

  useEffect(() => {
    if (!doctor?.id || !selectedDate) return;
    fetch(`http://192.168.0.105:8080/api/books/busy-times?doctorId=${doctor.id}&date=${selectedDate}`)
      .then(res => res.json())
      .then(data => setBusyTimes(data))
      .catch(() => setBusyTimes([]));
  }, [doctor?.id, selectedDate]);

  useEffect(() => {
    // Получаем занятость для всех дат (6 дней)
    if (!doctor?.id) return;
    const days = getNext6Days();
    Promise.all(
      days.map(day =>
        fetch(`http://192.168.0.105:8080/api/books/busy-times?doctorId=${doctor.id}&date=${day.value}`)
          .then(res => res.json())
          .catch(() => [])
      )
    ).then(results => {
      const busyMap = {};
      days.forEach((day, idx) => {
        busyMap[day.value] = results[idx];
      });
      setAllBusyTimes(busyMap);
    });
  }, [doctor?.id]);

  const handleConfirm = async () => {
    if (!selectedTime) {
      alert('Пожалуйста, выберите время');
      return;
    }
    try {
      // Получаем userId (замените на ваш способ получения userId)
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('Ошибка: пользователь не найден');
        return;
      }
      const response = await fetch('http://192.168.0.105:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          doctorId: doctor?.id, // предполагается, что doctor.id есть
          date: selectedDate,
          time: selectedTime,
        }),
      });
      if (response.ok) {
        alert('Запись успешно создана!');
        // Обновляем занятые времена после записи
        fetch(`http://192.168.0.105:8080/api/books/busy-times?doctorId=${doctor.id}&date=${selectedDate}`)
          .then(res => res.json())
          .then(data => setBusyTimes(data));
        navigation.goBack();
      } else {
        alert('Ошибка при создании записи');
      }
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="angle-left" size={30} color="#222" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Запись к врачу</Text>
      </View>
      <View style={styles.photoWrapper}>
        <View style={[styles.photoContainer, { width: screenWidth * 0.85, height: screenWidth * 0.7 }]}> 
          <Image
            source={doctor?.avatar}
            style={[styles.photo, { width: screenWidth * 0.85, height: screenWidth * 0.7 }]}
            resizeMode="cover"
          />
        </View>
      </View>
      <DoctorAvailableDate
        days={days}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        allTimes={allTimes}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onConfirm={handleConfirm}
        busyTimes={allBusyTimes[selectedDate] || []}
        allBusyTimes={allBusyTimes}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 40,
    marginLeft: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 40,
  },
  photoWrapper: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    width: '100%',
  },
  photoContainer: {},
  photo: {
    borderRadius: 24,
    backgroundColor: '#eee',
  },
});

export default BookingScreen;
