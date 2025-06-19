import { View, Text , StyleSheet} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.aida}> AIDA ZENA MOJA VOLJENA</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  aida: {
    color: 'red',
    font: 'bold',
    fontSize: 20,
    
  }
  
});