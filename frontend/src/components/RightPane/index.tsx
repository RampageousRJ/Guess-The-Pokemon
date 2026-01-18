import React from "react";
import Hint from "../Hint";
import Guess from "../Guess";

const RightPane: React.FC = () => {
    return (
        <div className="col-lg-6 d-flex flex-column p-4">
            <Hint />
            <Guess />
        </div>
    );
}

export default RightPane;