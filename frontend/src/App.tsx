import { useContext } from 'react';
import React from 'react';
import Header from './components/Header';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import { DataContext } from './context/Data';
import Loader from './components/Loader';

const App: React.FC = () => {

  const { data } = useContext(DataContext);

  if (!data) {
    return <Loader />;
  }

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
