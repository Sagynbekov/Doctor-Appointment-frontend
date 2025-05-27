import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import DoctorAvailableDate from '../components/BookingPage/doctorAvailableDate';

const mockTimes = [
  { time: '09:00', available: true },
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '12:00', available: true },
  { time: '13:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
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
  const days = getNext6Days();

  const handleConfirm = () => {
    // handle booking logic here
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
        mockTimes={mockTimes}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onConfirm={handleConfirm}
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
