import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Post {
  id: string;
  author: string;
  content: string;
  image: string;
}

const DUMMY_POST: Post[] = Array.from({length: 5}).map((_, index) => ({
  id: index.toString(),
  author: `Pengguna ke-${index + 1}`,
  content: `Konten ke-${index + 1}`,
  image: `https://reactnative.dev/img/tiny_logo.png`
}))


export default function App(){

  const onPress = () => {
    console.log('Button pressed');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: "grey"}}>
        <FlatList
          data={DUMMY_POST}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.author}>{item.author}</Text>
            <Text>{item.content}</Text>
            <Image
              style={styles.image}
              source={{uri: item.image}}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>Add</Text>
            </TouchableOpacity>
          </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8
  },
  author: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 8
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  }
});
