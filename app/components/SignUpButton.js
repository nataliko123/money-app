import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SignUpButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
        <Image
          source={require("../../assets/images/Group2.png")}
          style={styles.arrow}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 785,
    left: 39,
  },
  button: {
    width: 315,
    height: 72,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#6075FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#1433FF",
    fontSize: 16,
    fontWeight: "500",
  },
  arrow: {
    width: 144,
    height: 60,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default SignUpButton;
