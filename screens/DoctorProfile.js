import React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import DoctorInfo from '../components/DoctorProfilePage/doctorInfo';

const DoctorProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = route.params?.doctor;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="angle-left" size={30} color="#222" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Доктор</Text>
      </View>
      <View style={styles.photoWrapper}>
        <View style={[styles.photoContainer, { width: screenWidth * 0.85, height: screenWidth * 0.7 }]}>
          <Image
            source={doctor?.avatar}
            style={[styles.photo, { width: screenWidth * 0.85, height: screenWidth * 0.7 }]}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.favoriteButton}>
            <FontAwesome name="heart-o" size={23} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <DoctorInfo doctor={doctor} onBook={() => navigation.navigate('BookingScreen', { doctor })} />
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
    marginBottom: 0,
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
    marginBottom: 0,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '85%',
    marginTop: 15,
    paddingLeft: 8,
    paddingRight: 8,
  },
  photoContainer: {
  },
  photo: {
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  favoriteButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  infoBox: {
    alignItems: 'flex-start',
    flex: 1,
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
    alignItems: 'flex-start', // изменено с 'center' на 'flex-start'
    marginTop: 2, // можно добавить небольшой отступ сверху
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
  },
});

export default DoctorProfile;
