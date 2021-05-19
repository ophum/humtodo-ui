import { useEffect, useState } from 'react';
import { useGlobalState } from '../../App';
import { AuthorizationType } from '../base/client';

export const useSignIn = () => {
  const [client] = useGlobalState('client');
  const [, setToken] = useGlobalState('token');

  return async (name: string, password: string) => {
    const res = await client.signIn({ name, password });
    client.SetAuthorization(AuthorizationType.Bearer, res.token);
    setToken(res.token);
  };
};

export const useSignUp = () => {
  const [client] = useGlobalState('client');
  const [, setToken] = useGlobalState('token');

  return async (name: string, password: string) => {
    const res = await client.signUp({ name, password });
    client.SetAuthorization(AuthorizationType.Bearer, res.token);
    setToken(res.token);
  };
};

export const useIsSignIn = () => {
  const [client] = useGlobalState('client');
  const [token] = useGlobalState('token');
  const [isSignIn, setIsSignIn] = useState(true);

  const check = async () => {
    if (token === '') {
      setIsSignIn(false);
    } else {
      try {
        client.SetAuthorization(AuthorizationType.Bearer, token);
        await client.verify({ token });
        setIsSignIn(true);
      } catch (e) {
        setIsSignIn(false);
      }
    }
  };

  useEffect(() => {
    check();
    return () => {
      return;
    };
  }, [token]);

  return isSignIn;
};
