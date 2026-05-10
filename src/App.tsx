import './App.css';
import React, { useState, type ChangeEvent, type FormEvent } from 'react';

function App() {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = async (value: string) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
      );
      const data: [] = await response.json();
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

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = term.trim();
    if (!value) return;
    getSearchOptions(value);
  };

  return (
    <main className="flex justify-center items-center bg-linear-to-br from-sky-400 via-rose-400 to-lime-400 h-screen w-full">
      <section className="w-full md:max-w-125 p-4  flex  flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-125 bg-white/50 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 flex items-center gap-2 md:mt-4"
        >
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            className="px-2 py-1 bg-white text-black rounded-md border border-amber-50 italic border-r-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
            placeholder="Type city..."
          />
          {options.map((option: { name: string }) => (
            <p>{option.name}</p>
          ))}
          <button
            type="submit"
            className="rounded border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-200 px-2 py-1 cursor-pointer"
          >
            Search
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
