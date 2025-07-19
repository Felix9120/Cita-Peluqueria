import React from 'react';
import { useState } from "react";
import { supabase } from "../supabaseClient";
import '../pages/Seccion1.css';
import message from '../assets/message.png';
import search from '../assets/search.png';
import '../pages/Seccion1.css';
import anna from '../assets/anna.png';
import mia from '../assets/mia.png';
import eren from '../assets/eren.png';
import services from '../assets/services.png';
import fav from '../assets/fav.png';
import noticie from '../assets/noticie.png';
import profile from '../assets/profile.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Seccion1() {
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
        <div className='peluqueria'>
            <div className='iconos'>
                <div className='message'><img src={message} alt="" /></div>
                <div className='search'><img src={search} alt="" /></div>
            </div>
            <div className='titulo'>
                <p>SPESIALISTS</p>
            </div>

            <hr />

            {step === 1 && (
                <div className='seccion'>
                    <div className="modelos">
                        <div className="text">
                            <p>Makeup</p>
                            <h3>Anna Leonchart</h3>
                            <button
                                className={servicio === 'Manicura' ? 'activo' : ''}
                                onClick={() => setServicio('Manicura')}
                            >
                                From $20
                            </button>
                        </div>
                        <img src={anna} alt="" />

                    </div>

                    <div className="modelo2">

                        <img src={mia} alt="" />
                        <div className="text">
                            <p>Skincare</p>
                            <h3>Mia Lissa</h3>
                            <button
                                className={servicio === 'Pedicura' ? 'activo' : ''}
                                onClick={() => setServicio('Pedicura')}
                            >
                                From $50
                            </button>
                        </div>

                    </div>

                    <div className="modelos">
                        <div className="text">
                            <p>Hairstyle</p>
                            <h3>Eren Akerman</h3>
                            <button
                                className={servicio === 'Depilación' ? 'activo' : ''}
                                onClick={() => setServicio('Depilación')}
                            >
                                From $20
                            </button>
                        </div>
                        <img src={eren} alt="" />
                    </div>
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

                    <p>⏰ 3️⃣ Escoge la hora:</p>

                    <div className="hora">
                        {horasDisponibles.map(h => (
                            <button className={hora === h ? 'activo' : ''} key={h} onClick={() => setHora(h)}>{h}
                            </button>
                        ))}

                    </div>

                    <div className='save'>
                        <button disabled={!hora} onClick={guardarCita}>
                            Guardar cita
                        </button>
                    </div>

                </div>

            )}

            {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}

            <div className='menu'>
                <button><img src={services} alt="" /></button>
                <button><img src={fav} alt="" /></button>
                <button><img src={noticie} alt="" /></button>
                <button><img src={profile} alt="" /></button>
            </div>

        </div>
    );
}

export default Seccion1;