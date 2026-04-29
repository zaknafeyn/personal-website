import Link from "next/link";

import styles from "./route-status.module.css";

const banner = `
▗▖ ▗▖ ▗▄▖ ▗▖ ▗▖
▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌
▐▛▀▜▌▐▌ ▐▌▐▛▀▜▌
   ▐▌▝▚▄▞▘   ▐▌
`;

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.terminal} aria-labelledby="not-found-title">
        <span className={styles.banner} aria-hidden="true">
          {banner}
        </span>

        <div className={styles.commandRecord}>
          <span className={styles.prompt}>~ $</span>
          <span className={styles.input}>open requested-page</span>
        </div>

        <div className={styles.output}>
          <span id="not-found-title" className={styles.headline}>
            404: route not found.
          </span>
          <span>
            The page you asked for is not in this directory. Try the terminal
            homepage and type &apos;help&apos; to inspect the available commands.
          </span>
          <span className={styles.muted}>
            status: no matching route segment
          </span>

          <div className={styles.actions}>
            <Link className={styles.action} href="/">
              cd ~
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
