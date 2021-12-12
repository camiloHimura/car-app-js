import get from "lodash/get";
import isNull from "lodash/isNull";
import sortBy from "lodash/sortBy";
import isElement from "lodash/isElement";

export const getVendors = (list = []) =>
  get(list, "[0].VehAvailRSCore.VehVendorAvails", []);

export const infoUnavailable = " -- ";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return isNull(date)
    ? infoUnavailable
    : new Intl.DateTimeFormat("default", options).format(new Date(date));
};

export const formatPickupReturnInformation = (data = {}) => ({
  pickUpDateTime: formatDate(get(data, "@PickUpDateTime", null)),
  returnDateTime: formatDate(get(data, "@ReturnDateTime", null)),
  pickUpLocation: get(data, "PickUpLocation.@Name", infoUnavailable),
  returnLocation: get(data, "PickUpLocation.@Name", infoUnavailable),
});
// prettier-ignore
export const runWhenValidNodes =
(callback) =>
(...nodes) =>
nodes.every(
  (node) => isElement(node) || node.nodeName === "#document-fragment"
  ) && callback(...nodes);

// prettier-ignore
const runWhenFirstValidNode =
  (callback) =>
    (...elements) => {
      const [node] = elements;
      return runWhenValidNodes(() => callback(...elements))(node);
    };

export const addNode = runWhenValidNodes((parent, element) => {
  parent.appendChild(element);
});

export const removeAllChildNodes = runWhenValidNodes((parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
});

export const updateNodeText = runWhenFirstValidNode((element, text = "") => {
  element.textContent = text;
});

export const sortListBy = runWhenFirstValidNode((orderSelector, list = []) => {
  const property = get(orderSelector, "selectedOptions.[0].dataset.value", "");

  return sortBy(list, [property]);
});
