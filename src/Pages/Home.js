import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryCard from "../Components/CountryCard";
import { getAllCountries } from "../Services/index";
import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

function Home() {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryName(event.target.value);
  };

  useEffect(() => {
    getAllCountries().then((result) => {
      const countries = result.data;
      setCountriesList(countries);
      console.log(countries);
      setFilteredCountriesList(countries);
    });
  }, []);

  // useEffect(() => {
  //   console.log(`Region : ${region} and Country : ${countryName}`);
  //   if (region === "" || countryName === "") {
  //     setFilteredCountriesList(countriesList);
  //   } else {
  //     const filteredCountryList = countriesList.filter((country) => {
  //       if (
  //         country.region.toLowerCase() === region.toLowerCase() &&
  //         country.name.toLowerCase().includes(countryName.toLowerCase())
  //       )
  //         return true;
  //       return false;
  //     });
  //     setFilteredCountriesList(filteredCountryList);
  //   }
  // }, [region, countriesList, countryName]);

  useEffect(() => {
    console.log(`Region : ${region} and Country : ${countryName}`);
    if (region === "" && countryName === "") {
      setFilteredCountriesList(countriesList);
    } else {
      let filteredCountryList = countriesList;
      if (region.length) {
        // filter based on region
        filteredCountryList = countriesList.filter((country) => {
          if (country.region === region) return true;
          return false;
        });
      }
      if (countryName.length) {
        // filter based on name
        filteredCountryList = countriesList.filter((country) => {
          if (country.name.toLowerCase().includes(countryName.toLowerCase()))
            return true;
          return false;
        });
      }
      setFilteredCountriesList(filteredCountryList);
    }
  }, [region, countryName, countriesList]);

  return (
    <div className="App">
      <div className="filter">
        <TextField
          id="outlined-basic"
          label="Filter by Name"
          variant="outlined"
          onChange={handleCountryChange}
          value={countryName}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Filter by region
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={region}
            label="Filter by region"
            onChange={handleRegionChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"africa"}>Africa</MenuItem>
            <MenuItem value={"americas"}>Americas</MenuItem>
            <MenuItem value={"asia"}>Asia</MenuItem>
            <MenuItem value={"europe"}>Europe</MenuItem>
            <MenuItem value={"oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="country-card-wrapper">
        {filteredCountriesList.map((country) => (
          <Link
            to={`/countries/${country.alpha3Code}`}
            key={country.alpha3Code}
            style={{ textDecoration: "none" }}
          >
            <CountryCard
              name={country.name}
              capital={country.capital}
              population={country.population}
              flagUrl={country.flags.png}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
