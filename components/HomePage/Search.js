import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Search = ({ value, onChangeText }) => (
  <View style={styles.searchRow}>
    <View style={styles.searchInputWrapper}>
      <Icon name="search" size={20} color="#aaa" style={{ marginLeft: 8 }} />
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
    <TouchableOpacity style={styles.filterButton}>
      <Icon name="tune" size={24} color="#3E69FE" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    marginRight: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 8,
  },
});

export default Search;
