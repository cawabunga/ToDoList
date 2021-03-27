import { TodoListState } from "./todoListReducer";
import { useMemo } from "react";

const todoListSelector = (state: TodoListState) =>
  state.ids.map((id) => state.byId[id]);

export const useTodoListSelector = (state: TodoListState) => {
  return useMemo(() => todoListSelector(state), [state]);
};
