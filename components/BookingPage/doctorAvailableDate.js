import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const doctorAvailableDate = ({
  days,
  selectedDate,
  setSelectedDate,
  mockTimes,
  selectedTime,
  setSelectedTime,
  onConfirm
}) => (
  <>
    <View style={styles.calendarBlock}>
      <Text style={styles.sectionTitle}>Выберите дату</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScroll}>
        {days.map((day) => (
          <TouchableOpacity
            key={day.value}
            style={[styles.dayButton, selectedDate === day.value && styles.dayButtonSelected]}
            onPress={() => setSelectedDate(day.value)}
          >
            <Text style={[styles.dayLabel, selectedDate === day.value && styles.dayLabelSelected]}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    <View style={styles.timeBlock}>
      <Text style={styles.sectionTitle}>Свободное время</Text>
      <View style={styles.timeRow}>
        {mockTimes.map((slot) => (
          <TouchableOpacity
            key={slot.time}
            style={[
              styles.timeButton,
              !slot.available && styles.timeButtonDisabled,
              selectedTime === slot.time && slot.available && styles.timeButtonSelected,
            ]}
            disabled={!slot.available}
            onPress={() => setSelectedTime(slot.time)}
          >
            <Text style={[
              styles.timeLabel,
              !slot.available && styles.timeLabelDisabled,
              selectedTime === slot.time && slot.available && styles.timeLabelSelected,
            ]}>{slot.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <TouchableOpacity
      style={[styles.confirmButton, !(selectedTime && selectedDate) && styles.confirmButtonDisabled]}
      disabled={!(selectedTime && selectedDate)}
      onPress={onConfirm}
    >
      <Text style={styles.confirmButtonText}>Подтвердить</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  calendarBlock: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  calendarScroll: {
    flexGrow: 0,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
  },
  dayButtonSelected: {
    backgroundColor: '#4F6CFF',
  },
  dayLabel: {
    color: '#222',
    fontSize: 15,
  },
  dayLabelSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeBlock: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    marginBottom: 10,
  },
  timeButtonSelected: {
    backgroundColor: '#4F6CFF',
  },
  timeButtonDisabled: {
    backgroundColor: '#ddd',
  },
  timeLabel: {
    color: '#222',
    fontSize: 15,
  },
  timeLabelSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeLabelDisabled: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  confirmButton: {
    marginTop: 'auto',
    marginBottom: 24,
    marginHorizontal: 32,
    backgroundColor: '#4F6CFF',
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 2,
  },
  confirmButtonDisabled: {
    backgroundColor: '#b3c3ff',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default doctorAvailableDate;
