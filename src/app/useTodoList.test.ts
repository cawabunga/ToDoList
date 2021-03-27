import { act, renderHook } from "@testing-library/react-hooks";
import { useTodoList } from "./useTodoList";
import { makeTodoEntity } from "./TodoEntity";

describe("useTodoList", () => {
  it("should create default state", () => {
    const { result } = renderHook(() => useTodoList());
    expect(result.current.state).toEqual({
      byId: {},
      ids: [],
    });
  });

  it("should populate state", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.populateList([
        makeTodoEntity(2, "bar"),
        makeTodoEntity(1, "foo"),
      ]);
    });

    expect(result.current.state).toEqual({
      byId: {
        "1": expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
        "2": expect.objectContaining({
          key: 2,
          todo: "bar",
        }),
      },
      ids: [2, 1],
    });
  });

  it("should add todo item", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodoItem(makeTodoEntity(1, "foo"));
    });

    expect(result.current.state).toEqual({
      byId: {
        "1": expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
      },
      ids: [1],
    });
  });

  it("should update todo item", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.populateList([
        makeTodoEntity(2, "bar"),
        makeTodoEntity(1, "foo"),
      ]);

      result.current.updateTodoItem(makeTodoEntity(2, "baz"));
    });

    expect(result.current.state).toEqual({
      byId: {
        "1": expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
        "2": expect.objectContaining({
          key: 2,
          todo: "baz",
        }),
      },
      ids: [2, 1],
    });
  });

  it("should remove todo item", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.populateList([
        makeTodoEntity(2, "bar"),
        makeTodoEntity(1, "foo"),
      ]);

      result.current.removeTodoItem(1);
    });

    expect(result.current.state).toEqual({
      byId: {
        "1": expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
        "2": expect.objectContaining({
          key: 2,
          todo: "bar",
        }),
      },
      ids: [2],
    });
  });
});
