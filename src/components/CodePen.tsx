import { LiveProvider, LivePreview, LiveEditor } from 'react-live';
import { useEffect, useState } from 'react';
import { themes } from 'prism-react-renderer';

import TextField from '@mui/material/TextField'; // Import components from @mui/material
import Button from '@mui/material/Button';

function CodePen() {
    const placeholderTsxCode = `const Counter = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div className="container">
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

render(Counter)`

    const placeholderCssCode = `.container {
    padding-top: 100px;
}
`
    const [tsxCode, setTsxCode] = useState<string>(placeholderTsxCode);
    const [cssCode, setCssCode] = useState<string>(placeholderCssCode);

    const handleCssCodeChange = (codeChange: string) => {
        setCssCode(codeChange)
    }

    const handleTsxCodeChange = (codeChange: string) => {
        setTsxCode(codeChange)
    }

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = cssCode;
        styleElement.id = 'dynamic-styles';

        const existingStyleElement = document.querySelector('#dynamic-styles');

        if (existingStyleElement) {
            existingStyleElement.parentNode?.removeChild(existingStyleElement);
        }

        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, [cssCode])

    return (
        <div>
            <LiveProvider noInline code={tsxCode} scope={{ Button, TextField }}>
                <LiveEditor theme={themes.vsDark} onChange={handleTsxCodeChange} />
                <LiveEditor theme={themes.vsDark} language="css" code={cssCode} onChange={handleCssCodeChange} />
                <LivePreview />
            </LiveProvider>
        </div>
    );
}

export default CodePen;