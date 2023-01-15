import { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import FeedPostVideo from '../../components/post';
import { getPosts } from '../../services/posts';
import styles from './styles';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const mediaRefs = useRef({});

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const onViewableItemsChanged = ({ changed }) => {
    changed.forEach(element => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play()
        } else {
          cell.stop()
        }
      }
    });
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 99
  }

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  function renderItem({ item, index }) {
    const color = index % 2 ? 'blue' : 'pink';
    const height = Dimensions.get('window').height - 46;

    return (
      <View style={{ backgroundColor: color, height, flex: 1 }}>
        <FeedPostVideo
          item={item}
          ref={FeedPostVideoRef => {
            mediaRefs.current[item.id] = FeedPostVideoRef;
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 99
        }}

        data={posts}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item.id}
        decelerationRate='normal'
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  )
}