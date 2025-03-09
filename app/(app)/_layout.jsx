import { useEffect} from 'react';
import { Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSession } from '../ctx';


export default function AppLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session  ) {
      router.replace('/login'); //redirige si no esta autenticado
    }
  }, [session, isLoading, router]);

 
  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return <Stack />;
}