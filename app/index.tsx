import { Text, View } from "react-native";
import WelcomeScreen from "./components/WelcomeScreen";

export default function Index({ navigation }: { navigation: any }) {
  return <WelcomeScreen navigation={navigation} />;
}