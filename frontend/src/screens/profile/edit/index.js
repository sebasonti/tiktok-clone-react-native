import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import GeneralNavBar from '../../../components/general/navBar';
import styles from './styles';
import { saveUserProfileImage } from '../../../services/user';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const navigation = useNavigation();

  async function chooseProfileImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      saveUserProfileImage(result.assets[0].uri);
    }
  }

  function editField(title, fieldName, value) {
    navigation.navigate('editProfileField', {
      title,
      fieldName,
      value
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <GeneralNavBar title='Edit Profile' />
      <View style={styles.imageButtonContainer}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: currentUser.photoURL }}
          />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={chooseProfileImage}
          >
            <Feather name='camera' size={26} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() => editField('Display Name', 'displayName', currentUser.displayName)}
        >
          <Text>Display Name</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{currentUser.displayName}</Text>
            <Feather name='chevron-right' size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}