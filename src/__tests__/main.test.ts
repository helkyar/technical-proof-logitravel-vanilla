import * as addItemModule from "../components/addItem";
import * as removeItemModule from "../components/removeItem";
import * as openModalModule from "../components/openModal";
import * as closeModalModule from "../components/closeModal";
import * as selectItemsModule from "../components/selectItems";
import * as undoModule from "../components/undo";

jest.mock("../components/addItem"); 
jest.mock("../components/removeItem");
jest.mock("../components/openModal");
jest.mock("../components/closeModal");
jest.mock("../components/selectItems");
jest.mock("../components/undo");
jest.mock("../helpers/utils");

import { initApp } from "../main"; 

describe("Main component", () => {
beforeEach(() => {
  document.body.innerHTML = `<div id="app"></div>`;
});

test("initApp sets up DOM and calls modules", () => {
  initApp();

  expect(openModalModule.openModal).toHaveBeenCalled();
  expect(closeModalModule.closeModal).toHaveBeenCalled();
  expect(addItemModule.addItem).toHaveBeenCalled();
  expect(selectItemsModule.selectItems).toHaveBeenCalled();
  expect(removeItemModule.removeItem).toHaveBeenCalled();
  expect(undoModule.undo).toHaveBeenCalled();

  const app = document.querySelector("#app");
  expect(app).not.toBeNull();
  expect(app!.querySelector("ul.item-list")).not.toBeNull();
  expect(app!.querySelectorAll("li.item").length).toBeGreaterThan(0);
});
});