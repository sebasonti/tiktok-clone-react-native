import { View, Text, FlatList } from 'react-native';
import PostItem from '../postItem';
import styles from './styles';

export default function PostsList({ posts }) {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
      />
    </View>
  )
}