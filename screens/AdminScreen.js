import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const defaultAvatar = require('../assets/icon.png');

const initialDoctors = [
  {
    id: 1,
    name: 'Dr. Иван Иванов',
    service: 'Стоматология',
    price: '5000₸',
    about: 'Опытный стоматолог с индивидуальным подходом.',
    avatar: defaultAvatar,
  },
  {
    id: 2,
    name: 'Dr. Ольга Петрова',
    service: 'Кардиология',
    price: '7000₸',
    about: 'Кардиолог с большим опытом работы.',
    avatar: defaultAvatar,
  },
];

const AdminScreen = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleAddDoctor = () => {
    if (!name || !service || !price || !about) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    setDoctors([
      ...doctors,
      {
        id: Date.now(),
        name,
        service,
        price: price.endsWith('₸') ? price : price + '₸',
        about,
        avatar,
      },
    ]);
    setName('');
    setService('');
    setPrice('');
    setAbout('');
    setAvatar(defaultAvatar);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  const handleEditDoctor = (doctor) => {
    // Здесь можно реализовать открытие модального окна для редактирования
    Alert.alert('Редактировать', `Редактировать доктора: ${doctor.name}`);
  };

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorService}>{item.service}</Text>
        <Text style={styles.doctorPrice}>Цена: {item.price}</Text>
        <Text style={styles.doctorAbout}>{item.about}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.scheduleButton} onPress={() => Alert.alert('Расписание', 'Здесь будет управление расписанием доктора.')}> 
            <Text style={styles.scheduleButtonText}>График</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteDoctor(item.id)} style={styles.iconButton}>
            <FontAwesome name="trash" size={20} color="#FF3B30" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditDoctor(item)} style={styles.iconButton}>
            <FontAwesome name="pencil" size={20} color="#1976d2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Панель Администратора</Text>
            <Text style={styles.sectionTitle}>Добавить нового доктора</Text>
            <InputField placeholder="Имя доктора" value={name} onChangeText={setName} />
            <InputField placeholder="Специализация" value={service} onChangeText={setService} />
            <InputField placeholder="Цена (₸)" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <TextInput
              style={styles.textArea}
              placeholder="Обо мне"
              value={about}
              onChangeText={setAbout}
              multiline
              numberOfLines={3}
            />
            <CustomButton title="Добавить доктора" onPress={handleAddDoctor} />
            <Text style={styles.sectionTitle}>Список докторов</Text>
          </>
        }
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 18,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  doctorName: {
    fontWeight: 'bold',
    fontSize: 17,
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
  doctorAbout: {
    color: '#444',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
  },
  scheduleButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  scheduleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    minHeight: 60,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  iconButton: {
    marginRight: 12,
    padding: 4,
  },
});

export default AdminScreen;
