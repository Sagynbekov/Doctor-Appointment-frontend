import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DoctorStats = () => (
  <View style={styles.statsRow}>
    <View style={styles.statBox}>
      <View style={styles.iconCircle}>
        <FontAwesome name="check-square-o" size={24} color="#4F6CFF" />
      </View>
      <Text style={styles.statValue}>100+</Text>
      <Text style={styles.statLabel}>Клиентов</Text>
    </View>
    <View style={styles.statBox}>
      <View style={styles.iconCircle}>
        <FontAwesome name="star" size={24} color="#4F6CFF" />
      </View>
      <Text style={styles.statValue}>4.9</Text>
      <Text style={styles.statLabel}>Рейтинг</Text>
    </View>
    <View style={styles.statBox}>
      <View style={styles.iconCircle}>
        <FontAwesome name="commenting" size={24} color="#4F6CFF" />
      </View>
      <Text style={styles.statValue}>90+</Text>
      <Text style={styles.statLabel}>Отзывов</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 15,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    backgroundColor: '#F3F6FF',
    borderRadius: 32,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 1,
  },
  statLabel: {
    color: '#888',
    fontSize: 13,
  },
});

export default DoctorStats;
