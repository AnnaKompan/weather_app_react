import './App.css';
import Search from './components/Search';
import useForecast from './hooks/useForecast';
import Forecast from './components/Forecast';
import type { forecastType } from './types';

function App() {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();
  return (
    <main className="flex justify-center items-center bg-linear-to-br from-sky-400 via-rose-400 to-lime-400 h-screen w-full">
      {forecast ? (
        <Forecast data={forecast}></Forecast>
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        ></Search>
      )}
    </main>
  );
}

export default App;
