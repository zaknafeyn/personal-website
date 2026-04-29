import styles from "./page.module.css";
import Banner from "./ui/components/banner";
import { CurrentYear } from "./ui/components/currentYear";
import { Prompt } from "./ui/components/prompt";
import Terminal from './ui/components/terminal';

const bannerTitle = `
▗▖  ▗▖ ▗▄▖ ▗▖   ▗▄▄▄▖▗▖  ▗▖▗▄▄▄▖▗▖  ▗▖▗▖  ▗▖    ▗▄▄▖  ▗▄▖ ▗▄▄▄  ▗▄▄▖▗▖ ▗▖▗▖ ▗▖▗▖ ▗▖
▐▌  ▐▌▐▌ ▐▌▐▌   ▐▌   ▐▛▚▖▐▌  █   ▝▚▞▘ ▐▛▚▖▐▌    ▐▌ ▐▌▐▌ ▐▌▐▌  █▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌▗▞▘
▐▌  ▐▌▐▛▀▜▌▐▌   ▐▛▀▀▘▐▌ ▝▜▌  █    ▐▌  ▐▌ ▝▜▌    ▐▛▀▚▖▐▛▀▜▌▐▌  █▐▌   ▐▛▀▜▌▐▌ ▐▌▐▛▚▖ 
 ▝▚▞▘ ▐▌ ▐▌▐▙▄▄▖▐▙▄▄▖▐▌  ▐▌  █    ▐▌  ▐▌  ▐▌    ▐▌ ▐▌▐▌ ▐▌▐▙▄▄▀▝▚▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌ ▐▌
`;

const bannerSubTitle = (
  <>
    {`Full Stack Software Engineer
                                                                                   
\u00A9 `}
    <CurrentYear />
  </>
);

const welcomeMessage = `Welcome to my site.

Type 'help' to view a list of available commands.
`;

export default function Home() {
  return (
    <div className={styles.page}>
      <Terminal
        welcomeMessage={welcomeMessage}
        banner={<Banner bannerTitle={bannerTitle} bannerSubTitle={bannerSubTitle} />}
        terminalPrompt={<Prompt />}
      />
    </div>
  );
}
