type ErrorProps = {
  message: string;
  isData: boolean;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ message, isData }) => (
  <div className="text-center">{isData && <p className="text-lg text-gray-700">{message}</p>}</div>
);
