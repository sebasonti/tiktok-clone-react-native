import { useEffect, useState } from 'react'
import { TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchUserItem from '../../components/search/userItem';
import { getUsersByEmail } from '../../services/user';
import styles from './styles';

export default function SearchScreen() {
  const [searchInput, setSearchInput] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    getUsersByEmail(searchInput)
      .then(setFoundUsers)
  }, [searchInput])

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setSearchInput}
        style={styles.textInput}
        placeholder='Enter an email'
      />
      <FlatList
        data={foundUsers}
        renderItem={SearchUserItem}
        keyExtractor={item => item.uid}
      />
    </SafeAreaView>
  )
}