import { useState, useRef } from 'react'
import './App.css'

function padNumber(num) {
  return num.toString().padStart(3, '0');
}

const DIGITS = Array.from({ length: 10 }, (_, i) => i.toString());

function SlotDigit({ pos, spinning }) {
  // Create extended digit array for smooth scrolling
  const extendedDigits = [...DIGITS, ...DIGITS, ...DIGITS];

  return (
    <div className="slot-1x3-digit">
      <div
        className={`slot-reel-container ${spinning ? 'spinning' : ''}`}
        style={{
          transform: `translateY(-${pos * 100}%)`
        }}
      >
        {extendedDigits.map((digit, idx) => (
          <div key={idx} className="slot-digit-item">
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  // Three reels for 1x3 slot
  const [reels, setReels] = useState([
    { pos: 10, spinning: false }, // Start at position 10 (middle set)
    { pos: 10, spinning: false },
    { pos: 10, spinning: false },
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
    const spinDurations = [2000, 2500, 3000]; // Different durations for each reel

    // Start spinning all reels
    setReels(prev => prev.map(reel => ({ ...reel, spinning: true })));

    for (let col = 0; col < 3; col++) {
      if (intervals.current[col]) clearInterval(intervals.current[col]);

      // Fast spinning - increment position every 100ms
      intervals.current[col] = setInterval(() => {
        setReels(prev => {
          const newReels = [...prev];
          newReels[col] = {
            ...newReels[col],
            pos: (newReels[col].pos + 1) % 10,
            spinning: true
          };
          return newReels;
        });
      }, 100);

      // Stop each reel at different times
      setTimeout(() => {
        clearInterval(intervals.current[col]);

        // Set final position and stop spinning
        setReels(prev => {
          const newReels = [...prev];
          newReels[col] = {
            ...newReels[col],
            pos: parseInt(finalDigits[col]) + 10, // Add 10 to use middle set of digits
            spinning: false
          };
          return newReels;
        });

        // When last reel stops, finish spinning
        if (col === 2) {
          setTimeout(() => {
            setSpinning(false);
            setAvailableNumbers(nums => nums.filter((_, nidx) => nidx !== idx));
          }, 300);
        }
      }, spinDurations[col]);
    }
  };

  return (
    <div className="slot-1x3-container">
      <div className="slot-1x3-row">
        {reels.map((reel, idx) => (
          <SlotDigit key={idx} pos={reel.pos} spinning={reel.spinning} />
        ))}
      </div>
      <button onClick={spin} disabled={spinning || availableNumbers.length === 0} className="spin-btn-1x1">
        {spinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Drawn' : 'Spin'}
      </button>
    </div>
  );
}

export default App
