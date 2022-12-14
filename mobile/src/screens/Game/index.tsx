import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  const [duos, SetDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.225:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => SetDuos(data))
  }, [])


  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>
            
            <Image 
              source={LogoImg}
              style={styles.logo}
            />

            <View style={styles.right}/>
          </View>

          <Image 
            source={{uri: game.bannerUrl}}
            style={styles.cover}
            resizeMode="cover"
          />
          
          <Heading 
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DuoCard 
                data={item}
                onConnect={() => {}}
              />
            )}
            horizontal={true}
            style={styles.containerList}
            contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyContentList }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.listEmpty}>
                N??o h?? an??ncios publicados ainda.
              </Text>
            )}
          />
        </SafeAreaView>
    </Background>
  );
}