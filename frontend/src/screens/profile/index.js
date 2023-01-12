import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileNavBar from '../../components/profile/navBar';
import PostsList from '../../components/profile/postsList';
import ProfileHeader from '../../components/profile/profileHeader';
import styles from './styles';

export default function ProfileScreen() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const userPosts = useSelector(state => state.posts.currentUserPosts);

  return (
    <View style={styles.container}>
      <ProfileNavBar user={currentUser} />
      <ProfileHeader user={currentUser} />
      <PostsList posts={userPosts} />
    </View>
  )
}