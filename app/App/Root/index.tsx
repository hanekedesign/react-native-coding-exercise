import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {GET_LAUNCHES_PAST} from '../api/getLaunchesPast';
import { useQuery } from '@apollo/client';
import {RootHeader} from '../../../components/Headers/RootHeader';
import { Colors } from '../../../constants/Colors';
import SearchBar from '../SearchBar';
import LoadMore from '../LoadMore';
import FilterModal from '../FilterModal';
import FilterSortRow from '../FilterSortRow';
import LaunchList from '../LaunchList';


interface LaunchType {
  mission_name: string;
  launch_date_utc: string;
  launch_site?: {
    site_name_long: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    article_link: string;
    video_link: string;
  };
  launch_year: string;
}

type ModalPosition = {
  top: number;
  left: number;
};

type FilterOption = 'ROCKET NAME' | 'ROCKET TYPE' | 'LAUNCH YEAR';
const filterOptions: FilterOption[] = ['ROCKET NAME', 'ROCKET TYPE', 'LAUNCH YEAR'];

export default function Root() {
  const [selectedFilter, setSelectedFilter] = useState('MISSION NAME');
  const [modalVisible, setModalVisible] = useState(false);
  const [displayedRecords, setDisplayedRecords] = useState(5);
  const [visibleData, setVisibleData] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalPosition, setModalPosition] = useState<ModalPosition>({ top: 365, left: 10 });
  const filterIconRef = useRef<View>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const find = searchTerm ? { mission_name: { $regex: searchTerm } } : {};

  const { loading, error, data, refetch } = useQuery(GET_LAUNCHES_PAST, {
    variables: { order: 'desc', sort: 'launch_year', offset: 0, limit: 10, find },
    onError: (error) => {
      console.error('GraphQL Query Error:', error);
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error('Error fetching launches:', error.message);
    return <Text>Error: {error.message}</Text>;
  }
  
  if (!data || !data.launchesPast || data.launchesPast.length === 0) {
    return <Text>No data available.</Text>;
  }
  
  useEffect(() => {
    if (data && data.launchesPast) {
      const sortedData = sortData(data.launchesPast, sortOrder);
      const filteredData = extractData(sortedData, selectedFilter as FilterOption);
      setVisibleData(filteredData.slice(0, displayedRecords) as never[]);
    }
  }, [data, displayedRecords, selectedFilter, sortOrder]);
  
  const handleSearchInputChange = (text: string) => {
    setSearchTerm(text);
    refetch({
      find: { mission_name: { $regex: text } }
    });
  };

  // FILTERS SECTION 
  useEffect(() => {
    const filteredData = data ? extractData(data.launchesPast, selectedFilter as FilterOption) : [];
    setVisibleData(filteredData.slice(0, displayedRecords) as never[]);
  }, [data, displayedRecords, selectedFilter]);
  
  const handleFilterSelect = (filterOption: string) => {
    setSelectedFilter(filterOption);
    setModalVisible(false);
  };
  
  // MODAL SELECTION SECTION
  const handleFilterIconOrBackdropPress = () => {
    if (filterIconRef.current) {
      filterIconRef.current.measure((fx, fy, width, height, px, py) => {
        // Place the modal right under the filer icon 
        const top = py + height + 10; 
        const left = px + width / 2 - 35; 
        setModalPosition({ top, left });
      });
    }
    setModalVisible(!modalVisible);
  };

  const extractData = (launches: LaunchType[], filter: FilterOption) => {
    switch (filter) {
      case 'ROCKET NAME':
        return launches.map((launch) => launch.rocket.rocket_name);
      case 'ROCKET TYPE':
        return launches.map((launch) => launch.rocket.rocket_type);
      case 'LAUNCH YEAR':
        return launches.map((launch) => launch.launch_year);
      default:
        return launches.map((launch) => launch.mission_name);
    }
  };

  // SORTING DATA SECTION
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data: LaunchType[], order: string) => {//Sorting by launch year as per README file. 
    return [...data].sort((a, b) => {
      if (order === 'asc') {
        return a.launch_year.localeCompare(b.launch_year);
      } else {
        return b.launch_year.localeCompare(a.launch_year);
      }
    });
  };

  //LOAD MORE SECTION
  const handleLoadMore = () => {
    const newDisplayedRecords = displayedRecords + 5;
    setDisplayedRecords(newDisplayedRecords);
    const newVisibleData = extractData(data.launchesPast, selectedFilter as FilterOption).slice(0, newDisplayedRecords);
    setVisibleData(newVisibleData);
  };
  
  const totalRecords = data && data.launchesPast ? data.launchesPast.length : 0;

  
  return (<>
    <SafeAreaView style={styles.container}>
      <RootHeader/>
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchInputChange} />
      <FilterSortRow
        selectedFilter={selectedFilter}
        toggleSortOrder={toggleSortOrder}
        handleFilterIconOrBackdropPress={handleFilterIconOrBackdropPress}
      />
      <FilterModal
        modalVisible={modalVisible}
        handleFilterIconOrBackdropPress={handleFilterIconOrBackdropPress}
        handleFilterSelect={handleFilterSelect}
        modalPosition={modalPosition}
        filterOptions={filterOptions}
      />
      <LaunchList 
        data={visibleData} 
        selectedItemId={selectedItemId} 
        setSelectedItemId={setSelectedItemId} 
        selectedFilter={selectedFilter} 
      />
      <LoadMore 
        handleLoadMore={handleLoadMore} 
        displayedRecords={displayedRecords} 
        totalRecords={totalRecords} 
      />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
  },
  
});


