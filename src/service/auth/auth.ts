import { useGlobalState } from '../../App';
import { AuthorizationType } from '../base/client';

export const useSignIn = () => {
    const [client] = useGlobalState("client");
    const [, setToken] = useGlobalState("token");

    return async (name: string, password: string) => {
        try {
            const res = await client.signIn({ name, password });
            client.SetAuthorization(AuthorizationType.Bearer, res.token);
            setToken(res.token);
        } catch (e) {
            throw e;
        }
    }
}

export const useSignUp = () => {
    const [client] = useGlobalState("client");
    const [, setToken] = useGlobalState("token");

    return async (name: string, password: string) => {
        try {
            const res = await client.signUp({ name, password });
            client.SetAuthorization(AuthorizationType.Bearer, res.token);
            setToken(res.token);
        } catch (e) {
            throw e;
        }
    }
}