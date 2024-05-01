"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
    className?: string;
    text?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ text, className }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const classes = `${className}`;

    return (
        <div className={classes}>
            <h2 className='text-white'>{text}</h2>
            <div className='items-center justify-center text-center'>
                <DatePicker className='bg-transparent rounded-md border border-white text-white w-full text-center'
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption="Hora"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
