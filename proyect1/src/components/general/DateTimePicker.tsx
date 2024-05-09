"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../svg/CalendarIcon';

interface DateTimePickerProps {
    className?: string;
    text?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ text, className }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const classes = `${className} `;

    return (
      <div className={classes}>
        {text && <h2 className="text-white">{text}</h2>}
        <div className="flex items-center p-1 bg-white h-8 rounded-lg justify-between">
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
