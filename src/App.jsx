import { useState, useRef } from 'react'
import './App.css'

function padNumber(num) {
  return num.toString().padStart(3, '0');
}

const DIGITS = Array.from({ length: 10 }, (_, i) => i.toString());
const REEL_LENGTH = 10;

function App() {
  // Three reels for 1x3 slot
  const [reels, setReels] = useState([
    { reel: [...DIGITS], pos: 0 },
    { reel: [...DIGITS], pos: 0 },
    { reel: [...DIGITS], pos: 0 },
  ]);
  const [spinning, setSpinning] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState(
    Array.from({ length: 100 }, (_, i) => padNumber(i + 1))
  );
  const intervals = useRef([null, null, null]);

  const spin = () => {
    if (availableNumbers.length === 0) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * availableNumbers.length);
    const finalNum = availableNumbers[idx];
    const finalDigits = finalNum.split('');
    const stopDelays = [24, 32, 40];
    let counts = [0, 0, 0];
    for (let col = 0; col < 3; col++) {
      if (intervals.current[col]) clearInterval(intervals.current[col]);
      intervals.current[col] = setInterval(() => {
        setReels(prev => {
          const newReels = prev.map(r => ({ ...r }));
          newReels[col].pos = (newReels[col].pos + 1) % REEL_LENGTH;
          return newReels;
        });
        counts[col]++;
        if (counts[col] >= stopDelays[col]) {
          clearInterval(intervals.current[col]);
          setReels(prev => {
            const newReels = prev.map(r => ({ ...r }));
            const idxInReel = newReels[col].reel.indexOf(finalDigits[col]);
            newReels[col].pos = idxInReel;
            return newReels;
          });
          if (col === 2) {
            setTimeout(() => {
              setSpinning(false);
              setAvailableNumbers(nums => nums.filter((_, nidx) => nidx !== idx));
            }, 400);
          }
        }
      }, 60 + col * 40);
    }
  };

  // Get the visible digit for each reel
  const digits = reels.map(r => r.reel[r.pos % REEL_LENGTH]);

  return (
    <div className="slot-1x3-container">
      <div className="slot-1x3-row">
        {digits.map((digit, idx) => (
          <span key={idx} className="slot-1x3-digit">{digit}</span>
        ))}
      </div>
      <button onClick={spin} disabled={spinning || availableNumbers.length === 0} className="spin-btn-1x1">
        {spinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Drawn' : 'Spin'}
      </button>
    </div>
  );
}

export default App
