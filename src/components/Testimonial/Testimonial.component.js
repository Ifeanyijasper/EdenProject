import React from 'react'
import extractInitials from '../../utils/extractIni';


const Testimonial = (props) => {
  const { testimonial } = props;
  return (
      
    <div class="relative h-48 md:flex bg-gray-100 rounded-lg p-8 md:p-0 md:px-4 w-full md:w-120">
      {testimonial.img ?
        <img class="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512" /> :
        <h2 className={`w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto text-7xl flex items-center justify-center tracking-wider`}>{extractInitials(testimonial.client_name)}</h2>
      }
      <div class="pt-4 md:p-6 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-base font-semibold">
            “{testimonial.testimonial.substr(0, 250)}”
          </p>
        </blockquote>
        <figcaption class="absolute bottom-3 right-3 font-medium text-sm">
          <div class="text-cyan-600">
            {testimonial.client_name}
          </div>
          <div class="text-gray-500">
            {new Date(testimonial.date).toLocaleDateString()} at {new Date(testimonial.date).toLocaleTimeString([], { timeStyle: 'short' })}
          </div>
        </figcaption>
      </div>
    </div>
        
  )
};

export default Testimonial;


{/* <div className={styles.container}>
            <div className={styles.userInfo}>
                <h2 className={styles.userIni}>{extractInitials(testimonial.client_name)}</h2>
                <p className={styles.userName}>{testimonial.client_name}</p>
            </div>
            <div className={styles.testimonyContainer}>
                <p className={styles.testimony}>
                    {testimonial.testimonial.substr(0, 250)}
                </p>
                <p className={styles.testimonyDate}>{new Date(testimonial.date).toLocaleDateString()} at {new Date(testimonial.date).toLocaleTimeString([], {timeStyle: 'short'})}</p>
            </div>
        </div> */}