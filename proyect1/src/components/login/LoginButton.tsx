import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../app/msalConfig';
import Button from '../general/PrimaryButton';
import { WindowsOutlined } from '@ant-design/icons';
import { User } from '@/app/types/entities';
import React, { useState, useEffect } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import useApi from '@/app/hooks/useApi';
import { useSession } from '@/app/providers/SessionProvider';
const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const { instance } = useMsal();
  const { callApi } = useApi<User>(); // Aquí se usa el hook useApi
  const { setUserData } = useSession();
  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      await getUserInfo(userInfo); 
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const getUserInfo = async (user: AccountInfo) => {
    try {
      
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
        USR_FullName: name,
        USR_Role: 'none',
        USR_Department: null,
      };
      // Reemplazamos el uso de fetch con callApi
      const response = await callApi('POST', '/api/rc_users', userToCreate);
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
  
    }
  }, [user]);

  return (
    <Button onClick={handleLogin} className="rounded-md w-44">
      <WindowsOutlined/> SIGN IN
    </Button>
  );
};

export default LoginButton;