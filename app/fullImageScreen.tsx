import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function FullImageScreen() {
  const { image } = useLocalSearchParams<{ image: string }>();
  const router = useRouter();

  if (!image) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>No image provided</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: 'white', marginTop: 20 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '100%', height: '100%' },
  closeButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  closeText: { fontSize: 30, color: '#fff' },
});
