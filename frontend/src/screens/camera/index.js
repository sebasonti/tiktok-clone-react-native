import { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraPermissions.status == 'granted');

      const audioPermssions = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioPermssions.status == 'granted');

      const galleryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryPermissions.status == 'granted');

      if (galleryPermissions.status == 'granted') {
        const userGalleryMedia = await MediaLibrary
          .getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  async function recordVideo() {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality['480p']
        };
        const videoRecord = cameraRef.recordAsync(options);
        if (videoRecord) {
          const data = await videoRecord;
          const source = data.uri;
          let thumbnailSource = await generateThumbnail(source);
          navigation.navigate('savePost', { source, thumbnailSource });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async function stopVideo() {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  }

  async function pickFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });
    if (!result.canceled) {
      let thumbnailSource = await generateThumbnail(result.assets[0].uri);
      navigation.navigate('savePost', { source: result.assets[0].uri, thumbnailSource });
    }
  }

  async function generateThumbnail(source) {
    const time = 5000;
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, { time });
      return uri;
    } catch (error) {
      console.warn(error);
    }
  }

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return (
      <View>
        <Text>Camera, audio and gallery permissions needed!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused ?
        <Camera
          ref={ref => setCameraRef(ref)}
          style={styles.camera}
          ratio={'16:9'}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        /> : null
      }

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => {
            setCameraType(cameraType === Camera.Constants.Type.back ?
              Camera.Constants.Type.front : Camera.Constants.Type.back);
          }}
        >
          <Feather name='refresh-ccw' size={24} color={'white'} />
          <Text style={styles.sideBarIconText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => {
            setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ?
              Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off);
          }}
        >
          <Feather name='zap' size={24} color={'white'} />
          <Text style={styles.sideBarIconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }} />
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            disabled={!isCameraReady}
            onLongPress={recordVideo}
            onPressOut={stopVideo}
          />
        </View>

        <View style={styles.galleryButtonContainer}>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={pickFromGallery}
          >
            {galleryItems[0] &&
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[0].uri }}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}