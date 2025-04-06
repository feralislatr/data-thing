import { Skeleton } from '@mui/material';
import styles from '../page.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
      <div className="view-list">
        <Skeleton variant="rounded" width={64} height={44} />
        <Skeleton variant="rounded" width={64} height={44} />
      </div>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <br />
      <Skeleton variant="rounded" height="40rem" />
    </div>
  );
}
