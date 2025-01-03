import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function handleUpdateAnswer(questionId, newCorrectAnswer) {
    setQuestions(questions.map((question) =>
      question.id === questionId ? { ...question, correctAnswer: newCorrectAnswer } : question
    ));
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm setQuestions={setQuestions} questions={questions} />
        ) : (
        <QuestionList questions={questions} setQuestions={setQuestions}
        handleUpdateAnswer={handleUpdateAnswer} />
        )}
    </main>
  );
}

export default App;