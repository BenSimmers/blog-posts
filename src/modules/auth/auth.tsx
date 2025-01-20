import { useState, useCallback } from 'react';
import { db } from './data';

export const Login: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setSentEmail(email);
      setError(null);

      try {
        await db.auth.sendMagicCode({ email });
      } catch (err) {
        const errorMessage = (err as { body?: { message?: string } }).body?.message || 'Failed to send the code.';
        setError(errorMessage);
      }
    },
    [email],
  );

  const handleCodeSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!code) return;

      try {
        await db.auth.signInWithMagicCode({ email: sentEmail, code });
        setError(null);
      } catch (err) {
        const errorMessage = (err as { body?: { message?: string } }).body?.message || 'Failed to sign in.';
        setError(errorMessage);
      }
    },
    [sentEmail, code],
  );

  return (
    <div>
      <div className="bg-white p-8 outline mt-5 outline-2 outline-black">
        <h2 className="text-2xl font-bold mb-4">Let&apos;s log you in!</h2>
        {!sentEmail ? (
          <CombinedForm
            value={email}
            setValue={setEmail}
            onSubmit={handleEmailSubmit}
            error={error}
            type="email"
            placeholder="Enter your email"
            buttonText="Send Code"
          />
        ) : (
          <CombinedForm
            value={code}
            setValue={setCode}
            onSubmit={handleCodeSubmit}
            error={error}
            type="code"
            placeholder="Enter the code"
            buttonText="Sign In"
          />
        )}
      </div>
    </div>
  );
};

interface CombinedFormProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  type: 'email' | 'code';
  buttonText: string;
  placeholder: string;
}

const CombinedForm: React.FC<CombinedFormProps> = ({
  value,
  setValue,
  onSubmit,
  error,
  type,
  placeholder,
  buttonText,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <input
      type={type === 'email' ? 'email' : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      aria-label={type === 'email' ? 'Email address' : 'Magic code'}
    />
    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
      {buttonText}
    </button>
    {error && <p className="text-red-500">{error}</p>}
  </form>
);

// interface EmailFormProps {
//   email: string;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   onSubmit: (e: React.FormEvent) => void;
//   error: string | null;
// }

// interface CodeFormProps {
//     code: string;
//     setCode: React.Dispatch<React.SetStateAction<string>>;
//     onSubmit: (e: React.FormEvent) => void;
//     error: string | null;
//   }

// const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail, onSubmit, error }) => (
//   <form onSubmit={onSubmit} className="space-y-4">
//     <input
//       type="email"
//       placeholder="Enter your email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       className="p-2 border border-gray-300"
//       aria-label="Email address"
//     />
//     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//       Send Code
//     </button>
//     {error && <p className="text-red-500">{error}</p>}
//   </form>
// );

// const CodeForm: React.FC<CodeFormProps> = ({ code, setCode, onSubmit, error }) => (
//   <form onSubmit={onSubmit} className="space-y-4">
//     <input
//       type="text"
//       placeholder="Enter the code"
//       value={code}
//       onChange={(e) => setCode(e.target.value)}
//       className="w-full p-2 border border-gray-300 rounded"
//       aria-label="Magic code"
//     />
//     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//       Sign In
//     </button>
//     {error && <p className="text-red-500">{error}</p>}
//   </form>
// );
