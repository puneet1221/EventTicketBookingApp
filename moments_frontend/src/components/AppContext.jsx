import axios from 'axios';
import { createContext, default as React, useEffect, useState } from 'react';
// Create a context
export const AppContext = createContext();
const normalizeCityName = (city) => {
  return city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Create a provider
export const AppContextProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState();
  const [login, setLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: '',
    username: '',
    password: '',
    role: '',
    bookedEventTickets: [],
    cart: {
      id: '',
      itemsList: []
    },
    encodedCredentials: ''
  });
  const [eventsList, setEventsList] = useState([]);
  const userLogin = () => {
    console.log(userDetails);
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
  };
  // On initial load, check sessionStorage for userDetails,fetching location from IP and fetching all the events near me
  useEffect(() => {
    const storedUserDetails = sessionStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails)); // Parse and set user details
      setLogin(true);
    }
    if (selectedCity == null) {
      axios.get("https://ipinfo.io/json?token=b55060c52f7400")
        .then((response) => {
          setSelectedCity(normalizeCityName(response.data.city));
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, []);
  // console.log(userDetails)

  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:8080/moments/get-eventslist?city=${selectedCity}`)
        .then((response) => {
          console.log(response.data)
          setEventsList(response.data);
          console.log('eventslist')
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [selectedCity])

  useEffect(() => {
    if (login) {
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails])
  const logout = () => {
    setLogin(false);
    sessionStorage.clear(); // Set login to false // Clear sessionStorage
    setUserDetails({
      username: '',
      password: '',
      role: '',
      bookedEventTickets: [],
      cart: {
        id: '',
        itemsList: []
      },
      encodedCredentials: ''
    }); // Reset user details state
  };
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  return (
    <AppContext.Provider value={{
      login,
      setLogin,
      logout,
      userLogin,
      formatDateTime,
      setUserDetails,
      userDetails,
      selectedCity,
      setSelectedCity,
      eventsList,
      setEventsList
    }}>
      {children}
    </AppContext.Provider>
  );
};
