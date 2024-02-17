import React from 'react'

interface DailyWeatherProps {
  unit: string
  weatherForecastData?: WeatherForecastModel
  clickedIndex: number | null
  setClickedIndex: (value: number | null) => void
}

const DailyWeather = (props: DailyWeatherProps) => {
  const handleClick = (index: number) => {
    props.setClickedIndex(props.clickedIndex === index ? null : index)
  }
  return (
    <div className='flex flex-wrap cursor-pointer gap-10 p-4 w-5/6 font-lato rounded-xl justify-center md:justify-start'>
      {props.weatherForecastData?.forecast.forecastday.map((data, i: number) => (
        <div key={i} onClick={() => handleClick(i)} className='rounded-lg backdrop-blur-md'>
          <div className='flex px-3 mt-3'>{i == 0 ? 'Today' : i == 1 ? 'Tomorrow' : data.date}</div>
          <div className='flex gap-5 p-3'>
            <img src={data.day.condition.icon} alt='' />
            <div className='flex flex-col justify-center text-nowrap'>
              <div>
                Max:
                {props.unit === 'Celcius' ? ` ${data.day.maxtemp_c} °C` : ` ${data.day.maxtemp_f} °F`}
              </div>
              <div>
                Min:
                {props.unit === 'Celcius' ? ` ${data.day.mintemp_c} °C` : ` ${data.day.mintemp_f} °F`}
              </div>
            </div>
            <div className={`${props.clickedIndex === i ? 'flex items-center text-nowrap' : 'hidden'}`}>
              {data.day.condition.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DailyWeather
