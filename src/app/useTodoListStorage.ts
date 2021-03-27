import { useLocalStorage } from "./useLocalStorage";
import { TodoEntity } from "./TodoEntity";

export const useTodoListStorage = () => {
  return useLocalStorage<TodoEntity[]>("myToDos");
};
