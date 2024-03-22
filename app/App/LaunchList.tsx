import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronCircleRight } from '../../assets/vector/ChevronCircleRight';
import { router } from "expo-router";

interface LaunchListProps {
  data: string[];
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string | null) => void;
  selectedFilter: string;
}

const LaunchList = ({ data, selectedItemId, setSelectedItemId, selectedFilter }: LaunchListProps) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isSelected = item === selectedItemId;
          return (
            <View style={styles.listItemWrapper}>
              <TouchableOpacity
                style={[styles.listItem, isSelected ? styles.listItemSelected : {}]}
                onPress={() => setSelectedItemId(item)}
              >
                <Text style={[styles.itemsText, isSelected ? styles.itemsTextSelected : {}]}>
                  {item}
                </Text>
              </TouchableOpacity>
              {isSelected ? (
                <TouchableOpacity
                  style={styles.chevronTouchable}
                  onPress={() => router.push("/App/Ticket")}
                >
                  <ChevronCircleRight style={styles.chevron} />
                </TouchableOpacity>
              ) : (
                <View style={styles.chevronPlaceholder} />
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => `${selectedFilter.toLowerCase()}_${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
      },
      listItem: {
        backgroundColor: Colors.lightYellow,
        borderRadius: 14,
        height: 60, 
        width: 233, 
        marginVertical: 6,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      },
      itemsText: {
        fontSize: 16,
        color: Colors.darkBlue,
      },
      listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: Colors.lightYellow, 
      },
      
      listItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, 
        width: '100%', 
      },
      
      listItemSelected: {
        backgroundColor: Colors.darkOrange,
      },
      itemsTextSelected: {
        color: Colors.white,
      },
      chevronTouchable: {
        position: 'absolute',
        right: 10, 
        height: '100%', 
        justifyContent: 'center', 
        paddingLeft:30,
      },
      chevron: {
        width:30.7,
        height:30.7,
      },
      chevronPlaceholder: {
        position: 'absolute',
        width: 30.7,
        height: 30.7,
      
      },
});

export default LaunchList;
