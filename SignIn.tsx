import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SafeAreaView } from "react-native-safe-area-context";

const PUBLIC_URL = "https://e39298c09317.ngrok-free.app";

export default function SignInScreen() {

    const [getEmail, setEmail] = React.useState("");
    const [getPassword, setPassword] = React.useState("");
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 10 : 0}
        >
            <AlertNotificationRoot>
                <SafeAreaView style={styles.area}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <StatusBar style="auto" />
                        <View>
                            <View style={styles.imageContainer}>
                                <Image style={styles.imagehere} source={require("./assets/user1.png")} />

                            </View>

                            <View style={styles.appname}>
                                <Text style={styles.appTitle}> Notebook</Text>
                                <Text style={styles.appSubtitle}> Welcome Back! , Please Sign in Your Account.</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Email Address:</Text>
                                <TextInput placeholder='Enter Your Email Address' inputMode='email' keyboardType='email-address' style={styles.input} onChangeText={setEmail} value={getEmail} />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Password :</Text>
                                <TextInput placeholder='Enter Your PassWord' style={styles.input} secureTextEntry onChangeText={setPassword} value={getPassword} />
                            </View>

                            <View style={styles.buttonArea}>
                                <Pressable style={styles.loginButton}
                                    onPress={async () => {
                                        try {
                                            const loginDetails = {
                                                email: getEmail,
                                                password: getPassword,
                                            };

                                            const loginJSON = JSON.stringify(loginDetails);

                                            const response = await fetch(PUBLIC_URL +"/Notebook/Signin", {
                                                method: "POST",
                                                body: loginJSON,
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            });

                                            if (response.ok) {
                                                const json = await response.json();
                                                if (json.status) {
                                                    Toast.show({
                                                        type: ALERT_TYPE.SUCCESS,
                                                        title: "Success",
                                                        textBody: "Congrats! Logged in successfully",
                                                    });
                                                } else {
                                                    Toast.show({
                                                        type: ALERT_TYPE.WARNING,
                                                        title: "Warning",
                                                        textBody: json.message || "Login failed",
                                                    });
                                                }
                                            } else {
                                                Toast.show({
                                                    type: ALERT_TYPE.DANGER,
                                                    title: "Error",
                                                    textBody: "Something went wrong. Please try again.",
                                                });
                                            }
                                        } catch {
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: "Network Error",
                                                textBody: "Somthing Went to Worng.. Login Failed ....",
                                            });
                                        }
                                    }}
                                >
                                    <Text style={styles.loginButtonText}>Login Now</Text>
                                </Pressable>
                            </View>

                            <View style={styles.buttonArea2}>
                                <Pressable style={styles.newButton}>
                                    <Text style={styles.newButtonText}>Create New Account</Text>
                                </Pressable>
                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </AlertNotificationRoot>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    area: {
        flex: 1,
        backgroundColor: '#ffffffad',
        justifyContent: "center",
    },

    container: {
        flexGrow: 1,
        padding: 26,
        alignContent: "center",
    },

    imageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },

    imagehere: {
        width: 120,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#0a89ff",
        borderStyle: "solid",
        borderRadius: 60,
        backgroundColor: "#0a89ff",
    },

    imageText: {
        fontWeight: "bold",
        color: "#f0f0f0ff",
        fontSize: 20,
    },

    appname: {
        alignItems: "center",
        marginBottom: 25,
    },

    appTitle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: "#051946ed",
        fontSize: 30,
        marginBottom: 5,
    },

    appSubtitle: {
        fontWeight: "semibold",
        color: "#0239a6",
        fontSize: 18,
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

    buttonArea: {
        marginTop: 6,
        marginBottom: 6,
    },

    buttonArea2: {
        marginTop: 6,
    },

    loginButton: {
        flex: 0.5,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#0a89ff",
        backgroundColor: "#0a89ff",
    },

    loginButtonText: {
        color: "#f5f5f5ee",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 20,
    },

    newButton: {
        flex: 0.5,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#0a89ff",
    },

    newButtonText: {
        color: "#0a89ff",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 20,
    }
});
