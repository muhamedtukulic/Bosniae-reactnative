import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

const cities = [
  {
    name: 'Sarajevo',
    image: require('../../assets/sarajevo.jpg'),
    description: 'The heart of Bosnia, rich in history and culture.',
  },
  {
    name: 'Mostar',
    image: require('../../assets/mostar.jpg'),
    description: 'Famous for its iconic Old Bridge and scenic beauty.',
  },
  {
    name: 'Travnik',
    image: require('../../assets/travnik.jpg'),
    description: 'Ottoman-era town with rich tradition.',
  },
  {
    name: 'Zenica',
    image: require('../../assets/zenica.jpg'),
    description: 'Industrial hub with charming surroundings.',
  },
  {
    name: 'Banjaluka',
    image: require('../../assets/banjaluka.jpg'),
    description: 'Green city with rivers and historical landmarks.',
  },
];

const Home = () => {
  const router = useRouter();

  const renderCityCard = ({ item }) => (
    <TouchableOpacity
      
      onPress={() => router.push(`/${item.name.toLowerCase()}`)}

      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={cities}
        renderItem={renderCityCard}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#000',
  },
  desc: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#333',
  },
});
