import { runWhenValidNodes } from "./helpers";

export const findCarByModelAndVendor = (list = [], vendorName, model) =>
  list.filter((car) => car.vendorName === vendorName && car.model === model)[0];

// prettier-ignore
export const getImgParent =
  (callback) =>
    ({ target }) =>
      runWhenValidNodes(
        (element) => element.nodeName === "IMG" && callback(element.parentNode)
      )(target);

export const getVendorAndModel = runWhenValidNodes((element) => {
  const { model = "", vendorName = "" } = element.dataset;
  return { model, vendorName };
});

export const buildBodyStructure = (data) => {
  return `<div class="--flex --flexBetween">
            <h4>Vendor</h4> <div>${data.vendorName}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Price</h4> <div>${data.price}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Model</h4> <div>${data.model}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Code</h4> <div>${data.code}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Code Text</h4> <div>${data.codeContext}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Air Conditioner</h4> <div>${data.airConditionInd}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Baggage Quantity</h4> <div>${data.baggageQuantity}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Door Count</h4> <div>${data.doorCount}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Drive Type</h4> <div>${data.driveType}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Fuel Type</h4> <div>${data.fuelType}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Passenger Quantity</h4> <div>${data.passengerQuantity}</div>
          </div>
          <div class="--flex --flexBetween">
            <h4>Transmission Type</h4> <div>${data.transmissionType}</div>
          </div>`;
};
