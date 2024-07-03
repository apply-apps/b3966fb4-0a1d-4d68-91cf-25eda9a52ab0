// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const stories = [
  { id: '1', title: 'The Tortoise and the Hare', summary: 'A tale about a race between unequal opponents.' },
  { id: '2', title: 'The Boy Who Cried Wolf', summary: 'A story about the repercussions of lying.' },
  { id: '3', title: 'Cinderella', summary: 'A story of a young girl and a magical transformation.' },
];

const StoryList = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('StoryDetail', { story: item })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={stories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const storyDetails = {
  '1': 'Once upon a time, there was a speedy rabbit...',
  '2': 'Once there was a shepherd boy who...',
  '3': 'Cinderella was a young girl who...',
};

const StoryDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { story } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.detail}>{storyDetails[story.id]}</Text>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.appContainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StoryList" component={StoryList} />
          <Stack.Screen name="StoryDetail" component={StoryDetail} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    margin: 20,
  },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 5,
  },
  summary: {
    fontSize: 16,
    color: '#bbbbbb',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    color: '#bbbbbb',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#1E90FF',
  },
});