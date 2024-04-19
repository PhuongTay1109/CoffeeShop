/*eslint-disable */
import { useEffect, useState } from 'react';
import getFirestore from "@react-native-firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

interface Price {
  size: string;
  price: number;
  currency: string;
}

interface Coffee {
  average_rating: number;
  description: string;
  favourite: boolean;
  id: string;
  imagelink_portrait: string;
  imagelink_square: string;
  index: number;
  ingredients: string;
  name: string;
  prices: Price[];
  ratings_count: string; // Consider changing this to number
  roasted: string;
  special_ingredient: string;
  type: string;
}

const CoffeeData = (): Coffee[] | null => {
  const [coffeeData, setCoffeeData] = useState<Coffee[] | null>(null);

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const coffeeCollection = db.collection('coffees');
        const snapshot = await coffeeCollection.get();
        const data: Coffee[] = snapshot.docs.map(doc => {
          const docData = doc.data();
          const prices: Price[] = docData.prices.map((price: any) => ({
            size: price.size,
            price: parseFloat(price.price), // Parse string to number
            currency: price.currency
          }));
          return {
            id: doc.id,
            ...docData,
            prices,
            index: snapshot.docs.findIndex(d => d.id === doc.id)
          };
        });
        setCoffeeData(data);
      } catch (error) {
        console.error('Error fetching coffee data:', error);
        setCoffeeData(null);
      }
    };

    fetchCoffeeData();
  }, []);

  console.log("Coffee fetch: ", coffeeData);

  return coffeeData;
};

export default CoffeeData;
