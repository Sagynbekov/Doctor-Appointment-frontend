import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorCard from './HomeDoctorCards';

const API_URL = 'http://192.168.0.105:8080';

const TopDoctors = () => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);

  return (
    <>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 24 }}>Лучшие Доктора</Text>
      {doctors.map((doctor, idx) => (
        <DoctorCard
          doctor={{
            name: doctor.name,
            service: doctor.specialization?.name || '',
            price: `Цена: ${doctor.price}`,
            avatar: doctor.photoUrl ? { uri: doctor.photoUrl } : require('../../assets/icon.png'),
          }}
          key={doctor.id || idx}
          onPress={() => navigation.navigate('DoctorProfile', { doctor: {
            ...doctor,
            service: doctor.specialization?.name || '',
            avatar: doctor.photoUrl ? { uri: doctor.photoUrl } : require('../../assets/icon.png'),
          } })}
        />
      ))}
    </>
  );
};

export default TopDoctors;
