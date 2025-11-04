import { closeModal } from "./components/closeModal";
import { openModal } from "./components/openModal";
import { removeItem } from "./components/removeItem";
import { addItem } from "./components/addItem";
import { selectItems } from "./components/selectItems";
import { undo } from "./components/undo";
import "./style.css";
import { loadFromLocalStorage } from "./helpers/utils";

const title = "This is a Technical proof";
const headerContent =
  "Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.";
const addText = "ADD";
const deleteText = "DELETE";
const cancelText = "CANCEL";
export function initApp() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
  <article class="proof-container">
  <header>
  <h1>${title}</h1>
  <p>${headerContent}</p>
  </header>
  
  <section aria-labelledby="element-list">
  <ul class="item-list" role="listbox" aria-label="Available items">
  <li class="item" aria-selected="false">Item 1</li>
  <li class="item selected" aria-selected="true">Item 2</li>
  <li class="item" aria-selected="false">Item 3</li>
  <li class="item" aria-selected="false">Item 4</li>
  </ul>
  </section>
  
  <footer class="actions">
  <div class="secondary-actions">
  <button id="undo" type="button" aria-label="Undo" class="undo">
  <span>⟲</span>
  </button>
  <button id="delete" type="button" class="delete">
  ${deleteText}
  </button>
  </div>
  <button id="openModal" type="button" class="btn-primary">${addText}</button>
  </footer>
  </article>
  </main>
  
  <div id="addModal" class="modal" role="dialog" aria-modal="true" hidden>
  <div class="modal-content">
  
  <form id="addItemForm">
  <label for="newItem" class="modal-label">Add item to list</label>
  <input
  type="text"
  id="newItem"
  name="newItem"
  placeholder="Type the text here..."
  required
  />
  <div class="modal-actions">
  <button id="addItem" type="submit" class="btn-primary">${addText}</button>
  <button type="button" id="closeModal" class="btn-outline modal-close" aria-label="Cerrar modal">${cancelText}</button>
  </div>
  </form>
  
  </div>
  </div>
  `;
  const modal = document.querySelector<HTMLDivElement>("#addModal")!;
  const closeBtn = document.querySelector<HTMLButtonElement>("#closeModal")!;
  const openBtn = document.querySelector<HTMLButtonElement>("#openModal")!;
  const addBtn = document.querySelector<HTMLButtonElement>("#addItem")!;
  const deleteBtn = document.querySelector<HTMLButtonElement>("#delete")!;
  const undoBtn = document.querySelector<HTMLButtonElement>("#undo")!;
  const itemList = document.querySelector<HTMLUListElement>(".item-list")!;
  const form = document.querySelector<HTMLFormElement>("#addItemForm")!;
  const input = document.querySelector<HTMLInputElement>("#newItem")!;
  const items = itemList.querySelectorAll<HTMLLIElement>(".item");
  const selectedItems = () =>
    itemList.querySelectorAll<HTMLLIElement>(".selected");

  loadFromLocalStorage(itemList, "currentItem");

  openModal(openBtn, modal, input);
  closeModal(closeBtn, modal);
  addItem(addBtn, form, itemList);
  selectItems(items);
  removeItem(deleteBtn, itemList, selectedItems);
  undo(undoBtn, itemList);
}
if (process.env.NODE_ENV !== "test") {
  initApp();
}