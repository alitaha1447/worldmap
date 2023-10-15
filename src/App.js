import Home from "./Pages/Home";
import CountryDetail from "./Pages/CountryDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/countries/:countryCode"
            element={<CountryDetail></CountryDetail>}
          ></Route>
          <Route path="*" element={<h2>404 Page not found</h2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
