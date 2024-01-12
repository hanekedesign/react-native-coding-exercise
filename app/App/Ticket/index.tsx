import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TicketBackground } from '../../../assets/vector/TicketBackground';
import { TicketPageBackground } from '../../../assets/vector/TicketPageBackground';
import { BackButton } from '../../../assets/vector/BackButton';
import { router } from "expo-router";
import { Colors } from '../../../constants/Colors';


export default function Ticket() {
  return (
    <SafeAreaView style={styles.container}>
      <TicketPageBackground style={styles.fullscreen} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <BackButton />
      </TouchableOpacity>
      <View style={styles.borderContainer}>
        <View style={styles.ticketContainer}>
          <TicketBackground style={styles.ticketBackground} />
        </View>
      </View>
      <TouchableOpacity style={styles.printTicketBtn} onPress={() => router.push("/App/Ticket")}>
        <Text style={styles.printTicketText}>PRINT TICKET</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'transparent', 
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover', 
    transform: [{ scale:1.4 }],
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  borderContainer: {
    width: '70%',  
    height: '79%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 2, 
    borderRadius: 25,
  },
  
  ticketContainer: {
    width: '80%', 
    height: '85%', 
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }], 
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 25,
  },
  
  ticketBackground: {
    width: '100%', 
    height: '100%', 
  },
  printTicketBtn: {
    backgroundColor: Colors.darkOrange, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  printTicketText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: 'center',
  },
});
