import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot , Stack } from 'expo-router';
import './globals.css';
const Rootlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      <Stack.Screen name="(auth)" options={{ headerShown: false }} /> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      <Stack.Screen name="[city]" options={{ headerShown: false}}/>
      <Stack.Screen name="fullImageScreen" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default Rootlayout
