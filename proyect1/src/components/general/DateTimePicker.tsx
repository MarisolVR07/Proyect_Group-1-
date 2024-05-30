"useClient"
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../svg/CalendarIcon";

interface DateTimePickerProps {
  className?: string;
  text?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  text,
  className,
  value,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  const classes = `${className} `;

  return (
    <div className={classes}>
      {text && <h2 className="text-white">{text}</h2>}
      <div className="flex items-center space-x-1 p-1 bg-white h-8 rounded-lg justify-between">
        <DatePicker
          className="bg-white rounded-md w-full text-gray-700 text-center"
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Hora"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <div className="">
          <CalendarIcon />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
