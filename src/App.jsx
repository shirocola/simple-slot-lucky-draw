import { useState } from 'react'
import './App.css'

function padNumber(num) {
  return num.toString().padStart(3, '0');
}

function App() {
  const [digits, setDigits] = useState(['0', '0', '0']);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    let finalNum = Math.floor(Math.random() * 100) + 1;
    let finalDigits = padNumber(finalNum).split('');
    let spinCounts = [20, 30, 40]; // left, middle, right
    let intervals = [null, null, null];

    // For each digit, spin and stop one by one
    for (let i = 0; i < 3; i++) {
      intervals[i] = setInterval(() => {
        setDigits(prev => {
          const newDigits = [...prev];
          newDigits[i] = Math.floor(Math.random() * 10).toString();
          return newDigits;
        });
        spinCounts[i]--;
        if (spinCounts[i] === 0) {
          clearInterval(intervals[i]);
          setDigits(prev => {
            const newDigits = [...prev];
            newDigits[i] = finalDigits[i];
            return newDigits;
          });
          // If last digit stopped, end spinning
          if (i === 2) setSpinning(false);
        }
      }, 60 + i * 40);
    }
  };

  return (
    <div className="slot-container">
      <h1 className="slot-title">Simple Slot Lucky Draw</h1>
      <div className="slot-number">
        {digits.map((d, idx) => (
          <span key={idx} className="slot-digit">{d}</span>
        ))}
      </div>
      <button onClick={spin} disabled={spinning} className="spin-btn">
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
}

export default App
