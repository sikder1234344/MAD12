// components/student-detail.tsx
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useStudents } from "../context/students-context";
import { Student } from "../data/students";

interface StudentDetailProps {
  student: Student;
}

export default function StudentDetail({ student }: StudentDetailProps) {
  const { dispatch } = useStudents();

  const handleRemove = () => {
    Alert.alert(
      "Remove Student",
      `Remove ${student.name} from the directory?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch({ type: "REMOVE_STUDENT", payload: student.id }),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.department}>{student.department}</Text>
      <Text style={styles.idBadge}>ID: {student.studentId}</Text>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>About</Text>
      <Text style={styles.bio}>{student.bio}</Text>

      <Text style={styles.sectionLabel}>Skills</Text>
      <View style={styles.skillsRow}>
        {student.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.removeText}>Remove from Directory</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#0D1F4E" },
  department: { fontSize: 13, color: "#0D9488", marginTop: 2 },
  idBadge: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 14 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  bio: { fontSize: 14, color: "#334155", lineHeight: 20, marginBottom: 14 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillBadge: {
    backgroundColor: "#E1F5EE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillText: { fontSize: 12, color: "#0D9488", fontWeight: "600" },
  removeButton: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  removeText: { color: "#EF4444", fontSize: 13, fontWeight: "600" },
});
