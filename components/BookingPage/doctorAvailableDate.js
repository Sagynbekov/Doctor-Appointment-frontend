import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const doctorAvailableDate = ({
  days,
  selectedDate,
  setSelectedDate,
  allTimes,
  selectedTime,
  setSelectedTime,
  onConfirm,
  busyTimes = [],
  allBusyTimes = {}
}) => (
  <>
    <View style={styles.calendarBlock}>
      <Text style={styles.sectionTitle}>Выберите дату</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarScroll}>
        {days.map((day) => {
          const dayBusyTimes = allBusyTimes[day.value] || [];
          const isFullBusy = allTimes && dayBusyTimes && allTimes.every(time => dayBusyTimes.includes(time));
          const isSelected = selectedDate === day.value;
          return (
            <TouchableOpacity
              key={day.value}
              style={[
                styles.dayButton,
                isSelected && styles.dayButtonSelected,
                isFullBusy && styles.dayButtonFullBusy,
              ]}
              onPress={() => setSelectedDate(day.value)}
            >
              <Text style={[
                styles.dayLabel,
                isSelected && styles.dayLabelSelected,
                isFullBusy && styles.dayLabelFullBusy,
              ]}>{day.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
    <View style={styles.timeBlock}>
      <Text style={styles.sectionTitle}>Свободное время</Text>
      <View style={styles.timeRow}>
        {allTimes.map((time) => {
          const isBusy = busyTimes.includes(time);
          return (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                isBusy && styles.timeButtonDisabled,
                selectedTime === time && !isBusy && styles.timeButtonSelected,
              ]}
              disabled={isBusy}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeLabel,
                isBusy && styles.timeLabelDisabled,
                selectedTime === time && !isBusy && styles.timeLabelSelected,
              ]}>{time}</Text>
            </TouchableOpacity>
          );
        })}
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
  dayButtonFullBusy: {
    backgroundColor: '#ffb3b3', // светло-красный
    borderWidth: 1,
    borderColor: '#ff3333',
  },
  dayLabel: {
    color: '#222',
    fontSize: 15,
  },
  dayLabelSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dayLabelFullBusy: {
    color: '#ff3333',
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
