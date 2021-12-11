import "../styles/index.scss";
import { getJson } from "./services";

const selectorItems = document.querySelector("main .items");

const renderCars = async () => {
  const items = await getJson("http://www.cartrawler.com/ctabe/cars.json");
  console.log("items", items);
  console.log("selectorItems", selectorItems);
};

renderCars();
