import React from 'react';
import CardButton from './CardButton';
import Icon from './CardIcon';
import MantUsersIcon from '../svg/MantUsersIcon';
import ListIcon from '../svg/ListIcon';
import DocExelIcon from '../svg/DocExelIcon';
import InstitutionIcon from '../svg/InstitutionIcon';

const CardsSection = () => (
    <section className="text-white font-poppins drop-shadow-xl">
        <div className="container px-5 py-10 mx-auto rounded-t-xl">
            <div className="flex flex-col text-center w-full mb-4">
                <h1 className='text-3xl text-white font-semibold'>DASHBOARD</h1>
            </div>
            <div className="flex flex-wrap justify-between items-center text-center w-full m-4">
                <CardButton
                    href="/backoffice"
                    icon={<Icon><MantUsersIcon/></Icon>}
                    title="Backoffice"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-800 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href="/backoffice/create_self_assessment"
                    icon={<Icon><ListIcon/></Icon>}
                    title="Self-Assessment"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-800 rounded-lg shadow-lg mx-2'
                />
                <CardButton
                    href="/reports"
                    icon={<Icon><DocExelIcon/></Icon>}
                    title="Reports"
                    description=""
                    className='flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-800 rounded-lg shadow-lg mx-2'
                />
            </div>
        </div>
    </section>
);

export default CardsSection;
