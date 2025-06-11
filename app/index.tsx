import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const DESIGN_BASE_WIDTH = 337;
const DESIGN_BASE_HEIGHT = 367;
const adjustedHeight = DEVICE_HEIGHT - 475;
const scaleRatio = adjustedHeight / DESIGN_BASE_HEIGHT;
const adjustedWidth = DESIGN_BASE_WIDTH * scaleRatio;

interface SlideData {
  id: string;
  imageSrc: ImageSourcePropType;
  heading: string;
  subtext: string;
  progressIndicator: ImageSourcePropType;
}

const slideContent: SlideData[] = [
  {
    id: "slide1",
    imageSrc: require("../assets/images/saveMoney.png"),
    heading: "Save your money conveniently.",
    subtext: "Get 5% cash back for each transaction and spend it easily.",
    progressIndicator: require("../assets/images/Indicator1.png"),
  },
  {
    id: "slide2",
    imageSrc: require("../assets/images/secure.png"),
    heading: "Secure your money for free and get rewards.",
    subtext: "Get the most secure payment app ever and enjoy it.",
    progressIndicator: require("../assets/images/Indicator2.png"),
  },
  {
    id: "slide3",
    imageSrc: require("../assets/images/trading.png"),
    heading: "Enjoy commission-free stock trading.",
    subtext: "Online investing has never been easier than it is right now.",
    progressIndicator: require("../assets/images/Indicator3.png"),
  },
];

const OnboardingScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  let scrollRef = React.useRef<ScrollView>(null);

  const proceedToNext = useCallback(() => {
    if (activeSlide < slideContent.length - 1) {
      const nextSlide = activeSlide + 1;
      setActiveSlide(nextSlide);
      scrollRef.current?.scrollTo({
        x: nextSlide * DEVICE_WIDTH,
        animated: true,
      });
    } else {
      router.push("./login");
    }
  }, [activeSlide]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / DEVICE_WIDTH);
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
    }
  };

  const currentContent = slideContent[activeSlide];

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logoWithoutText.png")}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.slideContainer}
      >
        {slideContent.map((slide) => (
          <View key={slide.id} style={styles.slideItem}>
            <Image
              source={slide.imageSrc}
              style={[
                styles.slideImage,
                slide.id === "slide2" && styles.customSlideImage,
              ]}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.contentOverlay}>
        <View style={styles.contentBox}>
          <Image
            source={require("../assets/images/circle.png")}
            style={styles.backgroundCircle}
            resizeMode="contain"
          />

          <Animatable.View
            animation="fadeIn"
            duration={200}
            key={activeSlide}
            style={styles.textContainer}
          >
            <Text style={styles.titleText}>{currentContent.heading}</Text>
            <Text style={styles.descriptionText}>{currentContent.subtext}</Text>
            <Image
              source={currentContent.progressIndicator}
              style={styles.indicatorImage}
              resizeMode="contain"
            />
          </Animatable.View>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.buttonShadow,
              styles.buttonPosition,
              activeSlide === slideContent.length - 1 && styles.finalButton,
            ]}
            onPress={proceedToNext}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6075FF", "#1433FF"]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[
                styles.gradientBackground,
                activeSlide === slideContent.length - 1 && styles.finalGradient,
              ]}
            >
              <Text style={styles.buttonLabel}>
                {activeSlide === slideContent.length - 1 ? "Get Started" : "Next"}
              </Text>
              <Image
                source={require("../assets/images/whiteArrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/images/signInButton.png")}
                style={[
                  styles.decorativeIcon,
                  activeSlide === slideContent.length - 1 && styles.decorativeIconFinal,
                ]}
                resizeMode="cover"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 90,
  },
  logoImage: {
    width: 55,
    height: 53,
  },
  slideContainer: {
    height: 202,
    marginTop: 80,
  },
  slideItem: {
    width: DEVICE_WIDTH,
    alignItems: "center",
  },
  slideImage: {
    width: 280,
    height: 202,
  },
  customSlideImage: {
    width: 187,
    height: 202,
  },
  contentOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  contentBox: {
    position: "absolute",
    width: adjustedWidth,
    height: adjustedHeight,
    left: 0,
    bottom: 0,
  },
  backgroundCircle: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  titleText: {
    position: "absolute",
    left: 20,
    top: 65,
    maxWidth: 298,
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 36,
    color: "#2743FD",
  },
  descriptionText: {
    position: "absolute",
    left: 20,
    top: 163,
    maxWidth: 271,
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    color: "#2743FD",
  },
  indicatorImage: {
    position: "absolute",
    bottom: 60,
    left: 30,
    width: 40,
    height: 5,
  },
  actionButton: {
    width: 153,
    height: 64,
    borderRadius: 28,
    overflow: "hidden",
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  finalButton: {
    width: 189,
    height: 64,
  },
  finalGradient: {
    borderRadius: 28,
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
  decorativeIcon: {
    position: "absolute",
    top: 0,
    left: 75, // Position for smaller buttons (width: 153)
    width: 80,
    height: 55,
  },
  decorativeIconFinal: {
    position: "absolute",
    top: 0,
    left: 111, // Adjusted for larger button (width: 189)
    width: 80,
    height: 55,
  },
  buttonShadow: {
    shadowColor: "#1433FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonPosition: {
    position: "absolute",
    right: -15,
    bottom: 30,
  },
});

export default OnboardingScreen;