import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_URL = 'http://192.168.0.105:8080';

const DoctorReviewsModal = ({ visible, onClose, doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !doctorId) return;
    setLoading(true);
    fetch(`${API_URL}/api/reviews?doctorId=${doctorId}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [visible, doctorId]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Отзывы</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#888" />
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#4F6CFF" style={{ marginTop: 30 }} />
          ) : reviews.length === 0 ? (
            <Text style={styles.empty}>Пока нет отзывов</Text>
          ) : (
            <FlatList
              data={reviews}
              keyExtractor={item => String(item.id)}
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <View style={styles.starsRow}>
                    {[1,2,3,4,5].map(star => (
                      <FontAwesome
                        key={star}
                        name={star <= item.stars ? 'star' : 'star-o'}
                        size={18}
                        color="#FFD700"
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewText}>{item.text}</Text>
                  <Text style={styles.reviewUser}>Пользователь: {item.userId}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 2,
  },
  empty: {
    color: '#888',
    fontSize: 16,
    marginTop: 30,
  },
  reviewCard: {
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewText: {
    color: '#222',
    fontSize: 15,
    marginBottom: 6,
  },
  reviewUser: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default DoctorReviewsModal;
