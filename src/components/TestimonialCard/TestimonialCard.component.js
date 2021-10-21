import React from 'react';
import extractInitials from '../../utils/extractIni';

const TestimonialCard = (props) => {
    const { testimony } = props;
    return (
        <div class="relative h-48 md:flex bg-gray-100 rounded-lg p-8 md:p-0 md:px-4 w-full md:w-120">
            {testimony.img ?
                <img class="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512" /> :
                <h2 className={`w-32 h-32 md:w-48 md:h-auto text-primary md:rounded-none rounded-full mx-auto text-7xl flex items-center justify-center tracking-wider`}>{extractInitials(testimony.client_name)}</h2>
            }
            <div class="pt-4 md:p-6 text-center md:text-left space-y-4">
                <blockquote>
                    <p class="text-base text-gray-800 font-semibold">
                        “{testimony.testimonial.substr(0, 250)}”
                    </p>
                </blockquote>
                <figcaption class="absolute bottom-3 right-3 font-medium text-sm">
                    <div class="text-gray-700">
                        {testimony.client_name}
                    </div>
                    <div class="text-gray-500">
                        {new Date(testimony.date).toLocaleDateString()} at {new Date(testimony.date).toLocaleTimeString([], { timeStyle: 'short' })}
                    </div>
                </figcaption>
            </div>
        </div>
    )
};

export default TestimonialCard;
