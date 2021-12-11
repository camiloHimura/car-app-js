import isNull from "lodash/isNull";
import get from "lodash/get";
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

export const addNode = (parent, element) => {
  if (
    (!isElement(element) && element.nodeName !== "#document-fragment") ||
    !isElement(parent)
  ) {
    console.error("The parent or new element are not a valid dom node");
    return;
  }

  parent.appendChild(element);
};

export const updateNodeText = (element, text = "") => {
  if (!isElement(element)) {
    console.error("The parent or new element are not a valid dom node");
    return;
  }

  element.textContent = text;
};
