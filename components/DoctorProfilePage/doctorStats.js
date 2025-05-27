import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DoctorReviewsModal from './DoctorReviewsModal';

const API_URL = 'http://192.168.0.105:8080';

const DoctorStats = ({ doctorId, onReviewsCount, onAverageStars }) => {
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    if (!doctorId) return;
    fetch(`${API_URL}/api/reviews?doctorId=${doctorId}`)
      .then(res => res.json())
      .then(data => {
        const count = Array.isArray(data) ? data.length : 0;
        setReviewsCount(count);
        if (onReviewsCount) onReviewsCount(count);
        let avg = 0;
        if (count > 0) {
          const sum = data.reduce((acc, r) => acc + (r.stars || 0), 0);
          avg = sum / count;
        }
        setAverageStars(avg);
        if (onAverageStars) onAverageStars(avg);
      })
      .catch(() => {
        setReviewsCount(0);
        setAverageStars(0);
        if (onReviewsCount) onReviewsCount(0);
        if (onAverageStars) onAverageStars(0);
      });
  }, [doctorId]);

  return (
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
        <Text style={styles.statValue}>{averageStars > 0 ? averageStars.toFixed(1) : '-'}</Text>
        <Text style={styles.statLabel}>Рейтинг</Text>
      </View>
      <View style={styles.statBox}>
        <TouchableOpacity onPress={() => setReviewsVisible(true)}>
          <View style={styles.iconCircle}>
            <FontAwesome name="commenting" size={24} color="#4F6CFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.statValue}>{reviewsCount}</Text>
        <Text style={styles.statLabel}>Отзывов</Text>
      </View>
      <DoctorReviewsModal
        visible={reviewsVisible}
        onClose={() => setReviewsVisible(false)}
        doctorId={doctorId}
      />
    </View>
  );
};

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
