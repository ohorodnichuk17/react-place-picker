import Error from "./components/Error.jsx";

export async function fetchAvaliablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if(!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return resData.places;
}