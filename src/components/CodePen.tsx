import { LiveProvider, LivePreview } from 'react-live';
import TextField from '@mui/material/TextField'; // Import components from @mui/material
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";

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
    const [tsxCode, setTsxCode] = useState<string>('');
    const [cssCode, setCssCode] = useState<string>('');

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

    useEffect(() => {
        setTimeout(() => {
            setTsxCode(placeholderTsxCode);
            setCssCode(placeholderCssCode);
        }, 0);
    }, [])

    return (
        <div>
            {/* <MonacoEditor
                value={tsxCode}
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    theme: 'vs-dark',
                    wordWrap: 'on',
                }}
                onChange={handleTsxCodeChange}
                width="500"
                height="500"
            />
            <MonacoEditor
                value={cssCode}
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    theme: 'vs-dark',
                    wordWrap: 'on',
                }}
                onChange={handleCssCodeChange}
                width="500"
                height="500"
            /> */}
            <AceEditor
                mode="tsx"
                theme="monokai"
                onChange={handleTsxCodeChange}
                value={tsxCode}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                style={{
                    width: '100%',
                    height: '300px'
                }}
            />
            <AceEditor
                mode="css"
                theme="monokai"
                onChange={handleCssCodeChange}
                value={cssCode}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                style={{
                    width: '100%',
                    height: '300px'
                }}
            />
            <LiveProvider noInline code={tsxCode} scope={{ Button, TextField }}>
                <LivePreview />
            </LiveProvider>
        </div>
    );
}

export default CodePen;