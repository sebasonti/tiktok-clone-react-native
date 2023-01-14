import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageButtonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: 'gray'
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3338',
    padding: 5,
    borderRadius: 15
  },
  fieldsContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1
  },
  fieldItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});