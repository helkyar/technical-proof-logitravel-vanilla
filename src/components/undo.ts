import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/utils";

export function undo(undobtn: HTMLButtonElement, itemList: HTMLUListElement) {
  undobtn.addEventListener("click", () => {
    loadFromLocalStorage(itemList)
    saveToLocalStorage(itemList, "currentItem");
  });
}
