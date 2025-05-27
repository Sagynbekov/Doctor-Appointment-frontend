import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorCard from './HomeDoctorCards';

const API_URL = 'http://192.168.0.105:8080';

const TopDoctors = ({ selectedService, searchQuery }) => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [ratings, setRatings] = useState({}); // { [doctorId]: avgRating }

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => res.json())
      .then(async data => {
        setDoctors(data);
        // Получаем рейтинги для всех докторов
        const ratingsObj = {};
        await Promise.all(
          data.map(async (doctor) => {
            try {
              const res = await fetch(`${API_URL}/api/reviews?doctorId=${doctor.id}`);
              const reviews = await res.json();
              if (Array.isArray(reviews) && reviews.length > 0) {
                const avg = reviews.reduce((acc, r) => acc + (r.stars || 0), 0) / reviews.length;
                ratingsObj[doctor.id] = avg;
              } else {
                ratingsObj[doctor.id] = null;
              }
            } catch {
              ratingsObj[doctor.id] = null;
            }
          })
        );
        setRatings(ratingsObj);
      })
      .catch(() => setDoctors([]));
  }, []);

  // Фильтрация по сервису и поиску
  const filteredDoctors = doctors.filter(doc => {
    const matchesService = selectedService ? doc.service === selectedService : true;
    const matchesSearch = searchQuery
      ? doc.name && doc.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      : true;
    return matchesService && matchesSearch;
  });

  return (
    <>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 24 }}>Лучшие Доктора</Text>
      {filteredDoctors.map((doctor, idx) => (
        <DoctorCard
          doctor={{
            name: doctor.name,
            service: doctor.service || '',
            specialization: doctor.specialization?.name || '',
            price: `Цена: ${doctor.price}`,
            avatar: doctor.photoUrl ? { uri: doctor.photoUrl } : require('../../assets/icon.png'),
          }}
          rating={ratings[doctor.id]}
          key={doctor.id || idx}
          onPress={() => navigation.navigate('DoctorProfile', { doctor: {
            ...doctor,
            service: doctor.service || '',
            specialization: doctor.specialization?.name || '',
            avatar: doctor.photoUrl ? { uri: doctor.photoUrl } : require('../../assets/icon.png'),
          } })}
        />
      ))}
    </>
  );
};

export default TopDoctors;
