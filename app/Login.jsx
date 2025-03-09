import { View,Text, TextInput, Button, Alert,StyleSheet} from 'react-native';
import {useSession} from './ctx'
import {useState} from 'react';
import {useRouter } from 'expo-router';

export default function Login (){
   const {signIn} = useSession();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const router = useRouter();

   //manejo del inicio de sesion
   const handleLogin = () => {
      //validacion de credenciales
      if (email ===  'usuario@ejemplo.com' && password === 'password123'){
         signIn();
         router.replace('/'); //redirige a la pantalla principal (index)
      } else{
         Alert.alert('Correo o contraseña incorrectos');
      }
   };

   return (
      <View style={styles.container}>
         <Text style = {styles.title}>Bienvenido al Inicio de Sesion</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />
          <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
