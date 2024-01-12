import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../constants/Colors';
import FilterOption from '../App/Root/index';


interface FilterModalProps {
  modalVisible: boolean;
  handleFilterIconOrBackdropPress: () => void;
  handleFilterSelect: (filterOption: typeof FilterOption) => void;
  modalPosition: { top: number, left: number };
  filterOptions: string[];
}

const FilterModal = ({ modalVisible, handleFilterIconOrBackdropPress, handleFilterSelect, modalPosition, filterOptions }: FilterModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleFilterIconOrBackdropPress} 
    >
      <TouchableOpacity
        activeOpacity={1} 
        onPress={handleFilterIconOrBackdropPress} 
        style={styles.modalBackdrop}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.modalView, { top: modalPosition.top, left: modalPosition.left }]}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleFilterSelect(option as unknown as typeof FilterOption)}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        backgroundColor: Colors.darkBlue,
        borderRadius: 20,
        padding: 10,
        paddingTop: 20,
        alignItems: "center",
        width: 250,
        height: 240,
      },
      modalOption: {
        backgroundColor: Colors.lightYellow,
        padding: 10,
        marginVertical: 5,
        width: 195,
        height: 53,
        alignItems: 'center',
        borderRadius: 14,
        justifyContent: 'center',
      },
      modalOptionText: {
        color: "#193247",
        fontWeight: "bold",
      },
      modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default FilterModal;
