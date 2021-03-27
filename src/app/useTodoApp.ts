import { useEffect, useRef } from "react";
import { useTodoList } from "./useTodoList";
import { useTodoListStorage } from "./useTodoListStorage";
import { useTodoListSelector } from "./useTodoListSelector";
import { serialize } from "./todoListStateSerializer";

const defaultTodoItems = [
  {
    todo: "Learn GraphQL and gRPC",
    key: "16520",
  },
  {
    todo: "Add COOKIE Notification",
    key: "16521",
  },
  {
    todo: "Refactor last week code",
    key: "16522",
  },
  {
    todo: "Help the dog to find itself in that holly world",
    key: "16523",
  },
  {
    todo: "Read: Los Angeles battles huge wildfires.",
    key: "16525",
  },
];

export const useTodoApp = () => {
  const {
    state,
    populateList,
    addTodoItem,
    updateTodoItem,
    removeTodoItem,
  } = useTodoList();
  const { write, read } = useTodoListStorage();
  const todoItems = useTodoListSelector(state);
  const ignoreWrite = useRef(true);

  useEffect(() => {
    if (!ignoreWrite.current) {
      write(serialize(state));
    }
    ignoreWrite.current = false;
  }, [write, state]);

  useEffect(() => {
    const data = read();
    ignoreWrite.current = !data;
    populateList(data ?? defaultTodoItems);
  }, []);

  return {
    todoItems,
    addTodoItem,
    updateTodoItem,
    removeTodoItem,
  };
};
