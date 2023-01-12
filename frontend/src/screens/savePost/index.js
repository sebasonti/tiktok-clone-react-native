import { StackActions, useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions';

export default function SavePostScreen({ route }) {
  const [description, setDescription] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleSavePost() {
    setUploadingVideo(true);
    dispatch(createPost(description, route.params.source, route.params.thumbnailSource))
      .then(() => {
        navigation.dispatch(StackActions.popToTop());
      })
      .catch((e) => {
        console.log(`Error uploading post "${description}":`, e);
        setUploadingVideo(false);
      });

  }

  if (uploadingVideo) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color='red' size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={160}
          multiline
          placeholder='Describe your video'
          onChangeText={text => setDescription(text)}
        />
        <Image
          style={styles.mediaPreview}
          source={{ uri: route.params.source }}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name='x' size={24} color='black' />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButton}
          onPress={handleSavePost}
        >
          <Feather name='corner-left-up' size={24} color='white' />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}