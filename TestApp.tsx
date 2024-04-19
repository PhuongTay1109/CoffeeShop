/*eslint-disable */
import useCoffeeData from "./src/data/UseCoffeeData";

const MyComponent = () => {
  const coffeeData = useCoffeeData();
  
  console.log("Coffee fetch: ", JSON.stringify(coffeeData));

};


export default MyComponent;
