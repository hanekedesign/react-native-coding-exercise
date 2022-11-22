import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import { home } from '../utils/styles';
import SearchBar from '../components/SearchBar';
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import TableFooter from '../components/TableFooter';

const Home = () => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [search, setSearch] = useState({
		limit: 5,
		sort: `launch_year:desc`,
		offset: 0,
	});

	return (
		<MainLayout
			afterHeader={
				<>
					<View style={home.bannerContainer}>
						<Image
							style={home.bannerImg}
							source={require('../../assets/banner.png')}
						/>
					</View>
					<SearchBar />
					<TableHead />
				</>
			}
		>
			<View>
				<TableData
					data={[]}
					loading={loading}
					selectedRow={selectedRow}
					setSelected={setSelectedRow}
					footer={
						<TableFooter
							search={search}
							totalData={data?.launchesPast.length}
							loadMore={() => {
								fetchMore({
									variables: { ...search, offset: data?.launchesPast.length },
								});
							}}
						/>
					}
				/>
			</View>
		</MainLayout>
	);
};

export default Home;
