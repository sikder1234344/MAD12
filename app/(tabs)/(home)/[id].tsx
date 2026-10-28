// app/(tabs)/(home)/[id].tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    CATEGORY_COLOURS,
    DEFAULT_COLOUR,
} from "../../../components/article-card";
import { ARTICLES } from "../../../data/articles";

type ArticleParams = { id: string };

export default function ArticleDetail() {
  const { id } = useLocalSearchParams<ArticleParams>();
  const navigation = useNavigation();
  const article = ARTICLES.find((a) => a.id === id);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Update the Stack header (title + bookmark button) once we have the article
  useEffect(() => {
    if (!article) return;
    navigation.setOptions({
      title: article.title,
      headerRight: () => (
        <Pressable onPress={() => setBookmarked((prev) => !prev)} hitSlop={10}>
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={24}
            color="#FFFFFF"
          />
        </Pressable>
      ),
    });
  }, [article, bookmarked]);

  if (!article) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Article not found.</Text>
      </View>
    );
  }

  const colour = CATEGORY_COLOURS[article.category] ?? DEFAULT_COLOUR;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.badge, { backgroundColor: colour.bg }]}>
          <Text style={[styles.badgeText, { color: colour.text }]}>
            {article.category}
          </Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.author}>{article.author}</Text>
          <Text style={styles.date}>{article.date}</Text>
        </View>
        <View style={styles.divider} />
        {article.body.split("\n\n").map((para, i) => (
          <Text key={i} style={styles.body}>
            {para}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { padding: 20, paddingBottom: 48 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  badgeText: { fontSize: 12, fontWeight: "600" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0D1F4E",
    lineHeight: 30,
    marginBottom: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  author: { fontSize: 13, color: "#64748B", fontStyle: "italic" },
  date: { fontSize: 13, color: "#94A3B8" },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 20 },
  body: { fontSize: 15, color: "#334155", lineHeight: 24, marginBottom: 16 },
  notFound: { padding: 40, textAlign: "center", color: "#94A3B8" },
});
