import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorCard from './HomeDoctorCards';

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

const TopDoctors = () => {
  const navigation = useNavigation();

  return (
    <>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 24 }}>Лучшие Доктора</Text>
      {doctors.map((doctor, idx) => (
        <DoctorCard
          doctor={doctor}
          key={idx}
          onPress={() => navigation.navigate('DoctorProfile', { doctor })}
        />
      ))}
    </>
  );
};

export default TopDoctors;
