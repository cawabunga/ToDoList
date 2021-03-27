import { useCallback, useReducer } from "react";
import { todoListReducer } from "./todoListReducer";
import { TodoEntity, TodoEntityId } from "./TodoEntity";

export const useTodoList = () => {
  const [state, dispatch] = useReducer(todoListReducer, {
    byId: {},
    ids: [],
  });

  const populateList = useCallback((todoItems: TodoEntity[]) => {
    dispatch({ type: "POPULATE", entities: todoItems });
  }, []);

  const addTodoItem = useCallback((todoItem: TodoEntity) => {
    dispatch({ type: "ADD_ITEM", entity: todoItem });
  }, []);

  const removeTodoItem = useCallback((todoItemId: TodoEntityId) => {
    dispatch({ type: "REMOVE_ITEM", entityId: todoItemId });
  }, []);

  const updateTodoItem = useCallback((todoItem: TodoEntity) => {
    dispatch({ type: "UPDATE_ITEM", entity: todoItem });
  }, []);

  return {
    state,
    populateList,
    addTodoItem,
    removeTodoItem,
    updateTodoItem,
  };
};
