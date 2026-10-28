// app/(tabs)/index.tsx — Home screen (Week 5 refactor + Week 5 lab task)
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { useStudents } from "../../context/students-context";
import { Student } from "../../data/students";

export default function Index() {
  // Global list + dispatch from the context
  const { students, dispatch } = useStudents();

  // Screen-only state stays local
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Derive the selected student from the global list. If that student is
  // removed, this becomes null automatically and the detail card closes.
  const selectedStudent = students.find((s) => s.id === selectedId) ?? null;

  const q = query.toLowerCase();
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
  );

  const handleSelect = (student: Student) => {
    setSelectedId((prev) => (prev === student.id ? null : student.id));
  };

  // Lab Task Feature 1 — confirm before dispatching RESET
  const handleReset = () => {
    Alert.alert(
      "Reset Directory",
      "Restore the original student list? Students you added will be removed.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => dispatch({ type: "RESET" }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        {/* Lab Task Feature 2 — count derived during render, not stored */}
        <Text style={styles.title} numberOfLines={1}>
          Student Directory ({students.length})
        </Text>
        <View style={styles.actions}>
          <Pressable style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/(tabs)/add-student")}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={handleSelect}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No students match "{query}"</Text>
          </View>
        }
      />

      {selectedStudent && <StudentDetail student={selectedStudent} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  title: { flexShrink: 1, fontSize: 18, fontWeight: "bold", color: "#FFFFFF", marginRight: 8 },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  resetButton: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resetButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 13 },
  addButton: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#94A3B8" },
});
