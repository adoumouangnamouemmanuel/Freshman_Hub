import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FAQScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const faqs = [
    {
      question: "How do I register for classes?",
      answer:
        'You can register for classes through the student portal. Log in, navigate to "Course Registration," and follow the prompts to select your desired courses.',
    },
    {
      question: "What is the deadline for tuition payment?",
      answer:
        "Tuition payment deadlines vary by semester. Generally, payments are due before the start of classes. Check the academic calendar or contact the finance office for specific dates.",
    },
    {
      question: "How can I contact my academic advisor?",
      answer:
        "Your academic advisor's contact information can be found in your student portal. You can reach out to them via email or schedule an appointment through the advising system.",
    },
    {
      question: "Where can I find information about campus events?",
      answer:
        "Campus events are posted on the university's official social media accounts, the student portal, and bulletin boards around campus. You can also check the events calendar on the Ashesi website.",
    },
    {
      question: "How do I apply for on-campus housing?",
      answer:
        "On-campus housing applications are typically opened before the start of each academic year. You can apply through the housing portal in your student account. Be sure to submit your application before the deadline.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Searchbar
        placeholder="Search FAQs"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ScrollView style={styles.scrollView}>
        <List.Section>
          {filteredFaqs.map((faq, index) => (
            <List.Accordion
              key={index}
              title={faq.question}
              titleNumberOfLines={2}
              left={(props) => (
                <List.Icon {...props} icon="frequently-asked-questions" />
              )}
            >
              <List.Item
                title=""
                description={faq.answer}
                descriptionNumberOfLines={0}
              />
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
});
