import { todoListReducer } from "./todoListReducer";
import { makeTodoEntity } from "./TodoEntity";

describe("todoListReducer", () => {
  let emptyState = { ids: [], byId: {} };

  it("should populate state with provided todo list", () => {
    const state = todoListReducer(emptyState, {
      type: "POPULATE",
      entities: [makeTodoEntity(1, "foo"), makeTodoEntity(2, "bar")],
    });

    expect(state).toEqual({
      ids: [1, 2],
      byId: {
        1: expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
        2: expect.objectContaining({
          key: 2,
          todo: "bar",
        }),
      },
    });
  });

  it("should add todo item", () => {
    const state = todoListReducer(emptyState, {
      type: "ADD_ITEM",
      entity: makeTodoEntity(1, "foo"),
    });

    expect(state).toEqual(
      expect.objectContaining({
        ids: [1],
        byId: {
          1: expect.objectContaining({
            key: 1,
            todo: "foo",
          }),
        },
      })
    );
  });

  it("should remove todo item by id", () => {
    const state = todoListReducer(
      {
        ids: [1],
        byId: {
          1: makeTodoEntity(1, "foo"),
        },
      },
      {
        type: "REMOVE_ITEM",
        entityId: 1,
      }
    );

    expect(state).toEqual({
      ids: [],
      byId: {
        1: expect.objectContaining({
          key: 1,
          todo: "foo",
        }),
      },
    });
  });

  it("should update todo item", () => {
    const state = todoListReducer(
      {
        ids: [1],
        byId: {
          1: makeTodoEntity(1, "foo"),
        },
      },
      {
        type: "UPDATE_ITEM",
        entity: makeTodoEntity(1, "bar"),
      }
    );

    expect(state).toEqual({
      ids: [1],
      byId: {
        1: expect.objectContaining({
          key: 1,
          todo: "bar",
        }),
      },
    });
  });
});
