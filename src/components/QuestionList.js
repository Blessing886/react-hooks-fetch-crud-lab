import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch questions from the server");
        }
      })
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [setQuestions]);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
        } else {
          alert("Failed to delete question on the server");
        }
      })
      .catch((error) => alert("Error deleting question:", error));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  const questionItems = questions
    ? questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      ))
    : null;

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
