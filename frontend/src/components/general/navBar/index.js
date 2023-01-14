import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function GeneralNavBar({ title, rightButton }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={navigation.goBack}
      >
        <Feather name='arrow-left' size={26} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={rightButton?.action}
      >
        <Feather name={rightButton ? rightButton.name : 'save'} size={26} color={rightButton ? 'pink' : 'white'} />
      </TouchableOpacity>
    </View>
  )
}