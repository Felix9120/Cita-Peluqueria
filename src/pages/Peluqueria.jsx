import { useState } from "react";
import { supabase } from "../supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Peluqueria() {
  const [step, setStep] = useState(1);

  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  const horasDisponibles = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const guardarCita = () => {
    supabase
      .from("Peluqueria")
      .insert([
        {
          servicio,
          fecha: fecha.toISOString().split("T")[0],
          hora,
        },
      ])
      .then(({ error }) => {
        if (error) {
          setMensaje("Error al guardar. Intenta con otra hora.");
        } else {
          setMensaje("¡Cita guardada exitosamente!");
          setStep(1);
          setServicio("");
          setFecha(null);
          setHora("");
        }
      });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Agendar cita</h2>

      {step === 1 && (
        <div>
          <p>1️⃣ Escoge un servicio:</p>
          <select value={servicio} onChange={e => setServicio(e.target.value)}>
            <option value="">Selecciona</option>
            <option value="Manicura">Manicura</option>
            <option value="Pedicura">Pedicura</option>
            <option value="Depilación">Depilación</option>
          </select>
          <br /><br />
          <button disabled={!servicio} onClick={() => setStep(2)}>
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>📅 2️⃣ Escoge el día del mes:</p>
          <DatePicker
            selected={fecha}
            onChange={date => setFecha(date)}
            inline
          />
          <br />
          <button disabled={!fecha} onClick={() => setStep(3)}>
            Siguiente
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>⏰ 3️⃣ Escoge la hora:</p>
          <select value={hora} onChange={e => setHora(e.target.value)}>
            <option value="">Selecciona una hora</option>
            {horasDisponibles.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <br /><br />
          <button disabled={!hora} onClick={guardarCita}>
            Guardar cita
          </button>
        </div>
      )}

      {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}
    </div>
  );
}

export default Peluqueria;
