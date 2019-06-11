import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { PackageList } from "./components/PackageList";
import status from "./status.real.json";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <main>
        <PackageList list={status} />
      </main>
    </div>
  );
};

export default App;
