import React from 'react';
import { StyleSheet, View, Platform, StatusBar} from 'react-native';
import {AppLogo} from '../../assets/vector/AppLogo';
import { PlanetIcon } from '../../assets/vector/PlanetIcon';
import { RocketIcon } from '../../assets/vector/RocketIcon';
import { Banner } from '../../assets/vector/Banner';
import { Colors } from '../../constants/Colors';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 15 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 130 : 36;

export const RootHeader: React.FC = () => {

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <PlanetIcon style={styles.planetIcon} />
        <AppLogo style={styles.logo} />
        <RocketIcon style={styles.rocketIcon} />  
      </View>
      <View style={styles.bannerContainer}>
        <Banner style={styles.banner} />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.darkBlue,
      width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingTop: STATUSBAR_HEIGHT, 
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: APPBAR_HEIGHT, 
        width: '100%',
        zIndex: 2,
      },
      planetIcon: {
        width: 37,
        height: 40,
        marginRight: 20,
        top: -40,
      },
      logo: {
        width: 182,
        height: 95,
        marginRight: 10,
        marginLeft: 20,
      },
      rocketIcon: {
        width: 76,
        height: 162,
        position: 'absolute',
        right: 0,
        zIndex: 10, 
      },
      bannerContainer: {
        width: '100%', 
        backgroundColor: Colors.lightBeige,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
      },
      banner: {
        backgroundColor: Colors.lightBeige,
        height: 40,
        width: '100%', 
      },
  });
export default RootHeader;

