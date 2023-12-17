import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { id: courseIdFromParams } = useParams();
  const [userAnswers, setUserAnswers] = useState(Array(quizzes.length).fill({}));
  const [showResults, setShowResults] = useState(false);
  const [score , setScore] = useState(0)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesCollection = collection(db, 'quizzes');
        const querySnapshot = await getDocs(quizzesCollection);

        const quizzesData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((quiz) => quiz.courseId === courseIdFromParams);

        setQuizzes(quizzesData);
        console.log('Quizzes:', quizzesData);
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };

    fetchQuizzes();
  }, [courseIdFromParams]);

  const handleAnswerSelection = (quizIndex, questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[quizIndex] = {
        ...updatedAnswers[quizIndex],
        [questionIndex]: selectedOption,
      };
      return updatedAnswers;
    });
  };
  const calculateTotalMarks = (quizzes) => {
    return quizzes.reduce((totalMarks, quiz) => {
      // Iterate over each question in the quiz and accumulate total marks
      const quizTotalMarks = quiz.questions.reduce((quizTotal, question) => {
        return quizTotal + Number(question.totalMarks);
      }, 0);
  
      // Add the total marks of the current quiz to the overall total marks
      return totalMarks + quizTotalMarks;
    }, 0);
  };
  const handleSubmitQuiz = () => {
    // Calculate and display the score
    let score = 0;
    quizzes.forEach((quiz, quizIndex) => {
      const userAnswersForQuiz = userAnswers[quizIndex];
      quiz.questions.forEach((question, questionIndex) => {
        const userAnswer = userAnswersForQuiz[questionIndex];
        if (userAnswer === question.correctAnswer) {
          score += Number(question.totalMarks);
        }
      });
    });
  
    console.log('User Score:', score);
    setShowResults(true);
    setScore(score);
  };

  return (
    <div>
  <h1>Quizzes for Course ID: {courseIdFromParams}</h1>
  {quizzes?.length > 0 ? (
    quizzes.map((quiz, quizIndex) => (
      <div key={quiz.id}>
        {quiz.questions?.length > 0 ? (
          <div>
            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <p>{question.question}</p>
                {question.options.map((option, optionIndex) => (
                 <div key={optionIndex}>
                 <input
                   type="radio"
                   name={`question-${quizIndex}-${questionIndex}`}
                   value={option}
                   checked={userAnswers[quizIndex]?.[questionIndex] === option}
                   onChange={() => handleAnswerSelection(quizIndex, questionIndex, option)}
                 />
                 <label>{option}</label>
               </div>   
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No questions available for this quiz. Quiz is closed.</p>
        )}
      </div>
    ))
  ) : (
    <p>No quizzes available for this course.</p>
  )}

  {showResults && (
    <div>
      <h2>Quiz Results</h2>
      <p>User Score: {score} out of {calculateTotalMarks(quizzes)}</p>
    </div>
  )}

  <button onClick={handleSubmitQuiz}>Submit Quiz</button>
</div>

  );
};

export default QuizPage;
