import styles from "./page.module.css";
import Banner from "./ui/components/banner";
import { Prompt } from "./ui/components/prompt";
import Terminal from './ui/components/terminal';

const getYear = () => {
  return new Date().getFullYear();
};

const bannerTitle = `
▗▖  ▗▖ ▗▄▖ ▗▖   ▗▄▄▄▖▗▖  ▗▖▗▄▄▄▖▗▖  ▗▖▗▖  ▗▖    ▗▄▄▖  ▗▄▖ ▗▄▄▄  ▗▄▄▖▗▖ ▗▖▗▖ ▗▖▗▖ ▗▖
▐▌  ▐▌▐▌ ▐▌▐▌   ▐▌   ▐▛▚▖▐▌  █   ▝▚▞▘ ▐▛▚▖▐▌    ▐▌ ▐▌▐▌ ▐▌▐▌  █▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌▗▞▘
▐▌  ▐▌▐▛▀▜▌▐▌   ▐▛▀▀▘▐▌ ▝▜▌  █    ▐▌  ▐▌ ▝▜▌    ▐▛▀▚▖▐▛▀▜▌▐▌  █▐▌   ▐▛▀▜▌▐▌ ▐▌▐▛▚▖ 
 ▝▚▞▘ ▐▌ ▐▌▐▙▄▄▖▐▙▄▄▖▐▌  ▐▌  █    ▐▌  ▐▌  ▐▌    ▐▌ ▐▌▐▌ ▐▌▐▙▄▄▀▝▚▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌ ▐▌
`;

const bannerSubTitle = `Full Stack Software Engineer
                                                                                   
\u00A9 ${getYear()}`;

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
