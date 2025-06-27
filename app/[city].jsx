import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const screenOptions = {
  headerShown: false,
};

const placesData = {
  sarajevo: [
    {
      name: 'Baščaršija',
      image: require('../assets/bascarsija.jpg'),
      description: 'Baščaršija is the historic heart of Sarajevo, filled with narrow stone alleys, artisan shops, mosques, and traditional restaurants serving ćevapi and burek.',
    },
    {
      name: 'Vijećnica',
      image: require('../assets/vijecnica.jpg'),
      description: 'Sarajevo City Hall is a stunning Austro-Hungarian building, originally a library, now a symbol of resilience and cultural heritage.',
    },
    {
      name: 'Tunnel of Hope',
      image: require('../assets/tunel_spasa.jpg'),
      description: 'A war-time tunnel used to smuggle food, medicine, and people into the besieged city during the 1990s. Now a moving museum about Sarajevo’s survival.',
    },
    {
      name: 'Avaz Twist Tower',
      image: require('../assets/avaz_tower.jpg'),
      description: 'The tallest building in Bosnia and Herzegovina, offering a panoramic viewpoint of the entire city from its top-floor observatory.',
    },
    {
      name: 'Yellow Fortress (Žuta Tabija)',
      image: require('../assets/zuta_tabija.jpg'),
      description: 'An old fortress offering one of the best sunset views over Sarajevo, especially beautiful during Ramadan with cannon fire at dusk.',
    },
  ],
  mostar: [
    {
      name: 'Old Bridge (Stari Most)',
      image: require('../assets/mostar_bridge.jpg'),
      description: 'A 16th-century Ottoman bridge and UNESCO site that connects two sides of the city. Famous for local divers who leap into the river below.',
    },
    {
      name: 'Kravice Waterfalls',
      image: require('../assets/kravice.jpg'),
      description: 'A breathtaking natural wonder with cascading waterfalls surrounded by lush greenery—ideal for swimming, picnics, and nature photography.',
    },
    {
      name: 'Blagaj Tekija',
      image: require('../assets/blagaj.jpg'),
      description: 'A serene Dervish monastery built at the source of the Buna River, blending Islamic mysticism with stunning natural scenery.',
    },
    {
      name: 'Mostar Bazaar',
      image: require('../assets/mostar_bazar.jpg'),
      description: 'A bustling old town market with handmade crafts, copperware, souvenirs, and traditional food tucked along cobbled streets.',
    },
    {
      name: 'Partisan Memorial Cemetery',
      image: require('../assets/partizansko.jpg'),
      description: 'A unique architectural monument dedicated to WWII anti-fascist fighters, surrounded by stone sculptures and overgrown greenery.',
    },
  ],
  travnik: [
    {
      name: 'Travnik Fortress',
      image: require('../assets/travnik_fortress.jpg'),
      description: 'A medieval castle perched above the city offering spectacular views, historical exhibits, and a glimpse into Bosnia’s feudal past.',
    },
    {
      name: 'Plava Voda (Blue Water)',
      image: require('../assets/plava_voda.jpg'),
      description: 'A crystal-clear stream flowing through a charming valley with traditional restaurants, beneath the fortress of Travnik.',
    },
    {
      name: 'Ivo Andrić Birth House',
      image: require('../assets/andric_house.jpg'),
      description: 'Museum dedicated to Nobel Prize-winning author Ivo Andrić, featuring personal items, photos, and stories from his life.',
    },
    {
      name: 'Colorful Mosque (Šarena džamija)',
      image: require('../assets/sarena_dzamija.jpg'),
      description: 'An Ottoman-era mosque known for its vividly painted wooden interior, geometric patterns, and colorful ceilings.',
    },
    {
      name: 'Regional Museum',
      image: require('../assets/zavicajni_muzej.jpg'),
      description: 'A small museum showcasing archaeology, folk culture, and local traditions from the Travnik region.',
    },
  ],
  zenica: [
    {
      name: 'Old Bazaar (Čaršija)',
      image: require('../assets/zenica_charshija.jpg'),
      description: 'The historic city center with Ottoman-style shops, cafés, and a peaceful atmosphere reflecting Zenica’s rich heritage.',
    },
    {
      name: 'Zenica City Museum',
      image: require('../assets/zenica_museum.jpg'),
      description: 'A museum exploring the city’s industrial development, war history, and cultural legacy through various exhibits.',
    },
    {
      name: 'Kamberovića Polje',
      image: require('../assets/kamberovica.jpg'),
      description: 'A large urban park perfect for family outings, sports, festivals, and walks by the Bosna River.',
    },
    {
      name: 'Arena Zenica',
      image: require('../assets/arena_zenica.jpg'),
      description: 'A modern multipurpose sports and concert venue, home to Bosnia’s national basketball team and popular music events.',
    },
    {
      name: 'Smetovi Recreation Area',
      image: require('../assets/smetovi.jpg'),
      description: 'A nearby mountain resort offering hiking trails, winter sports, and scenic views, just a short drive from the city.',
    },
  ],
  banjaluka: [
    {
      name: 'Kastel Fortress',
      image: require('../assets/kastel.jpg'),
      description: 'A historic riverside fortress and cultural venue, dating back to Roman times and often used for festivals and open-air events.',
    },
    {
      name: 'Ferhadija Mosque',
      image: require('../assets/ferhadija.jpg'),
      description: 'An architectural jewel rebuilt after the war, this Ottoman mosque is a spiritual and cultural icon in Banja Luka.',
    },
    {
      name: 'Banj Brdo (Šehitluci)',
      image: require('../assets/banj_brdo.jpg'),
      description: 'A popular hilltop with a large WWII monument and panoramic views over the city, ideal for hiking or a relaxing cable car ride.',
    },
    {
      name: 'Gospodska Street',
      image: require('../assets/gospodska.jpg'),
      description: 'The main pedestrian street with shops, cafés, and 20th-century architecture—perfect for a relaxed afternoon stroll.',
    },
    {
      name: 'Gomionica Monastery',
      image: require('../assets/gomionica.jpg'),
      description: 'A peaceful 14th-century Orthodox monastery surrounded by forests, known for its spiritual atmosphere and cultural importance.',
    },
  ],
};


export default function CityScreen() {
  const { city } = useLocalSearchParams();
  const router = useRouter();

  const cityKey = city?.toLowerCase();
  const places = placesData[cityKey] || [];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/home')}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Home</Text>
      </TouchableOpacity>

      <Text style={styles.header}>
        Places to Visit in {cityKey?.charAt(0).toUpperCase() + cityKey?.slice(1)}
      </Text>

      <FlatList
        data={places}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/fullImageScreen',
                  params: {
                    image: Image.resolveAssetSource(item.image).uri,
                  },
                })
              }
            >
              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backButton: { marginBottom: 24 },
  backButtonText: { fontSize: 16, color: '#007AFF' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { marginBottom: 16, backgroundColor: '#f0f0f0', borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: 250 },
  name: { fontSize: 20, fontWeight: 'bold', padding: 10 },
  desc: { fontSize: 14, color: '#444', paddingHorizontal: 10, paddingBottom: 10 },
});