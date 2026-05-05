import './App.css';

function App() {
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
        <input
          type="text"
          value={'Chicago'}
          className="x-2 py-1 bg-white text-black rounded-md border border-amber-50 italic border-r-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
        />
      </section>
    </main>
  );
}

export default App;
