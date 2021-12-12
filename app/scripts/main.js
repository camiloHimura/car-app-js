import "../styles/index.scss";
import { getJson } from "./services";
import {
  addNode,
  updateNodeText,
  sortListBy,
  removeAllChildNodes,
} from "./helpers";
import {
  buildItemElements,
  getAvailableFormattedCars,
  getFormatedPickupReturnInformation,
} from "./car";

const selectorItems = document.querySelector("main .items");
const selectorHeaders = document.querySelector("main .headers");
const selectorOrder = document.querySelector("main .orderSelector");
const selectorPickupInfo = document.querySelector("main .pickupInformation");
const selectorReturnInfo = document.querySelector("main .returnInformation");

const sortAndBuiltItemCars = (list = []) => {
  const orderedList = sortListBy(selectorOrder, list);
  return buildItemElements(orderedList);
};

const renderCars = (itemsNodes) => {
  addNode(selectorItems, itemsNodes);
};

const renderPickupReturnInfo = ({ pickUpInfo, returnInfo }) => {
  updateNodeText(selectorPickupInfo, pickUpInfo);
  updateNodeText(selectorReturnInfo, returnInfo);
};

const addListeners = (formattedCars = []) => {
  const updateLeftScroll = ({ target }) =>
    (selectorHeaders.scrollLeft = target.scrollLeft);

  const removeAllAndAddsortedItems = () => {
    removeAllChildNodes(selectorItems);
    renderCars(sortAndBuiltItemCars(formattedCars));
  };

  selectorItems.addEventListener("scroll", updateLeftScroll);
  selectorOrder.addEventListener("change", removeAllAndAddsortedItems);
};

const init = async () => {
  const items = await getJson("http://www.cartrawler.com/ctabe/cars.json");
  const formattedCars = getAvailableFormattedCars(items);
  addListeners(formattedCars);
  renderCars(sortAndBuiltItemCars(formattedCars));
  renderPickupReturnInfo(getFormatedPickupReturnInformation(items));
};

init();
