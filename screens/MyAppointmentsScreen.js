import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const mockAppointments = [
  {
    id: '1',
    doctor: 'Dr. Иван Иванов',
    service: 'Стоматология',
    date: '2025-05-28',
    time: '09:00',
    avatar: require('../assets/icon.png'),
  },
  {
    id: '2',
    doctor: 'Dr. Ольга Петрова',
    service: 'Кардиология',
    date: '2025-05-29',
    time: '11:00',
    avatar: require('../assets/icon.png'),
  },
];

const MyAppointmentsScreen = () => {
  const [appointments] = useState(mockAppointments);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctor}>{item.doctor}</Text>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.dateTime}>{item.date} в {item.time}</Text>
      </View>
      <FontAwesome name="calendar-check-o" size={28} color="#4F6CFF" style={{ marginLeft: 10 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои записи</Text>
      {appointments.length === 0 ? (
        <Text style={styles.empty}>У вас пока нет записей</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
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
