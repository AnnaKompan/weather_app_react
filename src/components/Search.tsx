import type { ChangeEvent, FormEvent, JSX } from 'react';
import type { optionType } from '../types';

type Props = {
  term: string;
  options: optionType[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
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
          className="relative mt-10 flex items-center gap-2 md:mt-4"
        >
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            className="px-2 py-1 bg-white text-black rounded-md border border-amber-50 italic border-r-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
            placeholder="Type city..."
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={index}>
                {option.name + '-' + index}
                <button
                  type="button"
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="rounded border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-200 px-2 py-1 cursor-pointer"
          >
            search
          </button>
        </form>
      </section>
    </main>
  );
};

export default Search;
