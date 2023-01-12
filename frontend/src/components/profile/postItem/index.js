import { View, Text, Image } from 'react-native'
import styles from './styles'
export default function PostItem({ item }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.thumbnailURL }} />
    </View>
  )
}