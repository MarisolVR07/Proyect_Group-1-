
  interface StateInterface {
    isChecked: boolean;
    onChange: () => void;
    label?: string;
  }
  
  const StateCheckbox: React.FC<StateInterface> = ({ isChecked, onChange, label }) => (
    <label className="flex items-center space-x-2">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {label && <span>{label}</span>}
    </label>
  );
  
  export default StateCheckbox;
  