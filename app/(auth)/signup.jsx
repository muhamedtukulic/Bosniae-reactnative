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
import { createUser } from '../../lib/appwrite';

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all informations');
      return; 
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
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
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
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
            title={isSubmitting ? 'Submitting...' : 'Sign Up'}
            onPress={submit}
            disabled={isSubmitting}
          />

          <Text style={styles.signInText}>
            Have an account?{' '}
            <Link href="/signin" style={styles.signInLink}>
              Sign in
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
  signInText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: 'yellow',
    fontWeight: 'bold',
  },
});
