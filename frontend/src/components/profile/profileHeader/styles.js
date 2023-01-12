import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    paddingHorizontal: 65,
    borderBottomColor: 'lightgray',
    borderWidth: 1
  },
  emailText: {
    padding: 20,
  },
  countersContainer: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  counterItem: {
    flex: 1,
    alignItems: 'center'
  },
  counterNumber: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  counterText: {
    fontSize: 11,
    color: 'gray'
  }
})