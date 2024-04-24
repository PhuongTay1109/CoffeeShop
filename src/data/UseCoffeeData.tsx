/*eslint-disable */
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";

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
  name: string;
  prices: Price[];
  roasted: string;
  special_ingredient: string;
  type: string;
}

const useCoffeeData = (): Coffee[] | null => {
  const [coffeeData, setCoffeeData] = useState<Coffee[] | null>(null);

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser != null) {
          const userEmail = currentUser.email;
          if (userEmail != null) {
            const userDocRef = db.collection('users').doc(userEmail);
            const doc = await userDocRef.get();
            if (doc.exists) {
              const userData = doc.data();
              if (userData && userData.ProductsList) {
                const data: Coffee[] = userData.ProductsList;
                setCoffeeData(data);
              }
            } else {
              console.log('No such document!');
            }
          }
        }

      } catch (error) {
        console.error('Error fetching coffee data:', error);
        setCoffeeData(null);
      }
    };

    fetchCoffeeData();
  }, []);

  return coffeeData;
};

export default useCoffeeData;
