import { useMsal } from '@azure/msal-react';
import { loginRequest } from './msalConfig';
import Button from './PrimaryButton';
import { WindowsOutlined } from '@ant-design/icons';
import { User } from '@/app/types/entities'
import React, { useState } from 'react';

const LoginButton = () => {

  const [user, setUser] = useState({
    USR_Email: '',
    USR_Name: '',
    USR_FirstLastName: '',
    USR_SecondLastName: '',
    USR_Role: '',
    USR_Department: null,
  });
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      
      const userInfo = loginResponse.account;
      const response = await fetch('/api/rc_users/'+ userInfo.username);
        if (response.ok) {
          const data = await response.json();
          
        } else {
          setUser({
            USR_Email: userInfo.username,
            USR_Name: userInfo.name || '',
            USR_FirstLastName: '.',
            USR_SecondLastName: '.',
            USR_Role: '.',
            USR_Department: null,
          })
          const response2 = await fetch('/api/rc_users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          if (response2.ok) {
            // El usuario se ha guardado correctamente
            console.log('Usuario guardado exitosamente');
            // Puedes realizar cualquier otra acción aquí, como redirigir a otra página o mostrar un mensaje de éxito
          } else {
            // Si la solicitud falla
            console.error('Error al guardar el usuario:', response2.statusText);
            // Puedes manejar el error de la manera que desees, por ejemplo, mostrando un mensaje de error al usuario
          }
        }
      

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return <Button onClick={handleLogin} className="rounded-md">
     <WindowsOutlined /> SIGN IN
  </Button>;
};

export default LoginButton;