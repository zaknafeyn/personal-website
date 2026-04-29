"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./route-status.module.css";

const banner = `
▗▄▄▄▖▗▄▄▖ ▗▄▄▖  ▗▄▖ ▗▄▄▖ 
▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌
▐▛▀▀▘▐▛▀▚▖▐▛▀▚▖▐▌ ▐▌▐▛▀▚▖
▐▙▄▄▖▐▌ ▐▌▐▌ ▐▌▝▚▄▞▘▐▌ ▐▌
`;

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <section className={styles.terminal} aria-labelledby="error-title">
        <span className={styles.banner} aria-hidden="true">
          {banner}
        </span>

        <div className={styles.commandRecord}>
          <span className={styles.prompt}>~ $</span>
          <span className={styles.input}>run portfolio</span>
        </div>

        <div className={styles.output}>
          <span id="error-title" className={styles.headline}>
            Runtime error: command failed.
          </span>
          <span>
            Something crashed while rendering this route. Retry the command, or
            return to the homepage and start a fresh session.
          </span>
          {error.digest && (
            <span className={styles.muted}>digest: {error.digest}</span>
          )}

          <div className={styles.actions}>
            <button className={styles.action} onClick={reset} type="button">
              retry
            </button>
            <Link className={styles.action} href="/">
              cd ~
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
