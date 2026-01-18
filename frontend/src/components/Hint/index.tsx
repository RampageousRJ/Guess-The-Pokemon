import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../../context/Data';

const Hint: React.FC = () => {
    const [showImage, setShowImage] = React.useState(false);
    const { data } = useContext(DataContext);
    return (
        <div
              className="mb-3 card-glow flex-grow-1"
              style={{
                background: "rgba(20, 20, 30, 0.9)",
                borderRadius: "12px",
              }}
            >
              <div className="h-100 d-flex flex-column align-items-center justify-content-center p-4">
                <h3
                  className="mb-4"
                  style={{ letterSpacing: "3px", color: "#ffd700" }}
                >
                  WHO'S THAT POKÉMON?
                </h3>

                {!showImage && ( 
                    <button
                    className="btn btn-lg btn-glow px-5 py-3"
                    onClick={() => setShowImage(true)}
                    >
                        REVEAL HINT
                    </button>)
                }
                

                {showImage && (
                  <img
                    src={data?.hints.backSprite}
                    alt="Pokemon Sprite"
                    className="img-fluid mt-4"
                    style={{ maxWidth: "80%" }}
                  />
                )}
              </div>
            </div>
    );
}

export default Hint;