import React from "react";
import { Autocomplete, Switch, TextField } from "@mui/material";

interface NavbarProps {
  unit: string;
  city: string;
  setUnit: (value: string) => void;
  locationData: any;
  setCity: (value: string) => void;
  onSearch: () => void;
  weatherForecastMutate: () => void;
}

const Navbar = (props: NavbarProps) => {
  const options: string[] = ["Celcius", "Fahrenheit"];

  const handleSearchClick = () => {
    props.onSearch();
    props.weatherForecastMutate();
  };

  interface AutocompleteOption {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
  }

  const locations: AutocompleteOption[] = props.locationData ?? [];

  return (
    <div className="bg-gray-500">
      <nav className="flex">
        <div className="flex">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locations}
            getOptionLabel={(option) => option.name}
            onChange={handleSearchClick}
            onClick={handleSearchClick}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                onChange={(e) => props.setCity(e.target.value)}
                {...params}
                label="Cities"
              />
            )}
          />
        </div>
        <div className="flex justify-end items-center bg-red-500 w-1/3">
          <label>Celcius</label>
          <Switch
            checked={props.unit === "Fahrenheit"}
            onChange={() =>
              props.setUnit(
                props.unit === "Fahrenheit" ? "Celcius" : "Fahrenheit"
              )
            }
          />
          <label>Fahrenheit</label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
