import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function TestSyntaxHighlighter() {
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
`;

    return (
        <div>
            <SyntaxHighlighter language='javascript'>
                {placeholderTsxCode}
            </SyntaxHighlighter>
        </div>
    );
}

export default TestSyntaxHighlighter;