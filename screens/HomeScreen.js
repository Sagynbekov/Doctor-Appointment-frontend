import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import HomeHeader from '../components/HomePage/HomeHeader';
import Search from '../components/HomePage/Search';
import Services from '../components/HomePage/HomeServices';
import TopDoctors from '../components/HomePage/HomeTopDoctors';

const HomeScreen = ({ username }) => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
    <HomeHeader username={username} />
    <Search />
    <Services />
    <TopDoctors />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default HomeScreen;
