import Places from './Places.jsx';
import {useEffect, useState} from "react";
import Error from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvaliablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false);
    const [avaliablePlaces, setAvaliablePlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlaces() {
            try {
                const olaces = await fetchAvaliablePlaces();

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        position.coords.latitude,
                        position.coords.longitude
                    );
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
