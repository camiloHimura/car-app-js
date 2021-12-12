import get from "lodash/get";
import {
  infoUnavailable,
  getVendors,
  formatPickupReturnInformation,
} from "./helpers";

export const getAvailableCars = (list = []) =>
  list.filter((data) => data["@Status"] === "Available");

export const formatCars = (vendorName, list = []) =>
  list.map((data) => ({
    vendorName,
    code: get(data, "Vehicle.@Code", infoUnavailable),
    fuelType: get(data, "Vehicle.@FuelType", infoUnavailable),
    doorCount: get(data, "Vehicle.@DoorCount", infoUnavailable),
    driveType: get(data, "Vehicle.@DriveType", infoUnavailable),
    pictureURL: get(data, "Vehicle.PictureURL", infoUnavailable),
    codeContext: get(data, "Vehicle.@CodeContext", infoUnavailable),
    model: get(data, "Vehicle.VehMakeModel.@Name", infoUnavailable),
    price: Number(get(data, "TotalCharge.@RateTotalAmount", infoUnavailable)),
    airConditionInd: get(data, "Vehicle.@AirConditionInd", infoUnavailable),
    baggageQuantity: get(data, "Vehicle.@BaggageQuantity", infoUnavailable),
    transmissionType: get(data, "Vehicle.@TransmissionType", infoUnavailable),
    passengerQuantity: get(data, "Vehicle.@PassengerQuantity", infoUnavailable),
  }));

const getCarInfoDivs = (data) => `
        <span>${data.vendorName}</span>
        <span>${data.price}</span>
        <img alt="${data.model}" src="${data.pictureURL}" />
        <span>${data.model}</span>
        <span>${data.code}</span>
        <span>${data.codeContext}</span>
        <span>${data.airConditionInd === "true" ? "Yes" : "No"}</span>
        <span>${data.baggageQuantity}</span>
        <span>${data.doorCount}</span>
        <span>${data.driveType}</span>
        <span>${data.fuelType}</span>
        <span>${data.passengerQuantity}</span>
        <span>${data.transmissionType}</span>`;

export const getAvailableFormattedCars = (list = []) =>
  getVendors(list)
    .map(({ VehAvails, Vendor }) => {
      const vendorName = Vendor["@Name"];
      const availableCars = getAvailableCars(VehAvails);
      return formatCars(vendorName, availableCars);
    })
    .flat();

export const buildItemElements = (list = []) => {
  let fragment = document.createDocumentFragment();

  list.forEach((data) => {
    const container = document.createElement("div");
    container.innerHTML = getCarInfoDivs(data);
    container.classList.add("item");
    fragment.appendChild(container);
  });

  return fragment;
};

export const getFormatedPickupReturnInformation = (list = []) => {
  const info = formatPickupReturnInformation(
    get(list, "[0].VehAvailRSCore.VehRentalCore", {})
  );

  return {
    pickUpInfo: `PickUp: ${info.pickUpDateTime} - ${info.pickUpLocation}`,
    returnInfo: `Return: ${info.returnDateTime} - ${info.returnLocation}`,
  };
};
