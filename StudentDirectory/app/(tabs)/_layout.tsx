// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D9488",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#F1F5F9" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Routable but hidden from the tab bar */}
      <Tabs.Screen
        name="add-student"
        options={{
          title: "Add Student",
          href: null,
          headerShown: true,
          headerTitle: "Join the Directory",
          headerStyle: { backgroundColor: "#0D1F4E" },
          headerTintColor: "#FFFFFF",
        }}
      />
    </Tabs>
  );
}
