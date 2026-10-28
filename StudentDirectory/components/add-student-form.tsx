// components/add-student-form.tsx
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useStudents } from "../context/students-context";
import { Student } from "../data/students";
import FormField from "./form-field";

// Shape of the form's own state — skillsText is split into an array on submit
interface FormData {
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skillsText: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  department?: string;
  bio?: string;
}

// Pure validation function — takes the form data and the existing
// students so it can detect duplicate IDs (Lab Task Feature 3).
function validateForm(data: FormData, existing: Student[]): FormErrors {
  const newErrors: FormErrors = {};

  // Name
  if (data.name.trim().length === 0) {
    newErrors.name = "Name is required.";
  } else if (data.name.trim().length < 3) {
    newErrors.name = "Name must be at least 3 characters.";
  }

  // Student ID: required, format NN-NNNNN-N, and must be unique
  const id = data.studentId.trim();
  const idPattern = /^\d{2}-\d{5}-\d$/;
  if (id.length === 0) {
    newErrors.studentId = "Student ID is required.";
  } else if (!idPattern.test(id)) {
    newErrors.studentId = "Format must be NN-NNNNN-N (e.g. 22-12345-1).";
  } else if (existing.some((s) => s.studentId === id)) {
    newErrors.studentId = "Student ID already exists";
  }

  // Department
  if (data.department.trim().length === 0) {
    newErrors.department = "Department is required.";
  }

  // Bio
  if (data.bio.trim().length === 0) {
    newErrors.bio = "Bio is required.";
  } else if (data.bio.trim().length < 10) {
    newErrors.bio = "Bio must be at least 10 characters.";
  }

  // Skills are optional — no rule
  return newErrors;
}

export default function AddStudentForm() {
  // Global list + dispatch from context (no onSubmitSuccess prop anymore)
  const { students, dispatch } = useStudents();

  // Combined state for the five text fields
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    department: "",
    bio: "",
    skillsText: "",
  });

  // Separate state — unrelated to field values
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Show an error only after the field was touched or Submit was attempted
  const getFieldError = (field: keyof FormErrors) =>
    touched[field] || submitAttempted ? errors[field] : undefined;

  // Live validation — re-runs on every keystroke, and when the list changes
  useEffect(() => {
    setErrors(validateForm(formData, students));
  }, [formData, students]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name.trim().length > 0 &&
    formData.studentId.trim().length > 0 &&
    formData.department.trim().length > 0 &&
    formData.bio.trim().length > 0;

  // Fake async submit with cleanup
  useEffect(() => {
    if (!submitTrigger) return;

    const timeoutId = setTimeout(() => {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        skills: formData.skillsText
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        avatarUrl: "https://i.pravatar.cc/150?u=" + Date.now(),
      };

      setIsSubmitting(false);
      setSubmitTrigger(false);
      dispatch({ type: "ADD_STUDENT", payload: newStudent });
      router.back();
    }, 1500);

    // Cancel the pending submit if the user leaves the screen mid-submit
    return () => clearTimeout(timeoutId);
  }, [submitTrigger]);

  const handleSubmitPress = () => {
    // Reveal every remaining error, even on fields the user never touched
    setTouched((prev) => ({
      ...prev,
      name: true,
      studentId: true,
      department: true,
      bio: true,
    }));
    setSubmitAttempted(true);

    // Duplicate IDs and any other rule failure block the submit here
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitTrigger(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Join the Directory</Text>
      <Text style={styles.subheading}>
        Fill in your details below to add yourself to StudentDirectory.
      </Text>

      <FormField
        label="Full Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        onBlur={() => markTouched("name")}
        placeholder="e.g. Ashraful Haque"
        error={getFieldError("name")}
      />

      <FormField
        label="Student ID"
        value={formData.studentId}
        onChangeText={(text) => updateField("studentId", text)}
        onBlur={() => markTouched("studentId")}
        placeholder="e.g. 22-12345-1"
        autoCapitalize="none"
        error={getFieldError("studentId")}
      />

      <FormField
        label="Department"
        value={formData.department}
        onChangeText={(text) => updateField("department", text)}
        onBlur={() => markTouched("department")}
        placeholder="e.g. Computer Science"
        error={getFieldError("department")}
      />

      <FormField
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => updateField("bio", text)}
        onBlur={() => markTouched("bio")}
        placeholder="A short sentence about yourself..."
        multiline
        error={getFieldError("bio")}
      />

      {/* Skills has no validation rule, so no error prop */}
      <FormField
        label="Skills (comma-separated)"
        value={formData.skillsText}
        onChangeText={(text) => updateField("skillsText", text)}
        placeholder="e.g. React Native, TypeScript, Figma"
        autoCapitalize="none"
      />

      <Pressable
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmitPress}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Join Directory</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { padding: 20 },
  heading: { fontSize: 20, fontWeight: "800", color: "#0D1F4E", marginBottom: 4 },
  subheading: { fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 19 },
  button: {
    backgroundColor: "#0D9488",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  buttonDisabled: { backgroundColor: "#CBD5E1" },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
