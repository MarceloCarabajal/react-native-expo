import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    banner: {
        flex: 1,
        height: 250,
      },
      container: {
        marginHorizontal: 10,
      },
      title: {
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
      },
      film: {
        width: 250,
        height: 300,
        marginRight: 10,
      },
      listado: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      listadoItem: {
        flexBasis: "48%",
      },
      character: {
        width: "100%",
        height: 200,
        marginVertical: 8,
      },
})