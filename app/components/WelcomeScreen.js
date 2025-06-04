import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";

const { width: screenWidth } = Dimensions.get("window");

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 526;

const calculatedHeight = (DESIGN_HEIGHT / DESIGN_WIDTH) * screenWidth;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Group1.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <Image
        source={require("../../assets/images/Page.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <SignInButton onPress={() => navigation.navigate("SignIn")} />
      <SignUpButton onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  background: {
    position: "absolute",
    width: screenWidth,
    height: calculatedHeight,
    top: 0,
  },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, color: "#fff", marginBottom: 30 },
});

export default WelcomeScreen;
