import React from "react";

import "./colored-logo.scss";

function ColoredLogo() {

    return (
        <div className="colored-logo">
            <img className="colored-logo__logo-symbol"
                src="./src/components/colored-logo/img/colored-logo.svg" alt="Colored logotype"></img>
            <img className="colored-logo__logo-text"
                src="./src/components/colored-logo/img/TOXIN.svg" alt="TOXIN label"></img>
        </div>
    );
}

export default ColoredLogo;

