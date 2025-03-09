import React from "react";
import { View, Text , Button, StyleSheet} from "react-native";
import { router, useRouter } from "expo-router";



export default function Main() {
  const router = useRouter();

  const goToTaskList = () => {
    router.push('/app/ListaTareasScreen'); // Navega a la pantalla de la lista de tareas
  };



  return (
    <View style={styles.container}>
    <Text style={styles.title}>Auth Aplicacion</Text>
    <Button title="Ir a Lista de Tareas" onPress={goToTaskList} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});