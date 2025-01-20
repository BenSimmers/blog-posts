import { init } from '@instantdb/react';

export const db = init({
  appId: import.meta.env.VITE_INSTANT_AUTH_APP_ID as string,
});
