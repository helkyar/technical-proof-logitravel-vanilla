import { disableDelete, saveToLocalStorage } from "../helpers/utils";

export function removeItem(
  removeBtn: HTMLButtonElement,
  itemList: HTMLUListElement,
  items: () => NodeListOf<HTMLLIElement>
) {
  removeBtn.addEventListener("click", () => {
    saveToLocalStorage(itemList);
    items().forEach((item) => {
      if (item.getAttribute("aria-selected") === "true") {
        item.remove();
        disableDelete();
      }
    });
    saveToLocalStorage(itemList, "currentItem");
  });
}
