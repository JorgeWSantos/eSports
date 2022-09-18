import { useState, FormEvent } from 'react';
import axios from 'axios';

import * as Radix from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react';
import { Input } from '../Input';
import { Game } from '../../../App';

interface Props {
  games: Game[];
}

export const CreateAdModal = ({ games } : Props) => {

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if(!data.name)
      return;

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        "name": data.name,
        "weekDays": weekDays.map(Number),
        "useVoiceChannel": useVoiceChannel,
        "yearsPlaying": Number(data.yearsPlaying),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "discord": data.discord
      });
      alert('sucesso')
    } catch (error) {
      alert(error)
    } 
  };

  return (
      <Radix.Portal>
      <Radix.Overlay  className='bg-black/60 inset-0 fixed'/>

      <Radix.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Radix.Title className='text-3xl font-black'>Publique um anúncio</Radix.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className="font-semibold">Qual o game</label>
            <select 
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue={"Selecione o game que dejesa jogar"}
            >
              {games.map(game =>
                <option key={game.id}value={game.id}>
                  {game.title}
                </option>
              )}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Como te chamam dentro do game?" 
              className="bg-zinc-900 py-3 px-4 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" type="text" placeholder="Tudo bem ser Zero"/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" type="text" placeholder="Usuário#0000"/>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0" 
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item 
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item 
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                
                <ToggleGroup.Item 
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item 
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5" 
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item 
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            {/* <Input id="useVoiceChannel" type="checkbox"/> */}
            <Checkbox.Root 
              className="w-6 h-6 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if(checked === true)
                  setUseVoiceChannel(true);
                else
                  setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator className="flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-400"/>
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Radix.Close
              type="button" 
              className="bg-zinc-500 hover:bg-zinc-600 duration-300 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Radix.Close>

            <button 
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 duration-300 px-5 h-12 rounded-md font-semibold flex justify-center items-center gap-3"
            >
              <GameController size={24}/>
              Encontrar duo
            </button>
          </footer>

        </form>
      </Radix.Content>
    </Radix.Portal>
  );
}