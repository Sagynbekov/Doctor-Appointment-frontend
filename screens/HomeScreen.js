import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ username }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Image source={require('../assets/icon.png')} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.hello}>Добро пожаловать, {username}!</Text>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="notifications-none" size={28} color="#1976d2" />
      </TouchableOpacity>
    </View>
    {/* Search */}
    <View style={styles.searchRow}>
      <View style={styles.searchInputWrapper}>
        <Icon name="search" size={20} color="#aaa" style={{ marginLeft: 8 }} />
        <TextInput style={styles.searchInput} placeholder="Поиск" />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter-list" size={24} color="#1976d2" />
      </TouchableOpacity>
    </View>
    {/* Services */}
    <View style={styles.servicesHeader}>
      <Text style={styles.servicesTitle}>Сервисы</Text>
      <TouchableOpacity style={styles.allButton}>
        <Text style={styles.allButtonText}>Все</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.servicesRow}>
      <View style={styles.serviceBox}>
        <MaterialCommunityIcons name="tooth-outline" size={32} color="#fff" />
        <Text style={styles.serviceText}>Стоматология</Text>
      </View>
      <View style={styles.serviceBox}>
        <MaterialCommunityIcons name="brain" size={32} color="#fff" />
        <Text style={styles.serviceText}>Неврология</Text>
      </View>
      <View style={styles.serviceBox}>
        <FontAwesome name="heartbeat" size={32} color="#fff" />
        <Text style={styles.serviceText}>Кардиология</Text>
      </View>
    </View>
    {/* Top Doctors */}
    <Text style={styles.topDoctorsTitle}>Лучшие Доктора</Text>
    <View style={styles.doctorCard}>
      <Image source={require('../assets/icon.png')} style={styles.doctorAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>Dr. Иван Иванов</Text>
        <Text style={styles.doctorService}>Стоматология</Text>
        <Text style={styles.doctorPrice}>Цена: 5000₸</Text>
      </View>
    </View>
    <View style={styles.doctorCard}>
      <Image source={require('../assets/icon.png')} style={styles.doctorAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>Dr. Ольга Петрова</Text>
        <Text style={styles.doctorService}>Кардиология</Text>
        <Text style={styles.doctorPrice}>Цена: 7000₸</Text>
      </View>
    </View>
    {/* Footer */}
    <View style={styles.footer}>
      <Icon name="home" size={28} color="#1976d2" />
      <Icon name="calendar-today" size={28} color="#aaa" />
      <Icon name="favorite-border" size={28} color="#aaa" />
      <Icon name="person-outline" size={28} color="#aaa" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  hello: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  iconButton: {
    padding: 6,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    marginRight: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 8,
  },
  servicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  allButton: {
    backgroundColor: '#1976d2',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  allButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  serviceBox: {
    backgroundColor: '#1976d2',
    borderRadius: 16,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  serviceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
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
    color: '#1976d2',
    fontSize: 14,
    marginTop: 2,
  },
  doctorPrice: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
  },
});

export default HomeScreen;
