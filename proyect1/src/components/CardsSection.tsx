import React from 'react';
import CardButton from './CardButton';
import Icon from './CardIcon';

const CardsSection = () => (
    <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className='text-3xl text-white'>BACKOFFICE</h1>
                <p className='leading-relaxed text-white'>Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably havent heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
            </div>
            <div className="flex flex-wrap -m-4 space-x-3 items-center justify-center text-center">
                <CardButton
                    href="/backoffice/Institution"
                    icon={<Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path></Icon>}
                    title="Institution"
                    description=""
                />
                <CardButton
                    href="/backoffice/create-self-assessment"
                    icon={<Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path></Icon>}
                    title="Self-Assessment"
                    description=""
                />
                <CardButton
                    href="/backoffice/users" 
                    icon={<Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path></Icon>}
                    title="Users"
                    description=""
                />
            </div>
        </div>
    </section>
);

export default CardsSection;
