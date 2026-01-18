import { useContext } from 'react';
import React from 'react';
import Header from './components/Header';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import { DataContext } from './context/Data';

const App:React.FC = () => {

  const { setData } = useContext(DataContext);

  React.useEffect(() => {
      fetch('http://localhost:3030/api/game/start')
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.error('Error fetching Pokémon data:', error);
        });
  }, []);
  
  return (
    <>
      <Header />
      <div className="container-fluid vh-custom">
        <div className="row h-100 g-0">
          <LeftPane />
          <RightPane />
        </div>
      </div>
    </>
  );
}

export default App;
