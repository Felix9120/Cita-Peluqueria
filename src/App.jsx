import { useState } from "react";
import { supabase } from "./supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Peluqueria from "./pages/Peluqueria";
import Seccion1 from "./pages/Seccion1";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/Peluqueria" element={<Peluqueria/>}/>
        <Route path="/Seccion1" element={<Seccion1/>}/>        
      </Routes>
    </>
  )

}

export default App;
