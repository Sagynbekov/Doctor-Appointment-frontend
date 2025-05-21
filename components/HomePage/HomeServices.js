import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Services = () => (
  <>
    <View style={styles.servicesHeader}>
      <Text style={styles.servicesTitle}>Сервисы</Text>
      <TouchableOpacity style={styles.allButton}>
        <Text style={styles.allButtonText}>Больше</Text>
        <FontAwesome name="angle-right" size={16} color="#fff" style={{ marginLeft: 5 }} />
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
    backgroundColor: '#3E69FE',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 3,
    elevation: 4,
  },
  allButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  serviceBox: {
    backgroundColor: '#3E69FE',
    borderRadius: 20,
    width: 115,
    height: 97,
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
