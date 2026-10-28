// app/_layout.tsx
import { Stack } from "expo-router";
import { StudentsProvider } from "../context/students-context";

export default function RootLayout() {
  // StudentsProvider wraps the whole app so every screen can call useStudents()
  return (
    <StudentsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StudentsProvider>
  );
}
