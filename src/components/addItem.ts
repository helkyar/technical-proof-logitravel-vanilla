import { addItemListeners, saveToLocalStorage } from "../helpers/utils";

export function addItem(
  addBtn: HTMLButtonElement,
  form: HTMLFormElement,
  itemList: HTMLUListElement
) {
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const itemName = formData.get("newItem") as string;
    if (itemName) {
      saveToLocalStorage(itemList);
      const newItem = document.createElement("li");
      newItem.textContent = itemName;
      newItem.setAttribute("aria-selected", "false");
      newItem.classList.add("item");
      itemList?.appendChild(newItem);
      addItemListeners(newItem);
      form.reset();
    }
  });
}
