import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const doctors = [
  {
    name: 'Dr. Иван Иванов',
    service: 'Стоматология',
    price: 'Цена: 5000₸',
    avatar: require('../../assets/icon.png'),
  },
  {
    name: 'Dr. Ольга Петрова',
    service: 'Кардиология',
    price: 'Цена: 7000₸',
    avatar: require('../../assets/icon.png'),
  },
];

const TopDoctors = () => (
  <>
    <Text style={styles.topDoctorsTitle}>Лучшие Доктора</Text>
    {doctors.map((doctor, idx) => (
      <View style={styles.doctorCard} key={idx}>
        <Image source={doctor.avatar} style={styles.doctorAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorService}>{doctor.service}</Text>
          <Text style={styles.doctorPrice}>{doctor.price}</Text>
        </View>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  topDoctorsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6fa',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  doctorAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  doctorService: {
    color: '#6474b6',
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

export default TopDoctors;
