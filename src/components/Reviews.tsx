'use client';

import styles from './review.module.css'; // Import CSS module

export function Reviews() {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsWrapper}>
        <div className={styles.review}>
          <p className="italic">"Amazing service, very professional!"</p>
          <p className="text-right font-semibold">- Sarah L.</p>
        </div>
        <div className={styles.review}>
          <p className="italic">"My kids love their new dentist!"</p>
          <p className="text-right font-semibold">- Mike D.</p>
        </div>
        <div className={styles.review}>
          <p className="italic">"Highly recommend, great experience!"</p>
          <p className="text-right font-semibold">- Emily R.</p>
        </div>
        {/* Add more reviews if needed */}
      </div>
    </div>
  );
}
