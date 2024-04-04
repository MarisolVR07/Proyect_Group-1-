"use client";
import { useState, useEffect } from "react";
//import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [agreement, setAgreement] = useState(false);
  //const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //router.push("/Login");
  };

  return (
    <div className="container font-poppins font-semibold">
      <form onSubmit={handleSubmit} className="form">
        <div className="max-w-[1080px] mx-auto pt-12 pb-24">
          <div className="relative">
            <h2 className="text-white text-2xl mb-2">Regístrate</h2>
            <p className="text-amber-200 text-sm mb-6">¡Sé parte de la mejora continúa!</p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-white text-sm leading-7">Nombre*</label>
                <input type="text" className="p-2 w-full h-12 rounded border border-zinc-900" />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm leading-7">Apellidos*</label>
                <input type="text" className="p-2 w-full h-12 rounded border border-zinc-900" />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm leading-7">Teléfono</label>
                <input type="tel" className="p-2 w-full h-12 rounded border border-zinc-900" />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm leading-7">Dirección de correo electrónico *</label>
                <input type="email" className="p-2 w-full h-12 rounded border border-zinc-900" />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm leading-7">Contraseña *</label>
                <input type="password" className="p-2 w-full h-12 rounded border border-zinc-900" />
              </div>
            </div>

            <p className="text-white text-sm mt-8">Tus datos personales se usarán para gestionar eficazmente el riesgo institucional y facilitar las funciones gubernamentales, tal como se describe en nuestra <span className="text-amber-200">política de privacidad</span>.</p>

            <button type="submit" className="btn mt-6 px-8 py-2 bg-zinc-900 rounded-lg text-white text-lg">Registrarse</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;