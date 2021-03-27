import { TodoEntity, todoEntityId, TodoEntityId } from "./TodoEntity";
import { indexBy } from "./utils";

export interface TodoListState {
  byId: Record<TodoEntityId, TodoEntity>;
  ids: TodoEntityId[];
}

type TodoListAction =
  | {
      type: "POPULATE";
      entities: TodoEntity[];
    }
  | {
      type: "ADD_ITEM";
      entity: TodoEntity;
    }
  | {
      type: "UPDATE_ITEM";
      entity: TodoEntity;
    }
  | {
      type: "REMOVE_ITEM";
      entityId: TodoEntityId;
    };

export const todoListReducer = (
  state: TodoListState,
  action: TodoListAction
): TodoListState => {
  switch (action.type) {
    case "POPULATE":
      return {
        ...state,
        byId: indexBy(action.entities, todoEntityId),
        ids: action.entities.map(todoEntityId),
      };

    case "ADD_ITEM":
      return {
        ...state,
        byId: {
          ...state.byId,
          [todoEntityId(action.entity)]: action.entity,
        },
        ids: state.ids.concat(todoEntityId(action.entity)),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        ids: state.ids.filter((id) => action.entityId !== id),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        byId: {
          ...state.byId,
          [todoEntityId(action.entity)]: action.entity,
        },
      };

    default:
      return state;
  }
};
