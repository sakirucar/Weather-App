import React from 'react'
import { Icon } from '@iconify/react'
import { Autocomplete, Switch, TextField } from '@mui/material'

interface NavbarProps {
  unit: string
  city: string
  setUnit: (value: string) => void
  locationData: any
  setCity: (value: string) => void
  onSearch: () => void
  weatherForecastMutate: () => void
}

const Navbar = (props: NavbarProps) => {
  const handleSearchClick = () => {
    props.onSearch()
    props.weatherForecastMutate()
  }

  interface AutocompleteOption {
    id: number
    name: string
    region: string
    country: string
    lat: number
    lon: number
    url: string
  }

  const locations: AutocompleteOption[] = props.locationData ?? []

  return (
    <nav className='flex justify-end bg-gradient-to-b from-sky-500 font-lato'>
      <div className='flex items-center justify-end w-1/2 p-3'>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={locations}
          getOptionLabel={option => option.name}
          onChange={handleSearchClick}
          onClick={handleSearchClick}
          sx={{ width: 300 }}
          renderInput={params => (
            <TextField
              className=' rounded-lg'
              onChange={e => props.setCity(e.target.value)}
              {...params}
              label='Search Location'
            />
          )}
        />
      </div>
      <div className='flex justify-end items-center w-1/2'>
        <Icon fontSize={70} icon='meteocons:celsius-fill' />
        <Switch
          checked={props.unit === 'Fahrenheit'}
          onChange={() => props.setUnit(props.unit === 'Fahrenheit' ? 'Celcius' : 'Fahrenheit')}
        />
        <Icon fontSize={70} icon='meteocons:fahrenheit-fill' />
      </div>
    </nav>
  )
}

export default Navbar
