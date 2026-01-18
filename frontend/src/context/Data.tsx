import { createContext, ReactNode, useState } from "react";

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
  setData: (data: PokemonSession) => void;
}

export const DataContext = createContext<DataContextType>({
  data: null,
  setData: () => {},
});

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<PokemonSession | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};