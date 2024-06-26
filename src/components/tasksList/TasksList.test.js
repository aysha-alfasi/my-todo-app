import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import TasksList from "./TasksList";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

describe("Testing the start of the project", () => {
  test("should render an empty input and button", () => {
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const inputElement = screen.getByRole("textbox", { name: "input" });
    const buttonElement = screen.getByRole("button", { name: "Add Task" });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
    expect(buttonElement).toBeInTheDocument();
  });

  test('Should show "waiting for your tasks img" when the list item is empty', () => {
    render(
      <Provider store={store}>
        <TasksList tasksList={[]} />
      </Provider>
    );
    const imgElement = screen.getByRole("img", { name: "waiting for tasks" });
    expect(imgElement).toBeInTheDocument();
  });
});

describe("deleting a button", () => {
  test("Should remove a task when it delete btn is clicked", async () => {
    user.setup();
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const inputElement = screen.getByRole("textbox", { name: "input" });
    const buttonElement = screen.getByRole("button", { name: "Add Task" });

    await user.type(inputElement, "eat some sweet");
    await user.click(buttonElement);

    const tasks = screen.getByRole("listitem");

    const deleteBtnElement = screen.getByRole("button", { name: "delete" });

    await user.click(deleteBtnElement);
    expect(tasks).not.toBeInTheDocument();
  });
});

describe("Add Task - Complete task style - Default select menu option", () => {
  test("Should rander the submitted Tasks, change complete style when complete btn is clicked, reset tha value of Add task input", async () => {
    user.setup();
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const inputElement = screen.getByRole("textbox", { name: "input" });
    const buttonElement = screen.getByRole("button", { name: "Add Task" });

    await user.type(inputElement, "water the flowers");
    await user.click(buttonElement);

    const completeBtn = screen.getByRole("button", { name: "complete" });
    await user.click(completeBtn);

    await user.type(inputElement, "draw a nice tree");
    await user.click(buttonElement);

    const tasks = screen.getAllByRole("listitem");

    expect(tasks[0]).toHaveTextContent("water the flowers");
    expect(tasks[1]).toHaveTextContent("draw a nice tree");
    expect(tasks[0]).toHaveClass("isCompleted");
    expect(tasks).toHaveLength(2);
    expect(inputElement).toHaveValue("");
  });

  test("should set default option correctly for the select menu", () => {
    user.setup();
    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    const defaultOptionElement = screen.getByRole("option", {
      name: "All ♡⋆˚",
    }).selected;

    expect(defaultOptionElement).toBe(true);
  });
});
