interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode; 
}

const Label: React.FC<LabelProps> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={`block font-bold ${className}`}>
      {children}
    </label>
  );
};

export default Label;