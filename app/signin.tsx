import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMG_WIDTH = SCREEN_WIDTH - 20;
const IMG_HEIGHT = IMG_WIDTH * (397 / 497);

// Main component for the sign-in screen
export default function SignInScreen() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Validate email format
    const validateEmail = (email: string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView
                style={styles.safeContainer}
                edges={["right", "bottom", "left"]}
            >
                <StatusBar hidden />
                <Stack.Screen options={{ headerShown: false }} />

                {/* Background decorative image */}
                <View style={styles.bgImageContainer}>
                    <Image
                        source={require("../assets/images/threeCircle.png")}
                        resizeMode="contain"
                        style={styles.bgImage}
                    />
                </View>

                {/* Logo and welcome text */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/images/whiteLogo.png")}
                        resizeMode="cover"
                        style={styles.logoImage}
                    />
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                </View>

                {/* Form with keyboard handling */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.formFlex}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -250}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>Log In</Text>

                            {/* Email input field */}
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    label="Email"
                                    value={userEmail}
                                    onChangeText={setUserEmail}
                                    mode="flat"
                                    keyboardType="email-address"
                                    style={styles.textInput}
                                    underlineColor={
                                        hasSubmitted && !validateEmail(userEmail)
                                            ? "#FD2727"
                                            : "#6075FF"
                                    }
                                    activeUnderlineColor={
                                        hasSubmitted && !validateEmail(userEmail)
                                            ? "#FD2727"
                                            : "#B9B9B9"
                                    }
                                    placeholderTextColor={
                                        hasSubmitted && !validateEmail(userEmail)
                                            ? "#FD2727"
                                            : "#757575"
                                    }
                                    contentStyle={styles.inputContent}
                                    underlineStyle={styles.inputUnderline}
                                    selectionColor="#1433FF"
                                    right={
                                        userEmail.length > 2 &&
                                        userEmail.includes("@") &&
                                        validateEmail(userEmail) ? (
                                            <TextInput.Icon
                                                icon={() => (
                                                    <Image
                                                        source={require("../assets/images/checkmark.png")}
                                                        style={styles.validIcon}
                                                    />
                                                )}
                                            />
                                        ) : null
                                    }
                                />
                                {hasSubmitted && !validateEmail(userEmail) && (
                                    <Text style={styles.validationError}>
                                        Invalid email format.
                                    </Text>
                                )}
                            </View>

                            {/* Password input field */}
                            <TextInput
                                label="Password"
                                value={userPassword}
                                onChangeText={setUserPassword}
                                mode="flat"
                                style={styles.textInput}
                                keyboardType="default"
                                secureTextEntry={!isPasswordVisible}
                                underlineColor="#6075FF"
                                activeUnderlineColor="#B9B9B9"
                                contentStyle={styles.inputContent}
                                underlineStyle={styles.inputUnderline}
                                selectionColor="#1433FF"
                                right={
                                    userPassword.length > 0 ? (
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={
                                                        isPasswordVisible
                                                            ? require("../assets/images/show.png")
                                                            : require("../assets/images/eye.png")
                                                    }
                                                    style={
                                                        isPasswordVisible
                                                            ? styles.showPasswordIcon
                                                            : styles.hidePasswordIcon
                                                    }
                                                />
                                            )}
                                            onPress={() =>
                                                setIsPasswordVisible(!isPasswordVisible)
                                            }
                                        />
                                    ) : null
                                }
                            />

                            <Text style={styles.resetPasswordLink}>
                                Forgot Password?
                            </Text>

                            {/* Login button */}
                            <TouchableOpacity
                                style={[styles.submitButton, styles.buttonShadow]}
                                onPress={() => setHasSubmitted(true)}
                            >
                                <LinearGradient
                                    colors={["#6075FF", "#1433FF"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonLabel}>Log In</Text>
                                    <Image
                                        source={require("../assets/images/whiteArrow.png")}
                                        resizeMode="contain"
                                        style={styles.arrowIcon}
                                    />
                                    <Image
                                        source={require("../assets/images/signInButton.png")}
                                        resizeMode="cover"
                                        style={styles.buttonOverlay}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    bgImageContainer: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    bgImage: {
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
    },
    logoContainer: {
        position: "absolute",
        top: 65,
        left: 50,
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    welcomeText: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "400",
        fontFamily: "Montserrat",
        maxWidth: 140,
        marginTop: 15,
    },
    formContainer: {
        alignItems: "center",
        paddingHorizontal: 30,
        paddingBottom: 70,
    },
    formFlex: {
        flex: 1,
    },
    textInput: {
        width: "100%",
        backgroundColor: "transparent",
        fontSize: 16,
    },
    inputWrapper: {
        width: "100%",
    },
    formTitle: {
        color: "#3A3A3A",
        fontSize: 28,
        fontWeight: "700",
        fontFamily: "Montserrat",
        marginBottom: 45,
        alignSelf: "flex-start",
    },
    resetPasswordLink: {
        color: "#2B47FC",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: "Montserrat",
        marginTop: 20,
        alignSelf: "flex-start",
    },
    submitButton: {
        marginTop: 90,
        width: 320,
        height: 70,
        borderRadius: 28,
        overflow: "hidden",
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
    buttonOverlay: {
        position: "absolute",
        top: 0,
        left: 190,
        width: 130,
        height: 55,
    },
    buttonShadow: {
        shadowColor: "#1433FF",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 7,
    },
    validIcon: {
        width: 18,
        height: 14,
        marginRight: 10,
    },
    hidePasswordIcon: {
        width: 18,
        height: 12,
        marginRight: 10,
    },
    showPasswordIcon: {
        width: 18,
        height: 16,
        marginRight: 10,
    },
    validationError: {
        color: "#FD2727",
        fontSize: 12,
        fontFamily: "Montserrat",
        marginTop: 5,
        marginLeft: 5,
    },
    inputContent: {
        paddingVertical: 10,
    },
    inputUnderline: {
        backgroundColor: "#6075FF",
    },
});