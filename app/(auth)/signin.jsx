import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { signIn } from '../../lib/appwrite';

export default function SignIn() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all information');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Signing in with:', form.email);
      await signIn(form.email, form.password);
      console.log('Sign-in success, navigating to home...');
      router.replace('/home'); 
    } catch (error) {
      console.log('Sign-in failed:', error);
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/welcomeImage.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Sign In</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title={isSubmitting ? 'Signing In...' : 'Sign In'}
            onPress={submit}
            disabled={isSubmitting}
          />

          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Link href="/signup" style={styles.signUpLink}>
              Sign up
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: 'yellow',
    fontWeight: 'bold',
  },
});
