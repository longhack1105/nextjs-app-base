import styles from "./ProfileLayout.module.scss";
import { PropsProfileLayout } from "./interfaces";

function ProfileLayout({ children }: PropsProfileLayout) {
  return <>
    {/* <div className={styles.header}>header</div> */}
    <div className={styles.body}>{children}</div>
    {/* <div className={styles.footer}>footer</div> */}
  </>;
}

export default ProfileLayout;
