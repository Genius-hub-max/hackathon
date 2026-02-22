import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export default function App() {
  const [drugData, setDrugData] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadPrescription(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        uploadPrescription(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permission needed', 'Camera permission is required to scan prescriptions');
    }
  };

  const uploadPrescription = async (uri) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'prescription.jpg',
      });

      const ocrResponse = await axios.post(`${API_URL}/ocr/extract`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (ocrResponse.data.success) {
        const parseResponse = await axios.post(`${API_URL}/drugs/parse`, ocrResponse.data.data);
        
        if (parseResponse.data.success) {
          setDrugData(parseResponse.data.data);
          fetchPrices(parseResponse.data.data.generic_name);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process prescription');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (drugName) => {
    try {
      const response = await axios.get(`${API_URL}/prices/compare`, {
        params: { drug_name: drugName },
      });
      
      if (response.data.success) {
        setPrices(response.data.data.prices);
      }
    } catch (error) {
      console.error('Price fetch failed:', error);
    }
  };

  const openNavigation = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    // Use Linking.openURL(url) in production
    Alert.alert('Navigation', `Opening maps to: ${lat}, ${lng}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Processing prescription...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!drugData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>💊 MedFinder</Text>
          <Text style={styles.tagline}>Save on Prescriptions</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Scan Your Prescription</Text>
          <Text style={styles.subtitle}>Compare prices in under 2 minutes</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>📷 Scan Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
            <Text style={styles.secondaryButtonText}>📁 Upload from Gallery</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>💊 MedFinder</Text>
        <TouchableOpacity onPress={() => { setDrugData(null); setPrices([]); }}>
          <Text style={styles.backButton}>← New Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.drugCard}>
          <Text style={styles.cardTitle}>Prescription Details</Text>
          <Text style={styles.drugName}>{drugData.generic_name}</Text>
          <Text style={styles.drugBrand}>Brand: {drugData.brand_name}</Text>
          {drugData.strength && <Text style={styles.drugInfo}>Strength: {drugData.strength}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Price Comparison</Text>

        {prices.map((price, idx) => (
          <View key={price.pharmacy_id} style={[styles.priceCard, idx === 0 && styles.bestPrice]}>
            <View style={styles.priceHeader}>
              <View>
                <Text style={styles.pharmacyName}>{price.pharmacy_name}</Text>
                <Text style={styles.distance}>📍 {price.distance} mi away</Text>
                <Text style={styles.stock}>
                  {price.stock_status === 'in_stock' ? '✓ In Stock' : '⚠ Low Stock'}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${price.generic_price.toFixed(2)}</Text>
                {price.brand_price && (
                  <Text style={styles.brandPrice}>${price.brand_price.toFixed(2)}</Text>
                )}
                <Text style={styles.savings}>Save {price.savings_percent}%</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => openNavigation(price.lat, price.lng)}
            >
              <Text style={styles.navigateButtonText}>Navigate to Pharmacy →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1890ff',
  },
  tagline: {
    fontSize: 14,
    color: '#64748b',
  },
  backButton: {
    color: '#1890ff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 40,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#1890ff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
  },
  secondaryButtonText: {
    color: '#1e293b',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
  },
  scrollView: {
    flex: 1,
  },
  drugCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  drugName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  drugBrand: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  drugInfo: {
    fontSize: 14,
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  priceCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  bestPrice: {
    borderColor: '#52c41a',
    backgroundColor: '#f6ffed',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  stock: {
    fontSize: 14,
    color: '#52c41a',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#52c41a',
  },
  brandPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52c41a',
  },
  navigateButton: {
    backgroundColor: '#1890ff',
    paddingVertical: 12,
    borderRadius: 8,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
