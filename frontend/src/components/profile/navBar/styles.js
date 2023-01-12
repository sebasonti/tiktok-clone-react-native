import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  text: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})