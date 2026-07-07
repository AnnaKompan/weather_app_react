import { useState, type ChangeEvent, useEffect, type FormEvent } from 'react';
import type { optionType, forecastType } from '../types';

const useForecast = () => {
  // term is what user inputs
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const getSearchOptions = async (value: string) => {
    try {
      // response.json() returns arr of objects
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
      );
      if (!response.ok) {
        const errTxt = await response.text();
        console.log(errTxt);
        return;
      }
      const data: optionType[] = await response.json();
      setOptions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Submitting', term);
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  useEffect(() => {
    if (term.length > 2) {
      getSearchOptions(term);
    } else {
      setOptions([]);
    }
  }, [term]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};

export default useForecast;
