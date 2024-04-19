import Charizard from "./assets/006Charizard.png";

function App() {
  return (
    <>
      <div className="h-screen w-screen grid grid-cols-3 p-12">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-2xl font-semibold">#001</p>
            <p className="text-2xl font-semibold">Bulbasaur</p>
          </div>
          <div className="self-center">
            <p className="text-xl font-semibold">Height: 0,7m</p>
            <p className="text-xl font-semibold">Weigth: 6,9kg</p>
          </div>
          <div className="flex -rotate-90 w-fit mb-14 self-start -translate-x-14">
            <p className="text-xl font-semibold">Region: Kanto</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={Charizard} alt="" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <p className="text-4xl font-bold">Base Stats:</p>
          <div className="flex gap-2">
            <div className="p-1 border-2 border-black rounded-md" />
            <div className="flex flex-wrap gap-4">
              <div className="px-3 py-1 border border-black rounded-md">
                <p>HP: 60</p>
              </div>
              <div className="px-3 py-1 border border-black rounded-md">
                <p>Attack: 234</p>
              </div>
              <div className="px-3 py-1 border border-black rounded-md">
                <p>Attack: 234</p>
              </div>
              <div className="px-3 py-1 border border-black rounded-md">
                <p>Attack: 234</p>
              </div>
              <div className="px-3 py-1 border border-black rounded-md">
                <p>Attack: 234</p>
              </div>
              <div className="px-3 py-1 border border-black rounded-md">
                <p>Attack: 234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
