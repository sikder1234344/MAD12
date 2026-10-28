// app/(tabs)/bookmarks.tsx
import { StyleSheet, Text, View } from "react-native";

export default function Bookmarks() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔖</Text>
      <Text style={styles.title}>Bookmarks</Text>
      <Text style={styles.message}>Saved students will appear here in a future week.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#F0F4F8" },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "700", color: "#0D1F4E", marginBottom: 6 },
  message: { fontSize: 14, color: "#64748B", textAlign: "center" },
});
