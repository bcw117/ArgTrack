import { StyleSheet, Pressable, Image } from "react-native";

export default function BackButton({ navigation }) {
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/backward-arrow.png")}
        style={{ width: 35, height: 35 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    top: "8%",
    marginLeft: 25,
    position: "absolute",
  },
});
