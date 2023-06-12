import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Barang from "./pages/Barang";
import NotFound from "./pages/NotFound";
import Total from "./pages/Total";
import { ApolloProvider } from "@apollo/client";
import {Api} from './api/Constant'

function App() {
  return (
    <ApolloProvider client={Api}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/barang" element={<Barang />}></Route>
          <Route path="/total" element={<Total />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
