import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_URL = 'http://192.168.0.105:8080';

const AdminSpecScreen = () => {
  const [specs, setSpecs] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/specializations`)
      .then(res => res.json())
      .then(data => setSpecs(data))
      .catch(() => setSpecs([]));
  }, []);

  const handleAddSpec = async () => {
    if (!name || !description) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/specializations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        const newSpec = await response.json();
        setSpecs([...specs, newSpec]);
        setName('');
        setDescription('');
      } else {
        Alert.alert('Ошибка', 'Не удалось добавить специализацию');
      }
    } catch {
      Alert.alert('Ошибка', 'Ошибка соединения с сервером');
    }
  };

  const handleDeleteSpec = (id) => {
    setSpecs(specs.filter(s => s.id !== id));
  };

  const handleEditSpec = (spec) => {
    Alert.alert('Редактировать', `Редактировать специализацию: ${spec.name}`);
  };

  const renderSpec = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.specName}>{item.name}</Text>
        <Text style={styles.specDesc}>{item.description}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleEditSpec(item)} style={styles.iconButton}>
            <FontAwesome name="pencil" size={20} color="#1976d2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteSpec(item.id)} style={styles.iconButton}>
            <FontAwesome name="trash" size={20} color="#FF3B30" />
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
            <Text style={styles.title}>Добавить специализацию</Text>
            <InputField placeholder="Название специализации" value={name} onChangeText={setName} />
            <TextInput
              style={styles.textArea}
              placeholder="Описание"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
            <CustomButton title="Добавить специализацию" onPress={handleAddSpec} />
            <Text style={styles.sectionTitle}>Список специализаций</Text>
          </>
        }
        data={specs}
        renderItem={renderSpec}
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
  specName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 4,
  },
  specDesc: {
    color: '#444',
    fontSize: 13,
    marginBottom: 6,
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
});

export default AdminSpecScreen;
