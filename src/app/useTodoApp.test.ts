import { act, renderHook } from "@testing-library/react-hooks";
import { useTodoApp } from "./useTodoApp";
import { makeTodoEntity } from "./TodoEntity";

describe("useTodoApp", () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should create todo list from default list", () => {
    const { result } = renderHook(() => useTodoApp());
    expect(result.current.todoItems).toHaveProperty("length", 5);
  });

  it("should put todo list to localStorage", () => {
    const { result } = renderHook(() => useTodoApp());
    expect(localStorage.getItem("myToDos")).toBeNull();
    act(() => {
      result.current.addTodoItem(makeTodoEntity(1, "foo"));
    });
    expect(localStorage.getItem("myToDos")).not.toBeNull();
  });
});
