import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { initApp } from "../main";

describe("List component", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    localStorage.clear();
  });

  test("clicking items toggle select", async () => {
    initApp();
    const item = screen.getByText(/item 1/i);
    await userEvent.click(item);
    expect(item).toHaveClass(/selected/i); 
    await userEvent.click(item);
    expect(item).not.toHaveClass(/selected/i);
  });
  test("delete works if selected items", async () => {
    initApp();
    const item = screen.getByText(/item 1/i);
    await userEvent.click(item);
    const deleteBtn = screen.getByText(/delete/i);
    await userEvent.click(deleteBtn);
    expect(item).not.toBeInTheDocument();
  });
  test("doble click deletes item", async () => {
    initApp();
    const item = screen.getByText(/item 2/i);
    await userEvent.dblClick(item);
    expect(item).not.toBeInTheDocument();
  });
  test("delete works if selected items", async () => {
    initApp();
    const item = screen.getByText(/item 3/i);
    await userEvent.dblClick(item);
    expect(item).not.toBeInTheDocument();
    const undoBtn = screen.getByText(/⟲/i);
    await userEvent.click(undoBtn);
    expect(screen.getByText(/item 3/i)).toBeInTheDocument();
  });
});
