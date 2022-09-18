import { useState, useEffect } from 'react';
import * as Radix from '@radix-ui/react-dialog';
import axios from 'axios';
import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/Form/CreateAdBanner';
import { CreateAdModal } from './components/Form/CreateAdModal';

export interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(res => setGames(res.data));
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black my-20'>
        Seu 
        <span className='text-transparent bg-nlw-gradiente bg-clip-text mx-2'>
          duo
        </span> 
        está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6'>
        {games.map(game => (
          <GameBanner 
            key={game.id}
            adsCount={game._count.ads} 
            bannerUrl={game.bannerUrl} 
            title={game.title}
          />
        ))}
      </div>
      
      <Radix.Root>
        <CreateAdBanner />

        <CreateAdModal games={games}/>
      </Radix.Root>
    </div>
  )
}

export default App
