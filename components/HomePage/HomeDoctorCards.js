import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const DoctorCard = ({ doctor, style }) => (
  <View style={[styles.doctorCard, style]}>
    <View style={styles.ratingContainer}>
      <FontAwesome name="star" size={16} color="#FFD600" />
      <Text style={styles.ratingText}>4.5</Text>
    </View>
    <Image source={doctor.avatar} style={styles.doctorAvatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <Text style={styles.doctorService}>{doctor.service}</Text>
      <Text style={styles.doctorPrice}>{doctor.price}</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Feather name="arrow-right" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  ratingText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
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
    color: '#3E69FE',
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
  arrowButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    backgroundColor: '#111',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DoctorCard;
