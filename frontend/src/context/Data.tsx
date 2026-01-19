import { createContext, ReactNode, useEffect, useState } from "react";

interface PokemonSession {
  sessionId: string;
  hints: {
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    color: string;
    generation: string;
    habitat: string;
    shape: string;
    isLegendary: boolean;
    isMythical: boolean;
    backSprite: string;
    frontSprite: string;
    cry: string;
    evolutionStage: number;
    captureRate: number;
  };
}

interface DataContextType {
  data: PokemonSession | null;
  setData: React.Dispatch<React.SetStateAction<PokemonSession | null>>;
}

export const DataContext = createContext<DataContextType>({
  data: null,
  setData: () => null,
});

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<PokemonSession | null>(null);

  useEffect(() => {
    // Prevent re-fetch if data already exists
    if (data) return;

    fetch("https://guess-the-pokemon-c4jf.vercel.app/api/game/start")
      .then(res => res.json())
      .then((session: PokemonSession) => {
        setData(session);
      })
      .catch(err => {
        console.error("Error starting Pokémon game:", err);
      });
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
