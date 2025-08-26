import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, View, Text, Pressable, Alert, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Create New Account</Text>
        <Text style={styles.subTitle}>Fill in the information below to create your Account.</Text>
      </View>

      <View>
        <View style={styles.imageContainer}>
          <Pressable onPress={pickImage} style={styles.imageUploader}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>+</Text>
                <Text style={styles.imageLable}>Add Image</Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name :</Text>
          <TextInput placeholder='Enter Your Full Name' style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username :</Text>
          <TextInput placeholder='Enter Your Username' style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address:</Text>
          <TextInput placeholder='Enter Your Email Address' inputMode='email' keyboardType='email-address' style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password :</Text>
          <TextInput placeholder='Enter Your PassWord' style={styles.input} secureTextEntry />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password :</Text>
          <TextInput placeholder='Confirm Your PassWord' style={styles.input} secureTextEntry />
        </View>

        

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffffad',
  },

  scrollContent: {
    flexGrow: 1,
    padding: 26,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#051946ee",
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#051946ee",
    marginBottom: 10,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  imageUploader: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#dfdfdfdc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#051946ee",
    borderStyle: "dashed",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#051946ee",
    borderStyle: "dashed",
  },

  imagePlaceholder: {
    alignItems: "center",
  },

  imageText: {
    fontSize: 35,
    color: "#051946ee",
  },

  imageLable: {
    fontSize: 14,
    color: "#051946ee",
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#032983ee",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#042574ee",
    borderRadius: 12,
    color: "#042574ee",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff81",
  }

});
