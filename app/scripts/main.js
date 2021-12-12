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
import {
  getImgParent,
  getVendorAndModel,
  findCarByModelAndVendor,
  buildBodyStructure,
} from "./dialog";

const selectorDialog = document.querySelector("main #dialog");
const selectorDialogClose = document.querySelector("main .close");
const selectorDialogContent = selectorDialog.querySelector(".content");
const selectorItems = document.querySelector("main .items");
const selectorHeaders = selectorItems.querySelector("main .headers");
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

  const openModalAndRenderCarInfo = getImgParent((element) => {
    const { vendorName, model } = getVendorAndModel(element);
    const car = findCarByModelAndVendor(formattedCars, vendorName, model);
    removeAllChildNodes(selectorDialogContent);
    selectorDialogContent.innerHTML = buildBodyStructure(car);
    selectorDialog.showModal();
  });

  selectorItems.addEventListener("scroll", updateLeftScroll);
  selectorOrder.addEventListener("change", removeAllAndAddsortedItems);
  selectorItems.addEventListener("click", openModalAndRenderCarInfo);
  selectorDialogClose.addEventListener("click", () => selectorDialog.close());
};

const init = async () => {
  const items = await getJson("http://www.cartrawler.com/ctabe/cars.json");
  const formattedCars = getAvailableFormattedCars(items);
  addListeners(formattedCars);
  renderCars(sortAndBuiltItemCars(formattedCars));
  renderPickupReturnInfo(getFormatedPickupReturnInformation(items));
};

init();
