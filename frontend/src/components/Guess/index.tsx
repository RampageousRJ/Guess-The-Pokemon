import React from "react";
import { DataContext } from "../../context/Data";
import { useContext } from "react";

const Guess: React.FC = () => {
    const [guessText, setGuess] = React.useState("");
    const { data } = useContext(DataContext);
    const sessionId = data?.sessionId;
    async function onGuessSubmit() : Promise<void> {
        if (!sessionId) {
            alert("Game not initialized yet. Please refresh.");
            return;
        }

        if (!guessText.trim()) {
            alert("Please enter a guess.");
            return;
        }

        try {
            const res = await fetch("https://guess-the-pokemon-c4jf.vercel.app/api/game/guess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    guess: guessText,
                }),
            });

            if (!res.ok) {
                throw new Error("Network error");
            }

            const data: {
                status: "correct" | "almost" | "wrong";
                correct?: string;
            } = await res.json();

            if (data.status === "correct") {
                alert("Hooray! You guessed correctly!");
                setGuess("");
                window.location.reload();
            } 
            else if (data.status === "almost") {
                alert(
                `You just missed the spelling a bit! The correct spelling is ${data.correct}! Congratulations!`
                );
                setGuess("");
                window.location.reload();
            } 
            else {
                alert("That's not quite right! Guess again!");
            }
            } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <div
              className="card-glow"
              style={{
                background: "rgba(20, 20, 30, 0.9)",
                minHeight: "200px",
                borderRadius: "12px",
              }}
            >
              <div className="h-100 d-flex flex-column align-items-center justify-content-center p-4">
                <h3
                  className="mb-4"
                  style={{ letterSpacing: "3px", color: "#ffd700" }}
                >
                  MAKE YOUR GUESS
                </h3>

                <div className="w-100 d-flex justify-content-center">
                  <input
                    type="text"
                    className="form-control form-control-lg me-2"
                    placeholder="Type Pokémon name..."
                    value={guessText}
                    onChange={(e) => setGuess(e.target.value)}
                    style={{
                      maxWidth: "280px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "2px solid rgba(255, 215, 0, 0.2)",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                  <button onClick={onGuessSubmit} className="btn btn-lg btn-red px-4 py-3">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
    );
}

export default Guess;