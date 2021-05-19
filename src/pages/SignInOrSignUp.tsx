import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSignIn, useSignUp } from '../service/auth/auth';

interface Props {
  name: string;
  password: string;
  setName: (e: string) => void;
  setPassword: (e: string) => void;
  handleSignIn: () => void;
  handleSignUp: () => void;
}

const Presenter = (props: Props) => {
  const { name, password, setName, setPassword, handleSignIn, handleSignUp } =
    props;

  return (
    <div>
      Name:
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="button" onClick={handleSignIn}>
        SignIn
      </button>
      <button type="button" onClick={handleSignUp}>
        SignUp
      </button>
    </div>
  );
};

export default function SignInOrSignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const signIn = useSignIn();
  const signUp = useSignUp();

  const handleSignIn = async () => {
    try {
      await signIn(name, password);
      history.replace('/projects');
    } catch (e) {
      alert(e);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(name, password);
      history.replace('/projects');
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Presenter
      name={name}
      password={password}
      setName={setName}
      setPassword={setPassword}
      handleSignIn={handleSignIn}
      handleSignUp={handleSignUp}
    />
  );
}
