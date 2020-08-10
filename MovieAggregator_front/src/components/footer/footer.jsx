
import React from "react";

function FooterComponent(props) {
    return (
        props.texts.map((text, index) =>
            <p className="footer__test-text" key={`footer__test-text-${index}`}>
                {`${text}: ${index}`}
            </p>
        )
    );
}

export default FooterComponent;
