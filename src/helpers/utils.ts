export function addItemListeners(item: HTMLLIElement) {
  const itemList = item.parentElement as HTMLUListElement;
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
    const isSelected = item.getAttribute("aria-selected") === "true";
    item.setAttribute("aria-selected", String(!isSelected));
    disableDelete();
    saveToLocalStorage(itemList, "currentItem");
  });
  item.addEventListener("dblclick", () => {
    saveToLocalStorage(itemList);
    item.remove();
    disableDelete();
    saveToLocalStorage(itemList, "currentItem");
  });
}

export function disableDelete() {
  const deleteBtn = document.querySelector<HTMLButtonElement>("#delete")!;
  const itemList = document.querySelector<HTMLUListElement>(".item-list")!;
  const selectedItems = itemList.querySelectorAll<HTMLLIElement>(".selected");
  if (selectedItems.length === 0) {
    deleteBtn.setAttribute("disabled", "true");
  } else if (deleteBtn.hasAttribute("disabled")) {
    deleteBtn.removeAttribute("disabled");
  }
}

type Key = "prevItem" | "currentItem";
export function saveToLocalStorage(
  itemList: HTMLUListElement,
  key: Key = "prevItem"
) {
  const items = itemList.querySelectorAll<HTMLLIElement>(".item");
  const itemsArray = Array.from(items).map((item) => ({
    text: item.textContent,
    selected: item.getAttribute("aria-selected") === "true",
  }));
  localStorage.setItem(key, JSON.stringify(itemsArray));
}

export function loadFromLocalStorage(
  itemList: HTMLUListElement,
  key: Key = "prevItem"
) {
  const data = localStorage.getItem(key);
  if (data) {
    const itemsArray: { text: string | null; selected: boolean }[] =
      JSON.parse(data);
    itemList.innerHTML = "";
    itemsArray.forEach((itemData) => {
      const newItem = document.createElement("li");
      newItem.textContent = itemData.text;
      newItem.setAttribute("aria-selected", String(itemData.selected));
      newItem.classList.add("item");
      if (itemData.selected) {
        newItem.classList.add("selected");
      }
      itemList.appendChild(newItem);
      addItemListeners(newItem);
    });
    disableDelete();
  }
}
