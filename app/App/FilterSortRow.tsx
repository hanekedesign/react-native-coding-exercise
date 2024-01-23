import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FilterIcon, SortIcon } from '../../assets/vector';

interface FilterSortRowProps {
  selectedFilter: string;
  toggleSortOrder: () => void;
  handleFilterIconOrBackdropPress: () => void;
}

const FilterSortRow = ({ selectedFilter, toggleSortOrder, handleFilterIconOrBackdropPress }: FilterSortRowProps) => {
  return (
    <View style={styles.iconRowWrapper}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleFilterIconOrBackdropPress}>
          <FilterIcon style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.itemText}>{selectedFilter}</Text>
        <TouchableOpacity onPress={toggleSortOrder}>
          <SortIcon style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.underline} /> 
    </View>
  );
};

const styles = StyleSheet.create({
    iconRowWrapper: {
        alignItems: 'center',
        justifyContent: 'center', 
      },
      
      iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        marginTop:20,
      },
      
      itemText: {
        fontSize: 16,
        color: Colors.darkBlue,
        fontWeight: 'bold',
        marginLeft: 10, 
      },
      
      icon: {
        width: 34, 
        height: 34, 
      },
      
      underline: {
        borderBottomColor: Colors.darkBlue, 
        borderBottomWidth: 5,
        padding: 3,
        width: '90%',
        borderRadius: 10,
      },
});

export default FilterSortRow;
