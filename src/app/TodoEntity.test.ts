import { todoEntityId } from "./TodoEntity";

describe("todoEntityId", () => {
  it("should return identifier of shape alike todo item", () => {
    expect(todoEntityId({ key: "foo" })).toEqual("foo");
  });
});
