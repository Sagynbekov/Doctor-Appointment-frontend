import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Services = () => (
  <>
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
  </>
);

const styles = StyleSheet.create({
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
});

export default Services;
