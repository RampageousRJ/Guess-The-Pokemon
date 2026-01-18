import React from "react";
import Table from "../Table";
import { DataContext } from "../../context/Data";
import { useContext } from "react";

const LeftPane: React.FC = () => {

    const { data } = useContext(DataContext);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
    if (audioRef.current && data?.hints.cry) {
      audioRef.current.src = data.hints.cry;
    }
  }, [data]);

    return (
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
            <div
              className="w-100 h-100 card-red"
              style={{
                background: "rgba(20, 20, 30, 0.9)",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "12px",
              }}
            >
              <div className="p-4">
                <h2
                  className="text-center mb-4"
                  style={{ letterSpacing: "3px", color: "#ef4444" }}
                >
                  POKÉMON DATA
                </h2>

                <div className="mb-4 text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-glow px-4 py-2"
                      onClick={() => audioRef.current?.play()}
                    >
                      🔊 Pokémon Cry
                    </button>
                  </div>

                  <audio ref={audioRef} />
                </div>
            
                <Table />
                
              </div>
            </div>
          </div>
    );
}

export default LeftPane;