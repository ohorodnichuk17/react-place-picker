import Places from './Places.jsx';
import {useEffect, useState} from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);

    useEffect(() => {
        async function fetchPlaces() {
            const response = await fetch('http://localhost:3000/places');
            const resData = await response.json();
            setAvaliablePlaces(resData.places);
        }

        fetchPlaces();
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
