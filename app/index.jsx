import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/welcomeImage.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.textGroup}>
          <Text style={styles.welcomeText}>Welcome to Bosniae!</Text>
          <Text style={styles.descriptionText}>Explore Bosnia like never before.</Text>
        </View>
      </View>

  
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Explore.."
          onPress={() => router.push('/signin')}
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textGroup: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
