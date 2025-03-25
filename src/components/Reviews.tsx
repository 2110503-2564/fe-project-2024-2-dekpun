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
          <p className="italic">"The staff was so friendly, and the procedure was quick and easy."</p>
          <p className="text-right font-semibold">- Michael T.</p>
        </div>
        <div className={styles.review}>
          <p className="italic">"Highly recommend, great experience!"</p>
          <p className="text-right font-semibold">- Emily R.</p>
        </div>
        <div className={styles.review}>
          <p className="italic">"Excellent experience, highly recommend this dentist! - John D."</p>
          <p className="text-right font-semibold">- Emily R.</p>
        </div>
        <div className={styles.review}>
          <p className="italic">"Great customer service and a comfortable environment. - Emma W."</p>
          <p className="text-right font-semibold">- Emily R.</p>
        </div>
      </div>
    </div>
  );
}
