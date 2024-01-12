import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIconContainer}>
      </View>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Search for flights"
        placeholderTextColor={Colors.lightBeige}
        value={searchTerm}
        onChangeText={setSearchTerm} 
      />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 16.5,
        height: 35, 
        marginTop:15,
        marginLeft: 20,
        marginRight: 20,
      },
      searchInput: {
        backgroundColor: Colors.darkBlue,
        color: Colors.lightBeige,
        fontSize: 15,
        fontFamily: Fonts.primaryRegular,
        width: 224,
        height: 33,
        borderRadius: 16.5,
        paddingLeft: 50, 
      },
      searchButton: {
        width: 80, 
        height: 33, 
        backgroundColor: Colors.darkOrange,
        borderRadius: 16.5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchButtonText: {
        color: Colors.white, 
        fontSize: 12, 
        fontFamily: Fonts.primaryBold, 
        fontWeight: 'bold',
      },
      placeholderStyle: {
        color: Colors.lightBeige,
      },
      searchRocket: {
        width:20,
        height:25,
      },
      searchIconContainer: {
        position: 'absolute',
        left: 30,
        height: 35,
        justifyContent: 'center',
        zIndex: 1,
      },
  });
  
  export default SearchBar;