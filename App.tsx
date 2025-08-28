import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, View, Text, Pressable, Alert, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';


const PUBLIC_URL = "https://e39298c09317.ngrok-free.app";

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedCity, setCity] = useState('0');
  const [getCities, setCities] = React.useState<{ id: number; name: string }[]>(
    []
  );

  const [getFullName, setFullName] = React.useState("");
  const [getUsername, setUsername] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPassword, setPassword] = React.useState("");
  const [getConfirmPassword, setConfirmPassword] = React.useState("");


  useEffect(() => {
    const loadCities = async () => {
      const response = await fetch(PUBLIC_URL + "/Notebook/loadCities");

      if (response.ok) {
        const json = await response.json();
        setCities(json.cityList);
        console.log(json.cityList);
      } else {
        console.error("City Data loading Failed");
      }
    };

    loadCities();
  }, []);

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
          <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 0}
    >
    <AlertNotificationRoot>
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
            <TextInput placeholder='Enter Your Full Name' style={styles.input} onChangeText={setFullName} value={getFullName} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username :</Text>
            <TextInput placeholder='Enter Your Username' style={styles.input} onChangeText={setUsername} value={getUsername} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address:</Text>
            <TextInput placeholder='Enter Your Email Address' inputMode='email' keyboardType='email-address' style={styles.input} onChangeText={setEmail} value={getEmail} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password :</Text>
            <TextInput placeholder='Enter Your PassWord' style={styles.input} secureTextEntry onChangeText={setPassword} value={getPassword} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password :</Text>
            <TextInput placeholder='Confirm Your PassWord' style={styles.input} secureTextEntry onChangeText={setConfirmPassword} value={getConfirmPassword} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select City:</Text>
            <View style={styles.cityselect}>
              <Picker selectedValue={selectedCity} style={styles.cityPicker}
                onValueChange={(itemValue) => setCity(itemValue)}>
                <Picker.Item label='Select Your City' value={0} />
                {getCities.map((city) => (
                  <Picker.Item key={city.id} label={city.name} value={city.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttonContainer}>

            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>

            <Pressable style={styles.saveButton} onPress={async () => {
              // if (!getFullName || !getUsername || !getEmail || !getPassword ||
              //   !getConfirmPassword || image == null || !selectedCity) {
              //   Toast.show({
              //     type: ALERT_TYPE.WARNING,
              //     title: 'Warning',
              //     textBody: 'Please Fill required Data',
              //   });
              //   return;
              // }

              let formData = new FormData();
              formData.append("fullname", getFullName);
              formData.append("username", getUsername);
              formData.append("email", getEmail);
              formData.append("password", getPassword);
              formData.append("confirmPassword", getConfirmPassword);
              formData.append("city", selectedCity);

              if (image) {
                formData.append("profileImage", {
                  uri: image,
                  name: "profile.jpg",
                  type: "image/jpeg"
                } as any);
              }
              const response = await fetch(PUBLIC_URL + "/Notebook/CreateNewAccount",
                {
                  method: "POST",
                  body: formData,
                  headers: {
                    "Content-Type": "multipart/form-data"
                  },
                }
              );
              if (response.ok) {
                const json = await response.json();
                if (json.status) {

                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Congrats! Account Created Succssfully',
                  });

                  setImage(null);
                  setFullName("");
                  setUsername("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setCity("0");

                } else {

                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Warning',
                    textBody: json.message,
                  });
                }
              } else {
                Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Warning',
                  textBody: 'Something went worng. Account creation Failed !',
                });
              }
            }
            }>
              <Text style={styles.saveButtonText}>SIGN UP NOW</Text>
            </Pressable>

          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>      
    </AlertNotificationRoot>
    </KeyboardAvoidingView>
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
  },

  cityselect: {
    borderWidth: 1,
    borderColor: "#042574ee",
    borderRadius: 12,
    backgroundColor: "#ffffff81",

  },

  cityPicker: {
    height: 50,
    color: "#042574ee",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  backButton: {
    flex: 0.45,
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0a89ff",
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a89ff",
  },

  saveButton: {
    flex: 0.5,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0a89ff",
    backgroundColor: "#0a89ff",
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5f5f5ee",

  },



});
