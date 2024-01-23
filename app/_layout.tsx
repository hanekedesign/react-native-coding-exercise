import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { AppProvider } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from '@apollo/client';
import client from './App/api/apolloClient'; 
//import * as Font from 'expo-font';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // "Roboto": require("../../assets/fonts/Roboto-Black.ttf"),
    // "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    // "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerBackVisible: false,
        headerShown: false,
      }}
    />
  );
}
