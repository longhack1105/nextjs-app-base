import styles from "./BaseLayout.module.scss";
import { PropsBaseLayout } from "./interfaces";

function BaseLayout({ children }: PropsBaseLayout) {
  return <>
    <div className={styles.header}>header</div>
    <div className={styles.body}>{children}</div>
    <div className={styles.footer}>footer</div>
  </>;
}

export default BaseLayout;
