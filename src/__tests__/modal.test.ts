import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { initApp } from "../main";

describe("Modal component", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  test("modal opens and closes", async () => {
    initApp();
    const modal = () => document.getElementById("addModal") as HTMLDivElement;

    const addBtn = document.getElementById("openModal") as HTMLButtonElement;
    await userEvent.click(addBtn);
    expect(modal()).not.toHaveAttribute('hidden');

    const cancelBtn = screen.getByText(/cancel/i);
    await userEvent.click(cancelBtn);
    expect(modal()).toHaveAttribute('hidden');
  });

  test("form submission works", async () => {
    initApp();
    const modal = () => document.getElementById("addModal") as HTMLDivElement;

    const addBtn = document.getElementById("openModal") as HTMLButtonElement;
    await userEvent.click(addBtn);
    expect(modal()).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Type the text here...");
    await userEvent.type(input, "New Item");

     const specificForm = document.getElementById(
      "addItemForm"
    ) as HTMLFormElement;
    const submitBtn = within(specificForm).getByRole("button", {
      name: /add/i,
    });
    await userEvent.click(submitBtn);

    const cancelBtn = screen.getByText(/cancel/i);
    await userEvent.click(cancelBtn);
    expect(screen.getByText(/new item/i)).toBeInTheDocument();
  });
});
