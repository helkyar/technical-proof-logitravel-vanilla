import { loadFromLocalStorage } from "../helpers/utils";

export function undo(undobtn: HTMLButtonElement, itemList: HTMLUListElement) {
  undobtn.addEventListener("click", () => loadFromLocalStorage(itemList));
}
