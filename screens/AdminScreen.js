import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

const defaultAvatar = require('../assets/icon.png');
const API_URL = 'http://192.168.0.105:8080';

const SERVICE_OPTIONS = [
  { label: 'Стоматолог', value: 'Стоматолог' },
  { label: 'Невролог', value: 'Невролог' },
  { label: 'Кардиолог', value: 'Кардиолог' },
];

const AdminScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/doctors`);
      const data = await res.json();
      setDoctors(data);
    } catch {
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/specializations`)
      .then(res => res.json())
      .then(data => setSpecializations(data))
      .catch(() => setSpecializations([]));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${API_URL}/specializations`)
        .then(res => res.json())
        .then(data => setSpecializations(data))
        .catch(() => setSpecializations([]));
    }, [])
  );

  const handlePickImage = async () => {
    // Запросить разрешение на доступ к галерее
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Разрешение на доступ к галерее не получено');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.IMAGE,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUrl('data:image/jpeg;base64,' + result.assets[0].base64);
    }
  };

  const handleAddOrEditDoctor = async () => {
    if (!name || !selectedSpecId || !price || !about || !service) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    try {
      if (editId) {
        // Редактирование
        const response = await fetch(`${API_URL}/doctors/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            service,
            specialization: { id: Number(selectedSpecId) },
            price, // убрано добавление '₸'
            about,
            photoUrl,
          }),
        });
        if (response.ok) {
          await fetchDoctors();
          setEditId(null);
          setName('');
          setSelectedSpecId('');
          setPrice('');
          setAbout('');
          setPhotoUrl('');
          setAvatar(defaultAvatar);
          setService('');
        } else {
          Alert.alert('Ошибка', 'Не удалось обновить доктора');
        }
      } else {
        // Добавление
        const response = await fetch(`${API_URL}/doctors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            service,
            specialization: { id: Number(selectedSpecId) },
            price, // убрано добавление '₸'
            about,
            photoUrl,
          }),
        });
        if (response.ok) {
          await fetchDoctors();
          setName('');
          setSelectedSpecId('');
          setPrice('');
          setAbout('');
          setPhotoUrl('');
          setAvatar(defaultAvatar);
          setService('');
        } else {
          Alert.alert('Ошибка', 'Не удалось добавить доктора');
        }
      }
    } catch {
      Alert.alert('Ошибка', 'Ошибка соединения с сервером');
    }
  };

  const handleDeleteDoctor = (id) => {
    Alert.alert(
      'Удаление',
      'Вы точно хотите удалить доктора?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить', style: 'destructive', onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/doctors/${id}`, { method: 'DELETE' });
              if (response.ok || response.status === 204) {
                await fetchDoctors();
              } else {
                Alert.alert('Ошибка', 'Не удалось удалить доктора');
              }
            } catch {
              Alert.alert('Ошибка', 'Ошибка соединения с сервером');
            }
          }
        }
      ]
    );
  };

  const handleEditDoctor = (doctor) => {
    setEditId(doctor.id);
    setName(doctor.name);
    setService(doctor.service);
    setSelectedSpecId(doctor.specialization?.id?.toString() || '');
    setPrice(doctor.price ? doctor.price : ''); // убрано удаление '₸'
    setAbout(doctor.about);
    setPhotoUrl(doctor.photoUrl || '');
    setAvatar(doctor.photoUrl ? { uri: doctor.photoUrl } : defaultAvatar);
  };

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.photoUrl ? { uri: item.photoUrl } : defaultAvatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorService}>{item.service || ''}</Text>
        <Text style={styles.doctorService}>{item.specialization?.name || ''}</Text>
        <Text style={styles.doctorPrice}>{item.price}</Text>
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
            <View style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }}>
              <Picker
                selectedValue={service}
                onValueChange={value => setService(value)}
                style={{ height: 50, width: '100%' }}
              >
                <Picker.Item label="Выберите сервис" value="" />
                {SERVICE_OPTIONS.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
            <View style={{ marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }}>
              <Picker
                selectedValue={selectedSpecId}
                onValueChange={value => setSelectedSpecId(value)}
                style={{ height: 50, width: '100%' }}
              >
                <Picker.Item label="Выберите специализацию" value="" />
                {specializations.map(spec => (
                  <Picker.Item key={spec.id} label={spec.name} value={spec.id.toString()} />
                ))}
              </Picker>
            </View>
            <InputField placeholder="Цена" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <TextInput
              style={styles.textArea}
              placeholder="Обо мне"
              value={about}
              onChangeText={setAbout}
              multiline
              numberOfLines={3}
            />
            {/* Центрированная кнопка для загрузки фото с подписью */}
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <TouchableOpacity onPress={handlePickImage} style={styles.photoIconButtonCentered}>
                <FontAwesome name="camera" size={32} color="#1976d2" />
              </TouchableOpacity>
              <Text style={{ color: '#1976d2', marginTop: 4, fontWeight: 'bold' }}>Добавить фото</Text>
              {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={{ width: 80, height: 80, borderRadius: 40, marginTop: 8 }} />
              ) : null}
            </View>
            <CustomButton title={editId ? 'Сохранить изменения' : 'Добавить доктора'} onPress={handleAddOrEditDoctor} />
            {editId && (
              <CustomButton title="Отмена редактирования" onPress={() => { setEditId(null); setName(''); setSelectedSpecId(''); setPrice(''); setAbout(''); setPhotoUrl(''); setAvatar(defaultAvatar); setService(''); }} style={{ marginTop: 8, backgroundColor: '#ccc' }} />
            )}
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
  photoIconButtonCentered: {
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: 8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f6fa',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1976d2',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
