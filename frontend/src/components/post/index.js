import { Video } from 'expo-av';
import styles from './styles';
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

const FeedPostVideo = forwardRef(({ item }, parentRef) => {
  const videoRef = useRef(null);

  useEffect(() => unload, []);

  useImperativeHandle(parentRef, () => ({ play, stop, unload }));

  async function play() {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();
    if (!status?.isPlaying) {
      try {
        await videoRef.current.playAsync();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function stop() {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();
    if (status?.isPlaying) {
      try {
        await videoRef.current.stopAsync();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function unload() {
    if (!videoRef.current) return;
    try {
      await videoRef.current.unloadAsync();
    } catch (error) {
      console.error(error);
    }
  }

  async function pause() {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();
    try {
      if (status?.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // const videoURL = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';

  return (
    <Video
      ref={videoRef}
      style={styles.container}
      resizeMode="cover"
      shouldPlay={false}
      isLooping
      usePoster
      posterStyle={{ resizeMode: 'cover', height: '100%' }}
      posterSource={{ uri: item.thumbnailURL }}
      source={{ uri: item.videoURL }}
      onTouchStart={pause}
    />
  )
});

export default FeedPostVideo;