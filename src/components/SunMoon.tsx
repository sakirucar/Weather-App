import React from 'react'
import { Icon } from '@iconify/react'

interface SunMoonProps {
  unit: string
  weatherForecastData?: WeatherForecastModel
}
const convert12to24 = (time12?: string): string | undefined => {
  if (time12) {
    const [time, period] = time12?.split(' ')
    const [hours, minutes] = time?.split(':').map(Number)

    if (period === 'AM') {
      return `${hours === 12 ? '00' : hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    } else {
      return `${hours === 12 ? '12' : (hours + 12).toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}`
    }
  } else {
    return undefined
  }
}

const calculateTimeDifference = (start: string, end: string): string => {
  const startTime = new Date(`2000-01-01 ${start}`)
  const endTime = new Date(`2000-01-01 ${end}`)
  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1)
  }
  const timeDiff = endTime.getTime() - startTime.getTime()
  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours} hours ${minutes} minutes`
}

const setIconString = (phase?: string) => {
  const lowerPhase = phase?.toLowerCase()
  const kebabPhase = lowerPhase?.replace(/ /g, '-')

  return kebabPhase?.replace(/[^\w-]+/g, '')
}

const sunMoon = (props: SunMoonProps) => {
  const sunrise: string = props.weatherForecastData?.forecast.forecastday[0].astro.sunrise as string
  const sunset: string = props.weatherForecastData?.forecast.forecastday[0].astro.sunset as string
  const moonrise: string = props.weatherForecastData?.forecast.forecastday[0].astro.moonrise as string
  const moonset: string = props.weatherForecastData?.forecast.forecastday[0].astro.moonset as string
  const moon_phase: string = props.weatherForecastData?.forecast.forecastday[0].astro.moon_phase as string

  const phaseIcon: string = setIconString(moon_phase) as string

  const timeDifferenceSun = calculateTimeDifference(sunrise, sunset)
  const timeDifferenceMoon = calculateTimeDifference(moonrise, moonset)

  return (
    <div className='flex flex-col items-center w-full h-full backdrop-blur-md font-lato rounded-xl p-3'>
      <label className='flex justify-center'>Sun/Moon Cycle</label>
      <div className='flex w-full h-1/2'>
        <div className='flex flex-col items-center justify-center w-1/4'>
          <Icon fontSize={50} icon='meteocons:sunrise-fill' />
          <label> Sunrise </label>
          <div>{props.unit == 'Celcius' ? convert12to24(sunrise ?? undefined) : sunrise}</div>
        </div>
        <div className='flex justify-center items-center w-1/2'>{timeDifferenceSun}</div>
        <div className='flex flex-col items-center justify-center w-1/4'>
          <Icon fontSize={50} icon='meteocons:sunset' />
          <label> Sunset </label>
          <div>{props.unit == 'Celcius' ? convert12to24(sunset ?? undefined) : sunset}</div>
        </div>
      </div>
      <div className='flex w-full h-1/2'>
        <div className='flex flex-col items-center justify-center w-1/4'>
          <Icon fontSize={50} icon='meteocons:moonrise-fill' />
          <label> Moonrise </label>
          <div>{props.unit == 'Celcius' ? convert12to24(moonrise ?? undefined) : moonrise}</div>
        </div>
        <div className='flex flex-col justify-center items-center w-1/2'>
          <div>{timeDifferenceMoon}</div>
          <div className='flex flex-col items-center'>
            {moon_phase}
            <Icon fontSize={50} icon={`meteocons:moon-${phaseIcon}-fill`} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-1/4'>
          <Icon fontSize={50} icon='meteocons:moonset' />
          <label> Moonset </label>
          <div>{props.unit == 'Celcius' ? convert12to24(moonset ?? undefined) : moonset}</div>
        </div>
      </div>
    </div>
  )
}

export default sunMoon
