import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import GeneralNavBar from '../../../../components/general/navBar';
import { saveUserField } from '../../../../services/user';
import { inputStyles } from '../../../../styles';
import styles from './styles';

export default function EditProfileFieldScreen({ route }) {
  const { title, fieldName, value } = route.params;
  const [inputValue, setInputValue] = useState(value);
  const navigation = useNavigation();

  async function onSave() {
    // console.log(inputValue);
    try {
      await saveUserField(fieldName, inputValue);
    } catch (error) {
      console.log("Something went wrong when updating user data.", error);
    } finally {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <GeneralNavBar title={title} rightButton={{ name: 'save', action: onSave }} />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.text}>{title}</Text>
        <TextInput
          style={inputStyles.textInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
      </View>
    </SafeAreaView>
  )
}