import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id); // Call the onDelete handler with the question id
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value, 10);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion)) // Call the onUpdate handler with the updated question data
      .catch((error) => console.error("Error updating question:", error));
  }
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex}
        onChange={handleAnswerChange}>{options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
