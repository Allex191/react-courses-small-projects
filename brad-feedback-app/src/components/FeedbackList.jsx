import React from "react";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = ({ feedback, deleteHandler }) => {
  if (!feedback || feedback.length === 0) {
    return <p>There are no feedbacks</p>;
  }

  return (
    <ul className="feedback-list">
      {feedback.map((item) => {
        return (
          <FeedbackItem
            key={item.id}
            data={item}
            deleteHandler={deleteHandler}
          ></FeedbackItem>
        );
      })}
    </ul>
  );
};

export default FeedbackList;
