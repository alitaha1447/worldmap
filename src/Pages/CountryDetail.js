import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../Services";
import "./CountryDetail.css";

export default function CountryDetail(props) {
  const { countryCode } = useParams();
  const [countriesList, setCountriesList] = useState({});

  useEffect(() => {
    getCountryDetail(countryCode).then((result) => {
      console.log(result.data);
      setCountriesList(result.data);
    });
  }, [countryCode]);

  console.log(countryCode);

  return (
    <div className="country-detail-wrapper">
      <div>
        <img src={countriesList.flags?.png} alt={countriesList.name} />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <p>Name : {countriesList.name}</p>
        <p>Capital : {countriesList.capital}</p>
        <p>Population : {countriesList.population}</p>
        <p>Currency : {countriesList.currencies?.map((cur) => cur.name)}</p>
        <p>Code : {countriesList.alpha3Code}</p>
      </div>
    </div>
  );
}
