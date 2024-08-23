import Places from './Places.jsx';
import {useEffect, useState} from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/places')
            .then((response) => {
                return response.json();
            })
            .then((resData) => {
                setAvaliablePlaces(resData.places);
            });
    }, []);

  return (
    <Places
      title="Available Places"
      places={avaliablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
