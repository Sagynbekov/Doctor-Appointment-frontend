import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ReviewsModal = ({ visible, onClose, onSubmit, doctorName }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handleSend = () => {
    if (rating > 0 && review.trim().length > 0) {
      onSubmit({ rating, review });
      setRating(0);
      setReview('');
    }
  };

  const handleClose = () => {
    setRating(0);
    setReview('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Оставить отзыв {doctorName ? `о ${doctorName}` : ''}</Text>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map(star => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <FontAwesome
                  name={star <= rating ? 'star' : 'star-o'}
                  size={32}
                  color="#FFD700"
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ваш отзыв..."
            value={review}
            onChangeText={setReview}
            multiline
            maxLength={300}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendBtn, !(rating && review.trim()) && { opacity: 0.5 }]}
              onPress={handleSend}
              disabled={!(rating && review.trim())}
            >
              <Text style={styles.sendText}>Отправить</Text>
            </TouchableOpacity>
          </View>
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
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  input: {
    width: '100%',
    minHeight: 60,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 18,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendBtn: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#4F6CFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReviewsModal;
