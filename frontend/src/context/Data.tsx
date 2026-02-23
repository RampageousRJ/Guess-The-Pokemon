import { createContext, ReactNode, useEffect, useState } from "react";
import { PokemonSessionSchema, PokemonSession } from "./types";

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
    if (data) return;

    fetch(`${process.env.REACT_APP_API_URL}/api/game/start`)
      .then((res) => res.json())
      .then((json) => {
        const result = PokemonSessionSchema.safeParse(json);

        if (result.success) {
          setData(result.data);
        } else {
          console.error("Session Validation Failed:", result.error.format());
        }
      })
      .catch((err) => {
        console.error("Error starting Pokémon game:", err);
      });
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
