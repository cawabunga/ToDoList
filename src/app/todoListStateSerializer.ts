import { TodoListState } from "./todoListReducer";

export const serialize = (state: TodoListState) => {
  return state.ids.map((id) => state.byId[id]);
};
