export interface Weather {
  latitude?: number
  longitude?: number
  generationtime_ms?: number
  utc_offset_seconds?: number
  timezone?: string
  timezone_abbreviation?: string
  elevation?: number
  current_weather: CurrentWeather
  daily_units?: DailyUnits
  daily: Daily
}

export interface CurrentWeather {
  temperature: number
  windspeed?: number
  winddirection?: number
  weathercode: number
  is_day?: number
  time?: string
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
}

export interface Daily {
  time?: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
}
