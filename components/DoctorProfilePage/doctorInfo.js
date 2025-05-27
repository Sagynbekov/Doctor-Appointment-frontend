import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DoctorStats from './doctorStats';

const DoctorInfo = ({ doctor, onBook }) => (
  <View>
    <View style={styles.infoRow}>
      <View style={styles.infoBox}>
        <Text style={styles.doctorName}>{doctor?.name}</Text>
        <Text style={styles.doctorService}>{doctor?.service}</Text>
      </View>
      <View style={styles.ratingBox}>
        <FontAwesome name="star" size={21} color="#FFD600" />
        <Text style={styles.ratingValue}>4.5</Text>
        <Text style={styles.ratingReviews}>(76 отзывов)</Text>
      </View>
    </View>
    <DoctorStats />
    {/* Блок "Обо мне" */}
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>Обо мне</Text>
      <Text style={styles.aboutText}>{doctor?.about || '—'}</Text>
    </View>
    {/* Кнопка "Записаться" */}
    <TouchableOpacity style={styles.button} onPress={onBook}>
      <Text style={styles.buttonText}>Записаться</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    marginTop: 15,
  },
  infoBox: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 26,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    textAlign: 'left',

  },
  doctorService: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'left',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
    flexShrink: 0,
    minWidth: 80,
  },
  ratingValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
  ratingReviews: {
    color: '#888',
    fontSize: 13,
    marginLeft: 6,
    paddingTop: 2
  },
  aboutContainer: {
    marginTop: 5,
    paddingHorizontal: 16,
  },
  aboutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    paddingLeft: 10,
    marginBottom: 4,
  },
  aboutText: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    marginTop: 22,
    marginHorizontal: 32,
    backgroundColor: '#4F6CFF',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default DoctorInfo;
