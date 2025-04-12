import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from './../AppContext';
import Spinner from "../LoadingSpinner/Spinner";

// Basic Details Step
const BasicDetails = ({ eventDetails, setEventDetails }) => {
  const fields = [
    { label: "Event Name", type: "text", name: "name", placeholder: "Event name" },
    { label: "Date and Time", type: "datetime-local", name: "dateTime" },
    { label: "Ticket Cost", type: "number", name: "ticketCost", placeholder: "Cost per person" },
    { label: "Total Tickets", type: "number", name: "totalTickets", placeholder: "Total tickets" },
    { label: "Genre", type: "text", name: "genre", placeholder: "Genre" },
    { label: "About", type: "text", name: "about", placeholder: "About the event" },
    { label: "Suitable for", type: "text", name: "suitableFor", placeholder: "Suitable for who" },
    { label: "Duration", type: "text", name: "duration", placeholder: "Event duration" },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ label, type, name, placeholder }) => (
        <div key={name}>
          <label className="block text-sm">{label}</label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={eventDetails[name]}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, [name]: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      ))}
    </div>
  );
};

// Address Details Step
const AddressDetails = ({ eventDetails, setEventDetails }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm">City</label>
      <input
        type="text"
        name="city"
        value={eventDetails.address.city}
        onChange={(e) =>
          setEventDetails({
            ...eventDetails,
            address: { ...eventDetails.address, city: e.target.value },
          })
        }
        placeholder="City"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <label className="block text-sm">Pincode</label>
      <input
        type="number"
        name="pincode"
        value={eventDetails.address.pincode}
        onChange={(e) =>
          setEventDetails({
            ...eventDetails,
            address: { ...eventDetails.address, pincode: e.target.value },
          })
        }
        placeholder="Pincode"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <label className="block text-sm">Venue</label>
      <input
        type="text"
        name="venue"
        value={eventDetails.address.venue}
        onChange={(e) =>
          setEventDetails({
            ...eventDetails,
            address: { ...eventDetails.address, venue: e.target.value },
          })
        }
        placeholder="Venue"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <label className="block text-sm">Landmark</label>
      <input
        type="text"
        name="landmark"
        value={eventDetails.address.landmark}
        onChange={(e) =>
          setEventDetails({
            ...eventDetails,
            address: { ...eventDetails.address, landmark: e.target.value },
          })
        }
        placeholder="Landmark"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};

// Terms and Conditions Step
const TermsAndConditionsComponent = ({
  termsAndConditions,
  setTermsAndConditions,
}) => {
  const [terms, setTerms] = useState("");

  const handleAddTerms = () => {
    if (terms) {
      setTermsAndConditions((prev) => [...prev, terms]);
      setTerms("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm">Enter Terms and Conditions</label>
      <input
        type="text"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddTerms}
        className="text-4xl font-extrabold"
      >
        +
      </button>
      <div>
        <h3>Added Terms:</h3>
        <ul>
          {termsAndConditions.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// What to Expect Step
const WhatToExpectComponent = ({ whatToExpect, setWhatToExpect }) => {
  const [expectation, setExpectation] = useState("");

  const addExpectation = () => {
    if (expectation.trim()) {
      setWhatToExpect((prev) => [...prev, expectation.trim()]);
      setExpectation("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm">What to Expect?</label>
      <input
        type="text"
        value={expectation}
        onChange={(e) => setExpectation(e.target.value)}
        placeholder="Expectation"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={addExpectation}
        className="text-4xl font-extrabold"
      >
        +
      </button>
      <ul>
        {whatToExpect.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Language Step
const LanguageComponent = ({ languages, setLanguages }) => {
  const [language, setLanguage] = useState("");

  const addLanguage = () => {
    if (language.trim()) {
      setLanguages((prev) => [...prev, language.trim()]);
      setLanguage("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm">Languages</label>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={addLanguage}
       className="text-4xl font-extrabold"
      >
        +
      </button>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

// Event Photos Step
const EventPhotos = ({ banner, setBanner, gallery, setGallery }) => {
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const handleBannerChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      setBanner(img);
    }
  };
  const addToGallery = () => {
    if (galleryPhoto) {
      setGallery((prev) => [...prev, galleryPhoto]);
      setGalleryPhoto(null);
    }
  };
  const handleGalleryPhotoChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      setGalleryPhoto(img);
    }
  };
  return (
    <div className="space-y-4">
      <label className="block text-sm">Banner Image</label>
      <input
        type="file"
        onChange={handleBannerChange}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />

      <label className="block text-sm">Gallery Images</label>
      <input
        type="file"
        onChange={handleGalleryPhotoChange}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={addToGallery}
       className="text-4xl font-extrabold"
      >
        + 
      </button>

      <h3>Gallery:</h3>
      <ul>
        {gallery.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Main Add Event Form
const AddEvent = () => {
  const [loading,setLoading]=useState(false)
  const { userDetails } = useContext(AppContext)
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    Object.entries(eventDetails).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    // Add files and other arrays
    formData.append("banner", banner);
    gallery.forEach((file) => formData.append("gallery", file));
    formData.append("city", eventDetails.address.city);
    formData.append("pincode", eventDetails.address.pincode);
    formData.append("landmark", eventDetails.address.landmark);
    formData.append("venue", eventDetails.address.venue);
    // Add arrays like termsAndConditions
    termsAndConditions.forEach((term, index) => formData.append(`termsAndConditions[${index}]`, term));
    whatToExpect.forEach((expectation, index) => formData.append(`whatToExpect[${index}]`, expectation));
    languages.forEach((language, index) => formData.append(`languages[${index}]`, language));
    
  
    axios
      .post("http://localhost:8080/admin/add-event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${userDetails.encodedCredentials}`
        },
      })
      .then((response) =>{
        setLoading(false)
      alert('successfully created the event')
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error)
      setLoading(false)
  });
     
  };

  const [eventDetails, setEventDetails] = useState({
    name: "",
    dateTime: "",
    ticketCost: "",
    totalTickets: "",
    duration: '',
    genre: "",
    about: "",
    suitableFor: "",
    address: {
      city: "",
      pincode: "",
      venue: "",
      landmark: "",
    },

  });
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [whatToExpect, setWhatToExpect] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [banner, setBanner] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-[10%] text-sm">
      {step === 1 && (
        <BasicDetails eventDetails={eventDetails} setEventDetails={setEventDetails} />
      )}
      {step === 2 && (
        <AddressDetails eventDetails={eventDetails} setEventDetails={setEventDetails} />
      )}
      {step === 3 && (
        <TermsAndConditionsComponent
          termsAndConditions={termsAndConditions}
          setTermsAndConditions={setTermsAndConditions}
        />
      )}
      {step === 4 && (
        <WhatToExpectComponent
          whatToExpect={whatToExpect}
          setWhatToExpect={setWhatToExpect}
        />
      )}
      {step === 5 && (
        <LanguageComponent languages={languages} setLanguages={setLanguages} />
      )}
      {step === 6 && (
        <EventPhotos banner={banner} setBanner={setBanner} gallery={gallery} setGallery={setGallery} />
      )}

      <div className="flex space-x-4 mt-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Previous
          </button>
        )}
        {step < 6 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Next
          </button>
        )}
        {step === 6 && (loading?<div className="flex justify-center px-6"><Spinner/></div>:
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default AddEvent;
