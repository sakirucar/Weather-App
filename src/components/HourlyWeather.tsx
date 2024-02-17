import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface HourlyWeatherProps {
  unit: string
  weatherForecastData?: WeatherForecastModel
  clickedIndex: number | null
  setClickedIndex: (value: number | null) => void
}

const HourlyWeather = (props: HourlyWeatherProps) => {
  const [startIndex, setStartIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const containerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current?.clientWidth !== undefined && containerRef.current?.clientWidth !== width) {
        setWidth(containerRef.current?.clientWidth)
        setStartIndex(0)
      }
    })
    resizeObserver.observe(containerRef?.current as Element)
  })

  const timetoclock = (basetime?: string): string | undefined => {
    const clock = basetime?.split(' ')
    return clock ? clock[1] : undefined
  }

  const handleNextClick = () => {
    setStartIndex(prevIndex =>
      width <= 600
        ? prevIndex + 1
        : width <= 768
        ? prevIndex + 2
        : width <= 992
        ? prevIndex + 4
        : width <= 1200
        ? prevIndex + 6
        : prevIndex + 8
    )
  }

  const handlePrevClick = () => {
    setStartIndex(prevIndex =>
      width <= 600
        ? prevIndex - 1
        : width <= 768
        ? prevIndex - 2
        : width <= 992
        ? prevIndex - 4
        : width <= 1200
        ? prevIndex - 6
        : prevIndex - 8
    )
  }

  return (
    <div className='flex flex-col items-center font-lato'>
      <div className='flex  w-5/6 h-96 justify-center gap-5 p-2'>
        <div className='flex items-center'>
          <button
            className='flex rounded-full items-center cursor-pointer backdrop-blur-md'
            onClick={handlePrevClick}
            disabled={startIndex === 0}
          >
            <Icon fontSize={30} icon='ic:round-arrow-back-ios-new' />
          </button>
        </div>

        <div ref={containerRef} className='flex w-full items-center justify-center gap-5 p-3 '>
          {props.weatherForecastData?.forecast.forecastday[props.clickedIndex ? props.clickedIndex : 0]?.hour
            .slice(
              startIndex,
              width <= 600
                ? startIndex + 1
                : width <= 768
                ? startIndex + 2
                : width <= 992
                ? startIndex + 4
                : width <= 1200
                ? startIndex + 6
                : startIndex + 8
            )
            .map((hourData: HourData, i: number) => (
              <div key={i} className={`flex justify-center   lg:w-1/6 backdrop-blur-md rounded-xl`}>
                <div className='flex flex-col text-nowrap h-80 w-full p-5'>
                  <div>{timetoclock(hourData.time ?? undefined)}</div>
                  <div>
                    <img className='flex w-32 h-32' src={hourData.condition.icon} alt='' />
                    <div className='font-semibold'>
                      {props.unit === 'Celcius' ? `${hourData.temp_c}°C` : `${hourData.temp_f}°F`}
                    </div>
                    <div className='w-32'>{hourData.condition.text}</div>
                  </div>
                  <div>
                    <div className='flex w-32 items-center'>
                      <Icon fontSize={30} icon='meteocons:wind-fill' />
                      Wind: {props.unit === 'Celcius' ? `${hourData.wind_kph} kmh` : `${hourData.wind_mph} mph`}
                    </div>
                    <div className='flex w-32 items-center'>
                      <Icon fontSize={30} icon='meteocons:humidity-fill' />
                      Humidiy: {hourData.humidity}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='flex items-center'>
          <button
            className='flex rounded-full items-center cursor-pointer backdrop-blur-md '
            onClick={handleNextClick}
            disabled={
              width <= 600
                ? startIndex === 23
                : width <= 768
                ? startIndex === 22
                : width <= 992
                ? startIndex === 20
                : startIndex === 16
            }
          >
            <Icon fontSize={30} icon='ic:round-arrow-forward-ios' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HourlyWeather
