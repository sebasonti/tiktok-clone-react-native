import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { buttonStyles } from '../../../styles/buttonStyles';
import styles from './styles';

export default function ProfileHeader({ user }) {
  const navigation = useNavigation();

  function handleEditProfileClick() {
    navigation.navigate('editProfile');
  }

  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon="account" />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>0</Text>
          <Text style={styles.counterText}>Following</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>0</Text>
          <Text style={styles.counterText}>Followers</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>0</Text>
          <Text style={styles.counterText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        style={buttonStyles.grayOutlinedButton}
        onPress={handleEditProfileClick}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}