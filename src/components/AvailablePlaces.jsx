import Places from './Places.jsx';
import {useEffect, useState} from "react";
import Error from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false);
    const [avaliablePlaces, setAvaliablePlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlaces() {
            try {
                const response = await fetch('http://localhost:3000/places');
                const resData = await response.json();

                if(!response.ok) {
                    throw new Error('Failed to fetch places');
                }

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
                    setAvaliablePlaces(sortedPlaces);
                    setIsFetching(false);
                });

            } catch (error) {
                setError({message: error.message || 'Could not fetch places. Try again later.'});
            }
            setIsFetching(false);
        }

        fetchPlaces();
    }, []);

    if(error) {
        return <Error title="An error occured!" message={error.message}/>;
    }

  return (
    <Places
      title="Available Places"
      places={avaliablePlaces}
      isLoading={isFetching}
      loadingText = "Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
