import React from "react";

const TodoList = () => {
  const list = [
    { id: 1, todoData: "todo 1" },
    { id: 2, todoData: "todo 2" },
  ];
  return <div>{list.length > 0 && list.map(todo)}</div>;
};

export default TodoList;
