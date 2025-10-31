export function addItemListeners(item: HTMLLIElement) {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
    const isSelected = item.getAttribute("aria-selected") === "true";
    item.setAttribute("aria-selected", String(!isSelected));
    disableDelete();
  });
  item.addEventListener("dblclick", () => {
    saveToLocalStorage(item.parentElement as HTMLUListElement);
    item.remove();
    disableDelete();
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

export function saveToLocalStorage(itemList: HTMLUListElement) {
  const items = itemList.querySelectorAll<HTMLLIElement>(".item");
  const itemsArray = Array.from(items).map((item) => ({
    text: item.textContent,
    selected: item.getAttribute("aria-selected") === "true",
  }));
  localStorage.setItem("itemList", JSON.stringify(itemsArray));
}

export function loadFromLocalStorage(itemList: HTMLUListElement) {
    const data = localStorage.getItem("itemList");
    if (data) {
        const itemsArray: { text: string | null; selected: boolean }[] = JSON.parse(data);
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