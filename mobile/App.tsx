import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import  Widget  from './src/components/Widget';
import { View } from 'react-native';
import { theme } from './src/theme';
import { useFonts, Inter_500Medium,Inter_400Regular } from '@expo-google-fonts/inter';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,Inter_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      flex:1,
      backgroundColor: theme.colors.background,
    }}>
      <StatusBar
       style="light" 
       backgroundColor='transparent'
       translucent
       />

       <Widget/>
    </View>
  );
}


