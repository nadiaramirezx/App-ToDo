import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useSession } from '../ctx';
import { useRouter } from 'expo-router';

const db = SQLite.openDatabaseSync('tasks.db');  //crea base de datos "tasks"

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { signOut } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);',
        [],
        () => console.log('Tabla creada con exito'),
        (error) => console.log('Error al crer la tabla:', error)
      );
    },
    (error) => console.log('Error en la transaccion:', error)
  );
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tasks;', [], (_, { rows: { _array } }) => {
        setTasks(_array);
      });
    });
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    db.transaction(tx => {
      tx.executeSql('INSERT INTO tasks (text) VALUES (?);', [newTask], () => {
        fetchTasks();
        setNewTask('');
      });
    });
  };

  const deleteTask = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM tasks WHERE id = ?;', [id], () => {
        fetchTasks();
      });
    });
  };

  const handleLogout = () => {
    signOut();
    router.replace('/login'); // Redirige al usuario a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Agregar Tarea" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <Button title="Eliminar" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
      <Button title='Cerrar Sesion' onPress={handleLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskListScreen;