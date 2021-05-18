import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useGlobalState } from '../../App';
import { AuthorizationType } from '../../service/base/client';
import Client from '../../service/client';

export default function SignInOrSignUp() {
    const [client] = useGlobalState("client");
    const [_, setToken] = useGlobalState("token");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signIn = () => {
        (async () => {
            try {
                const res = await client.signIn({ name, password });
                client.SetAuthorization(AuthorizationType.Bearer, res.token);
                setToken(res.token);
                history.replace("/projects");
            } catch (e) {
                alert(e);
            }
        })();
    }

    const signUp = () => {
        (async () => {
            try {
                const res = await client.signUp({ name, password });
                client.SetAuthorization(AuthorizationType.Bearer, res.token);
                setToken(res.token);
                history.replace("/projects");
            } catch (e) {
                alert(e);
            }
        })()
    }
    return (
        <div>
            Name:<br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
      Password:<br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="button" onClick={signIn}>SignIn</button>
            <button type="button" onClick={signUp}>SignUp</button>

        </div>
    )
}