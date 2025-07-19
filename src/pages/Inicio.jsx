import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Link } from 'react-router-dom';

function Inicio() {

    const [session, setSession] = useState(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
    };

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']}/>)
    }
    else {
        return (<div><h2>Bienvenidos {session?.user?.email}
        </h2>  <Link to={'/Peluqueria'}> <button>Ingresar</button> </Link>
        <button onClick={signOut}>Salir</button>
        <Link to={'/Seccion1'}> <button>Seccion 1</button> </Link>
        
        </div>)
    }
} 
export default Inicio