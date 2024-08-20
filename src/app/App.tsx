import { useState } from 'react';

function App() {
  const [color, setColor] = useState('');

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };

  return (
    <>
      <h1>Test</h1>
      <div className='card'>
        <input
          type='color'
          value={color}
          onChange={(e) => setColor(e.currentTarget.value)}
        />
        <button onClick={onClick}>do it</button>
      </div>
    </>
  );
}

export default App;
