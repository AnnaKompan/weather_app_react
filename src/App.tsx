import './App.css';
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import type optionType from './types';
import Search from './components/Search';

function App() {
  // term is what user inputs
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const getSearchOptions = async (value: string) => {
    try {
      // response.json() returns arr of objects
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
      );
      console.log(response.status);
      if (!response.ok) {
        const errTxt = await response.text();
        console.log(errTxt);
        return;
      }
      const data: optionType[] = await response.json();
      setOptions(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('Finally');
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <main className="flex justify-center items-center bg-linear-to-br from-sky-400 via-rose-400 to-lime-400 h-screen w-full">
      <Search
        term={term}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
      ></Search>
    </main>
  );
}

export default App;
