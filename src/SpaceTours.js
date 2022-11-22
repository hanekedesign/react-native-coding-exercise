import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { container } from './utils/styles';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/appoloClient';

const SpaceTours = () => {
	return (
		<ApolloProvider client={client()}>
			<SafeAreaView style={container.rootTop}></SafeAreaView>
			<SafeAreaView style={container.rootBottom}>
				<StatusBar style="light" />
			</SafeAreaView>
		</ApolloProvider>
	);
};

export default SpaceTours;
