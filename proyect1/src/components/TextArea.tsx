import Label from './Label';

interface TextAreaProps {
  id: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ id, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <textarea
        id={id}
        name={id}
        className="w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>
  );
};

export default TextArea;