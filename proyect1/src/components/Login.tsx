import React from "react";

const Login = () => {
  return (
    <div className="bg-slate-700 p-6 rounded-xl font-poppins font-semibold w-full max-w-sm drop-shadow-xl">
      <div className="form-control w-full max-w-xs">
        <div className="">
          <div className="flex items-center justify-center">
            <svg
              className="h-32 w-32 text-slate-900 bg-white rounded-full shadow-xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <label className="label">
          <span className="label-text text-white">Correo:</span>
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <label className="label">
          <span className="label-text text-white">Contraseña:</span>
        </label>
        <input
          type="password"
          placeholder="Your password"
          className="input input-bordered w-full max-w-xs mb-4"
        />
      </div>
      <button className="btn text-white btn-primary w-full max-w-xs">
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;