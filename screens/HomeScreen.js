import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HomeHeader from '../components/HomePage/HomeHeader';
import Search from '../components/HomePage/Search';
import Services from '../components/HomePage/HomeServices';
import TopDoctors from '../components/HomePage/HomeTopDoctors';

const HomeScreen = ({ username }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
      <HomeHeader username={username} />
      <Search value={searchQuery} onChangeText={setSearchQuery} />
      <Services selectedService={selectedService} setSelectedService={setSelectedService} />
      <TopDoctors selectedService={selectedService} searchQuery={searchQuery} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default HomeScreen;
