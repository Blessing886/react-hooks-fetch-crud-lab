import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json)
    .then((data) => setQuestions.data);
  }, [setQuestions]);

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
    key={question.id}
    question={question}
    onDelete={handleDeleteQuestion}
    onUpdate={handleUpdateQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
