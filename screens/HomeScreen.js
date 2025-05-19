import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeHeader from '../components/HomePage/HomeHeader';
import Search from '../components/HomePage/Search';
import Services from '../components/HomePage/HomeServices';
import TopDoctors from '../components/HomePage/HomeTopDoctors';
import Footer from '../components/HomePage/HomeFooter';

const HomeScreen = ({ username }) => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <HomeHeader username={username} />
      <Search />
      <Services />
      <TopDoctors />
    </View>
    <Footer />
  </View>
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
