import React from 'react'
import extractInitials from '../../utils/extractIni';

import styles from './Testimonial.module.css';

const Testimonial = (props) => {
    const {testimonial} = props;
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <h2 className={styles.userIni}>{extractInitials(testimonial.client_name)}</h2>
                <p className={styles.userName}>{testimonial.client_name}</p>
            </div>
            <div className={styles.testimonyContainer}>
                <p className={styles.testimony}>
                    {testimonial.testimonial.substr(0, 250)}
                </p>
                <p className={styles.testimonyDate}>{new Date(testimonial.date).toLocaleDateString()} at {new Date(testimonial.date).toLocaleTimeString('en-US')}</p>
            </div>
        </div>
    )
}

export default Testimonial;


{/* <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
  <img class="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-semibold">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-cyan-600">
        Sarah Dayan
      </div>
      <div class="text-gray-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure> */}
