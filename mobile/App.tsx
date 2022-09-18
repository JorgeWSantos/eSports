import { useEffect } from 'react';
import { StatusBar } from 'react-native'
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import * as NavigationBar from 'expo-navigation-bar';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes/Index';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  useEffect(() => {
    const load = async () => {
      await NavigationBar.setVisibilityAsync("hidden");

      await NavigationBar.setBackgroundColorAsync('#121214');

      await NavigationBar.setBehaviorAsync('inset-touch')

      NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility !== 'hidden') {
          setTimeout(() => {
            NavigationBar.setVisibilityAsync("hidden");
          }, 3000);
        }
      });
    }

    load();
  }, [])


  return (
    <Background>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes/> : <Loading/> }
    </Background>
  );
}
