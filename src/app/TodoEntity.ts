import { prop } from "./utils";

export interface TodoEntity {
  key: string | number;
  todo: string;
}

export type TodoEntityId = TodoEntity["key"];

export const todoEntityId = prop("key");

export const makeTodoEntity = (
  id: TodoEntityId,
  text: TodoEntity["todo"],
  data: Partial<TodoEntity> = {}
): TodoEntity => ({
  key: id,
  todo: text,
  ...data,
});
