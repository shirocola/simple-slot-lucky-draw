import { useState } from 'react'
import './App.css'

function padNumber(num) {
  return num.toString().padStart(3, '0');
}

function App() {
  const [digits, setDigits] = useState(['0', '0', '0']);
  const [spinning, setSpinning] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState(
    Array.from({ length: 100 }, (_, i) => padNumber(i + 1))
  );
  const [history, setHistory] = useState([]);

  const spin = () => {
    if (availableNumbers.length === 0) return;
    setSpinning(true);
    // Pick a random index from availableNumbers
    const idx = Math.floor(Math.random() * availableNumbers.length);
    const finalNum = availableNumbers[idx];
    let finalDigits = finalNum.split('');
    let spinCounts = [20, 30, 40];
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
          if (i === 2) {
            setSpinning(false);
            // Remove the drawn number from availableNumbers and add to history
            setAvailableNumbers(nums => nums.filter((_, nidx) => nidx !== idx));
            setHistory(h => [finalNum, ...h]);
          }
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
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={spin} disabled={spinning || availableNumbers.length === 0} className="spin-btn">
          {spinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Drawn' : 'Spin'}
        </button>
        <button
          onClick={() => setDigits(['0', '0', '0'])}
          disabled={spinning || availableNumbers.length === 0}
          className="spin-btn"
          style={{ background: '#fff', color: '#222', border: '1px solid #ccc' }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', color: '#fff', fontSize: '1.1rem' }}>
        <b>Drawn Numbers:</b> {history.join(', ')}
      </div>
    </div>
  );
}

export default App
