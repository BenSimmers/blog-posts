import React from 'react';
import { db } from './data';
import { useState } from 'react';

export const useAuth = () => {
  const [state, setState] = useState({
    email: '',
    code: '',
    sentEmail: '',
    error: null as string | null,
  });

  const { email, code, sentEmail, error } = state;

  const { user } = db.useAuth();

  const handleError = React.useCallback(
    (error: unknown) => {
      const errorMessage = (error as { body?: { message?: string } }).body?.message;
      setState((prevState) => ({ ...prevState, error: errorMessage ?? null }));
    },
    [error],
  );

  const handleEmailSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      try {
        await db.auth.sendMagicCode({ email });
        setState((prevState) => ({ ...prevState, sentEmail: email, error: null }));
      } catch (error) {
        handleError(error);
      }
    },
    [email],
  );

  const handleCodeSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!code) return;

      try {
        await db.auth.signInWithMagicCode({ email: sentEmail, code });
        setState((prevState) => ({ ...prevState, error: null }));
      } catch (error) {
        handleError(error);
      }
    },
    [code, sentEmail],
  );

  const logOut = React.useCallback(() => {
    db.auth.signOut();
  }, []);

  return {
    user,
    state,
    setState,
    email,
    code,
    sentEmail,
    error,
    handleEmailSubmit,
    handleCodeSubmit,
    logOut,
  };
};
