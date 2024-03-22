import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

interface LoadMoreProps {
    handleLoadMore: () => void;
    displayedRecords: number;
    totalRecords: number;
  }
  

  const LoadMore = ({ handleLoadMore, displayedRecords, totalRecords }: LoadMoreProps) => {
    return (
      <View style={styles.loadMoreContainer}>
        <Text style={styles.paginationText}>{displayedRecords} of {totalRecords}</Text>
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>LOAD MORE</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    loadMoreContainer: {
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        justifyContent: 'space-around', 
        flexDirection: 'row',
        alignItems: 'center',
      },
      paginationText: {
        fontSize: 15,
        color: Colors.darkBlue,
        fontFamily: Fonts.primaryBold,
        fontWeight: 'bold',
      },
      loadMoreButton: {
        backgroundColor: Colors.darkOrange,
        borderRadius: 16.5, 
        width:141,
        height:33,
        justifyContent: 'center',
      },
      loadMoreText: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center', 
        fontSize: 15,
        fontFamily: Fonts.primaryBold,
      },
});

export default LoadMore;
