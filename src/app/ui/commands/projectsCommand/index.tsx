import { FC } from "react";

import type { CommandProps } from "../types";
import { Text } from "app/ui/components/text";
import { DescriptionList } from "app/ui/components/descriptionList";
import { caseStudies, caseStudyFields } from "./content";
import styles from "./projectsCommand.module.css";

export { getProjectsTextOutput as getTextOutput } from "./content";

export const ProjectsCommand: FC<CommandProps> = () => {
  return (
    <>
      <Text.Paragraph>
        Selected engineering case studies from my CV and project history. Some
        of the work is private, so I&apos;m focusing on the problem, decisions,
        tradeoffs, and measurable outcomes.
      </Text.Paragraph>

      {caseStudies.map((study) => (
        <section className={styles.caseStudy} key={study.title}>
          <Text.SubHeader className={styles.caseTitle}>
            {study.title}
          </Text.SubHeader>
          <Text.Paragraph>{study.summary}</Text.Paragraph>
          <DescriptionList
            items={caseStudyFields.map(({ label, key }) => ({
              label,
              values: [study[key]],
            }))}
          />
        </section>
      ))}
    </>
  );
};
