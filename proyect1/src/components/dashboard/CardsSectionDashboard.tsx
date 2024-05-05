import React from 'react';
import CardButton from '../general/CardButton';
import Icon from '../general/CardIcon';
import ListIcon from '../svg/ListIcon';
import DocExelIcon from '../svg/DocExelIcon';
import GearIcon from '../svg/GearIcon';

const CardsSection = () => (
    <section className="text-white font-poppins">
        <div className="container px-5 py-10 mx-auto rounded-t-xl">
            <div className="flex flex-col text-center w-full mb-10">
                <h1 className='text-3xl text-white font-semibold'>Internal System Control</h1>
            </div>
            <div className="flex flex-wrap justify-between items-center text-center w-full px-20">
                <CardButton
                    href="/backoffice"
                    icon={<Icon><GearIcon/></Icon>}
                    title="Backoffice"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href="/dashboard/self_assessment"
                    icon={<Icon><ListIcon/></Icon>}
                    title="Self-Assessment"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href="/reports"
                    icon={<Icon><DocExelIcon/></Icon>}
                    title="Reports"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2'
                />
            </div>
        </div>
    </section>
);

export default CardsSection;
