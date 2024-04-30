import { useMsal } from '@azure/msal-react';
import { loginRequest } from './msalConfig';
import Button from './PrimaryButton';
import { WindowsOutlined } from '@ant-design/icons';
import { User } from '@/app/types/entities';
import React, { useState, useEffect } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import useApi from '@/app/hooks/useApi';

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const { instance } = useMsal();
  const { callApi } = useApi<User>(); // Aquí se usa el hook useApi

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      await getUserInfo(userInfo);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const getUserInfo = async (user: AccountInfo) => {
    try {
      // Reemplazamos el uso de fetch con callApi
      const data = await callApi('GET', '/api/rc_users/' + user.username);
      if (data) {
        setUser(data);
      } else {
        createUser(user.username, user.name || '');
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
    }
  };

  const createUser = async (username: string, name: string) => {
    try {
      const userToCreate: User = {
        USR_Email: username,
        USR_Name: name,
        USR_FirstLastName: '.',
        USR_SecondLastName: '.',
        USR_Role: '.',
        USR_Department: null,
      };
      // Reemplazamos el uso de fetch con callApi
      const response = await callApi('GET', '/api/rc_deparment');
      if (response) {
        console.log('Usuario guardado exitosamente');
      } else {
        console.error('Error al guardar el usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  useEffect(() => {
    if (user) {
      // Puedes realizar cualquier otra acción aquí, como redirigir a otra página o mostrar un mensaje de éxito
      //opcional
    }
  }, [user]);

  return (
    <Button onClick={handleLogin} className="rounded-md">
      <WindowsOutlined/> SIGN IN
    </Button>
  );
};

export default LoginButton;
