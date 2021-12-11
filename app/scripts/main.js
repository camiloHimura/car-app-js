import "../styles/index.scss";
import { getJson } from "./services";
import { addNode, updateNodeText } from "./helpers";
import {
  buildItemElements,
  getAvailableFormattedCars,
  getFormatedPickupReturnInformation,
} from "./car";

const selectorItems = document.querySelector("main .items");
const selectorHeaders = document.querySelector("main .headers");
const selectorPickupInfo = document.querySelector("main .pickupInformation");
const selectorReturnInfo = document.querySelector("main .returnInformation");

const renderCars = async () => {
  const items = await getJson("http://www.cartrawler.com/ctabe/cars.json");
  console.log("items", items);
  const formattedCars = getAvailableFormattedCars(items);
  const itemsNodes = buildItemElements(formattedCars);
  const { pickUpInfo, returnInfo } = getFormatedPickupReturnInformation(items);

  addNode(selectorItems, itemsNodes);
  updateNodeText(selectorPickupInfo, pickUpInfo);
  updateNodeText(selectorReturnInfo, returnInfo);
};

const addListeners = () => {
  selectorItems.addEventListener("scroll", (event) => {
    selectorHeaders.scrollLeft = event.target.scrollLeft;
  });
};

renderCars();
addListeners();
