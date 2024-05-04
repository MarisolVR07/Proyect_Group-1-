import React from 'react';
import CardButton from '../general/CardButton';
import Icon from '../general/CardIcon';
import ListIcon from '../svg/ListIcon';
import DocExelIcon from '../svg/DocExelIcon';
import GearIcon from '../svg/GearIcon';

const CardsSection = () => (
    <section className="text-white font-poppins">
        <div className="container px-5 py-10 mx-auto rounded-t-xl">
            <div className="flex flex-wrap justify-between items-center text-center w-full px-20">
                <CardButton
                    href=""
                    icon={<Icon><ListIcon/></Icon>}
                    title="Self-Assessment 1"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href=""
                    icon={<Icon><ListIcon/></Icon>}
                    title="Self-Assessment 2"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href=""
                    icon={<Icon><ListIcon/></Icon>}
                    title="Self-Assessment 3"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
            </div>
        </div>
    </section>
);

export default CardsSection;
