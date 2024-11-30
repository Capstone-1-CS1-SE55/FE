/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react';
import './clockCount.scss';

const ClockCounter = memo(({ targetDate }) => {
  function flip(flipCard, newNumber) {
    if (!!targetDate) {
      const topHalf = flipCard?.querySelector('.topBox');
      if (!!topHalf) {
        const startNumber = parseInt(topHalf.textContent);
        if (newNumber === startNumber) return;

        const bottomHalf = flipCard?.querySelector('.bottomBox');
        const topFlip = document.createElement('div');
        topFlip.classList.add('top-flip');
        const bottomFlip = document.createElement('div');
        bottomFlip.classList.add('bottom-flip');

        bottomHalf.textContent = startNumber;
        topFlip.textContent = startNumber;
        bottomFlip.textContent = newNumber;

        topFlip.addEventListener('animationstart', (e) => {
          topHalf.textContent = newNumber;
        });
        topFlip.addEventListener('animationend', (e) => {
          topFlip.remove();
        });
        bottomFlip.addEventListener('animationend', (e) => {
          bottomHalf.textContent = newNumber;
          bottomFlip.remove();
        });
        flipCard.append(topFlip, bottomFlip);
      }
    }
  }
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    flip(document?.querySelector('[data-days-tens]'), Math.floor(timeLeft.days / 10));
    flip(document?.querySelector('[data-days-ones]'), timeLeft.days % 10);
    flip(document?.querySelector('[data-hours-tens]'), Math.floor(timeLeft.hours / 10));
    flip(document?.querySelector('[data-hours-ones]'), timeLeft.hours % 10);
    flip(document?.querySelector('[data-minutes-tens]'), Math.floor(timeLeft.minutes / 10));
    flip(document?.querySelector('[data-minutes-ones]'), timeLeft.minutes % 10);
    flip(document?.querySelector('[data-seconds-tens]'), Math.floor(timeLeft.seconds / 10));
    flip(document?.querySelector('[data-seconds-ones]'), timeLeft.seconds % 10);

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="container-clock">
      {/* <div className="container-segment hover:scale-90 transition-all">
        <div className="segment">
          <div className="flip-card" data-days-tens>
            <div className="topBox">0</div>
            <div className="bottomBox">0</div>
          </div>
          <div className="flip-card" data-days-ones>
            <div className="topBox">1</div>
            <div className="bottomBox">1</div>
          </div>
        </div>
        <div className="segment-title">Days</div>
      </div> */}
      {/* <div className="huy">
        <div></div>
        <div></div>
      </div> */}
      <div className="container-segment hover:scale-90 transition-all">
        <div className="segment">
          <div className="flip-card" data-hours-tens>
            <div className="topBox">2</div>
            <div className="bottomBox">2</div>
          </div>
          <div className="flip-card" data-hours-ones>
            <div className="topBox">4</div>
            <div className="bottomBox">4</div>
          </div>
        </div>
        <div className="segment-title">Hours</div>
      </div>
      <div className="huy">
        <div></div>
        <div></div>
      </div>
      <div className="container-segment hover:scale-90 transition-all">
        <div className="segment">
          <div className="flip-card" data-minutes-tens>
            <div className="topBox">0</div>
            <div className="bottomBox">0</div>
          </div>
          <div className="flip-card" data-minutes-ones>
            <div className="topBox">0</div>
            <div className="bottomBox">0</div>
          </div>
        </div>
        <div className="segment-title">Minutes</div>
      </div>
      <div className="huy">
        <div></div>
        <div></div>
      </div>
      <div className="container-segment hover:scale-90 transition-all">
        <div className="segment">
          <div className="flip-card" data-seconds-tens>
            <div className="topBox">0</div>
            <div className="bottomBox">0</div>
          </div>
          <div className="flip-card" data-seconds-ones>
            <div className="topBox">0</div>
            <div className="bottomBox">0</div>
          </div>
        </div>
        <div className="segment-title">Seconds</div>
      </div>
    </div>
  );
});

export default ClockCounter;
