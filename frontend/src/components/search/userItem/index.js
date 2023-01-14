import { Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default function SearchUserItem({ item: user }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>
        {user.displayName} <Text style={styles.email}>({user.email})</Text>
      </Text>
      <Image style={styles.image} source={{ uri: user.photoURL }} />
    </TouchableOpacity>
  )
}