import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];
//PARENT COMPONENT
export default function App() {
  //DEFINING THE STATE VARIABLE
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [buttonShow, setButtonShow] = useState('close');

  function hanldePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    //UDADATE THE STATE
    if (step < 3) setStep((s) => s + 1);
  }
  function remove() {
    setIsOpen((is) => !is);
    setButtonShow((buttonShow) => (buttonShow === 'open' ? 'close' : 'open'));
  }
  return (
    <>
      <button className="close" onClick={remove}>{`${buttonShow}`}</button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <p className="message">
            step-{`${step}`}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: 'purple', color: '#fff' }}
              onClick={hanldePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: 'purple', color: '#fff' }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
