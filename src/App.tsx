import React from "react";
import "./App.css";
import { PackageList } from "./components/PackageList";
import data from "./sample-data/status.real.json";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <main>
        <PackageList list={data} />
      </main>
    </div>
  );
};

export default App;
