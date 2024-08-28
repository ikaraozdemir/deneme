import { useEffect, useState } from 'react';
// import questions from '../../../public/questions.js';
import Options from '../Options/Options.jsx';
import Result from '../Result/Result.jsx'
import './Questions.css';
import { useQuestionContext } from '../../context/QuestionProvider.jsx';

function Questions() {

  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const {
    setShowOption,
    setSelectedOption,
    showOption,
    selectedOption,
    questions,
    showResult,
    setShowResult,
    setDetailedResult
  } = useQuestionContext();

  const currentQuestion = questions[currentQuestionIndex];


  useEffect(() => {
    const displayQuestion = () => {
      setShowQuestion(true);
      setShowOption(false);
      setShowOption(null);

      setTimeout(() => {
        setShowOption(true);
      }, 400); 
    };

    displayQuestion(); 

    const interval = setInterval(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null)
        displayQuestion();
      } else {
        setShowQuestion(false);
        setDetailedResult((prev) => [...prev, {id:prev.length + 1, value:`Empty`}])
        setShowResult(true);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);

  }, [currentQuestionIndex]);


  useEffect(() => {
    console.log(selectedOption)
    if (selectedOption !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowQuestion(false);
        setShowResult(true);
      }
    }else if (selectedOption === null && currentQuestionIndex >= 0 && currentQuestionIndex <questions.length){
      setDetailedResult((prev) => [...prev, {id:prev.length + 1, value:`Empty`}])
    }
  }, [selectedOption]);
  

  

  return (
    <>
    <div className='questions'>
      {showQuestion && (
        <ul key={currentQuestionIndex}>
          <li>
            <h2>{`Q.${currentQuestionIndex + 1}`}</h2>
            <img src={currentQuestion?.media} alt={`question${currentQuestionIndex}`} />
            <br />
            <div className='question'>
              <h3>{currentQuestion.question}</h3>
              <div className='line'></div>
              {showOption && <Options currentQuestion={currentQuestion} />}
            </div>
          </li>
        </ul>
      )}
    </div>
    {showResult &&
      <Result/>
    }
    </>
  );
}

export default Questions;
