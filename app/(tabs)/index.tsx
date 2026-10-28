// app/(tabs)/index.tsx
import ArticleCard from "@/components/article-card";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ArticleCard
        article={{
          id: "1",
          title:
            "The Future of AI: How Artificial Intelligence is Transforming Industries",
          author: "John Doe",
          summary:
            "Artificial Intelligence (AI) is rapidly changing the way we live and work. From healthcare to finance, AI is being used to improve efficiency, reduce costs, and enhance decision-making.",
          body: "Artificial Intelligence (AI) is rapidly changing the way we live and work.",
          category: "Tech",
          date: "2023-10-15",
        }}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}
