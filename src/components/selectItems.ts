import { addItemListeners } from "../helpers/utils";

export function selectItems(items: NodeListOf<HTMLLIElement>) {
  items.forEach((item) => {
    addItemListeners(item);
  });
}
