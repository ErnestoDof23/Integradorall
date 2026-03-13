import { useState } from 'react';

// default inline styles for the button. These can be overridden
// by passing a `style` prop from the consumer.
const defaultButtonStyles = {
    backgroundColor: '#c7bfbfff',
    color: '#751717ff',
    padding: '4px 12px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
};

function Button({ text, action, style, disabled, hoverStyle, type = 'button' }) {
    // merge the caller's style on top of our defaults
    const [hover, setHover] = useState(false);
    const combinedStyles = {
        ...defaultButtonStyles,
        ...style,
        ...(hover && hoverStyle ? hoverStyle : {}),
    };

    return (
        <button
            type={type}
            onClick={action}
            style={combinedStyles}
            disabled={disabled}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {text}
        </button>
    );
}

export default Button;