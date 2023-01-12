import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 32
  },
  camera: {
    flex: 1,
    backgroundColor: 'tomato',
    // borderWidth: 5,
    // borderColor: 'yellow',
    // padding: 5,
    aspectRatio: 9 / 16
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  recordButtonContainer: {
    flex: 1,
    marginHorizontal: 30
  },
  recordButton: {
    borderWidth: 8,
    borderColor: '#ff404087',
    backgroundColor: '#ff4040',
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: 'center'
  },
  galleryButtonContainer: {
    flex: 1
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50
  },
  galleryButtonImage: {
    width: 50,
    height: 50
  },
  sideBarContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    marginHorizontal: 20,
  },
  sideBarIconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 25
  }
});

