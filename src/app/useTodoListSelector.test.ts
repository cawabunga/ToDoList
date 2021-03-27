import { renderHook } from "@testing-library/react-hooks";
import { useTodoListSelector } from "./useTodoListSelector";

describe("useTodoListSelector", () => {
  it("should pick only relevant todo items", () => {
    let state = {
      byId: {
        1: { key: 1, todo: "foo" },
        2: { key: 2, todo: "bar" },
        3: { key: 3, todo: "baz" },
      },
      ids: [3, 2],
    };

    const { result } = renderHook(() => useTodoListSelector(state));

    expect(result.current).toEqual([
      { key: 3, todo: "baz" },
      { key: 2, todo: "bar" },
    ]);
  });
});
