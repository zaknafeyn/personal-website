import { FC, useEffect, useRef } from "react";

import { CommandProps } from "../types";
import { Text } from "app/ui/components/text";
import { DescriptionList } from "app/ui/components/descriptionList";
import { downloadFile } from "app/ui/utils/downloadFile";
import styles from "./projectsCommand.module.css";

type CaseStudy = {
  title: string;
  summary: string;
  problem: string;
  role: string;
  constraints: string;
  stack: string;
  architecture: string;
  tradeoffs: string;
  result: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Aura enrollment and onboarding platform",
    summary:
      "Product engineering for enrollment flows, onboarding quality, release speed, and conversion experiments.",
    problem:
      "The product needed reliable enrollment and onboarding flows while the team was still turning early-stage concepts into shippable features.",
    role:
      "Senior Software Engineer and Team Lead for an international team of 6 developers; organized work, reviewed code, tested features, and tightened feedback loops.",
    constraints:
      "Fast release cadence, distributed collaboration, high-quality code reviews, crash prevention before deployment, and UI/UX changes that had to be proven through A/B tests.",
    stack:
      "TypeScript, React, GitHub Actions, automated tests, product analytics, A/B experimentation.",
    architecture:
      "Kept flows modular enough to test and iterate, moved repeated engineering routines into internal tools, and made CI/CD feedback quick enough to support frequent releases.",
    tradeoffs:
      "Balanced conversion-focused UI experiments with regression control, so speed came from smaller reviewed changes instead of risky big-bang releases.",
    result:
      "Increased user engagement by 70%, reduced build and deployment time to under 1 minute, and built three internal developer tools for quicker troubleshooting.",
  },
  {
    title: "Parimatch Tech internal CRM and profile widgets",
    summary:
      "Internal CRM rebuild designed to remove operational bottlenecks and make user-profile widgets configurable from CRM settings.",
    problem:
      "Operations needed a new CRM system that reduced manual coordination and made profile-level experiences easier to configure.",
    role:
      "Team Lead responsible for feature design, release coordination, frontend/backend implementation direction, and task organization.",
    constraints:
      "Internal users needed practical speed, the CRM had to drive embeddable profile widgets, and releases had to fit an existing production workflow.",
    stack: ".NET 5, ReactJS, Docker, Kubernetes.",
    architecture:
      "Used the CRM as the source of truth for settings, generated widgets dynamically from those settings, and shipped the system in a containerized deployment model.",
    tradeoffs:
      "Configuration-driven widgets improved flexibility, but increased the need for clear validation and predictable defaults.",
    result:
      "Modernized team workflow efficiency by 30% while replacing operational bottlenecks with a clearer release and task-management process.",
  },
  {
    title: "Star release automation and CI/CD modernization",
    summary:
      "Release process automation across build and test stages for multi-project delivery.",
    problem:
      "Manual build and test stages were consuming engineering time and slowing releases across several mid-term projects.",
    role:
      "Full-stack developer, architect, and team lead across different projects, with responsibility for improving release discipline and engineering throughput.",
    constraints:
      "Multiple technologies, different project teams, existing quality standards, and a need to reduce repetitive release work without weakening testing rigor.",
    stack: "CI/CD tooling, automated build stages, automated test stages, .NET and web application delivery.",
    architecture:
      "Standardized build/test automation around release checkpoints so teams could rely on consistent feedback instead of manual verification loops.",
    tradeoffs:
      "Automation took time away from short-term feature work, but paid back by removing repeated manual steps and making quality checks more repeatable.",
    result:
      "Reduced testing time by more than 50 hours per month while maintaining rigorous quality standards through development phases.",
  },
  {
    title: "Education management system for teacher substitution",
    summary:
      "React-based educational management system focused on real-time access and easier session workflows.",
    problem:
      "A teacher substitution exchange provider needed better access to real-time updates and a smoother experience for daily education operations.",
    role:
      "Engineering contributor on a mid-term project, working across frontend delivery and system integration concerns.",
    constraints:
      "The interface had to be simple enough for frequent operational use while still reflecting live changes reliably.",
    stack: "React, API integrations, real-time update flows.",
    architecture:
      "Built a client experience centered on fast access to changing substitution data, with workflows shaped around the tasks users repeated most often.",
    tradeoffs:
      "Richer client-side interactions improved usability, but required careful state handling so updates stayed understandable instead of surprising.",
    result:
      "Improved user access to real-time updates and increased user sessions by 40%.",
  },
  {
    title: "Pitney Bowes self-service kiosk application",
    summary:
      "Windows kiosk software for logistics users, built to automate manual processing tasks.",
    problem:
      "End users in logistics networks needed self-service workflows that replaced repetitive manual processing.",
    role:
      "Application engineer responsible for building the kiosk application and shaping user-facing operational flows.",
    constraints:
      "Kiosk reliability, guided interactions for non-technical users, and integration with existing logistics processes.",
    stack: ".NET, UWP, Windows client applications.",
    architecture:
      "Delivered a native Windows kiosk experience with guided task flows, using the client application to keep the operational path controlled and predictable.",
    tradeoffs:
      "A native kiosk application gave more control over hardware and user flow, while reducing the deployment flexibility of a web-only approach.",
    result:
      "Automated 75% of manual processing tasks across logistics networks, improving operational efficiency for end users.",
  },
];

const caseStudyFields: Array<{
  label: string;
  key: keyof Omit<CaseStudy, "title" | "summary">;
}> = [
  { label: "problem", key: "problem" },
  { label: "role", key: "role" },
  { label: "constraints", key: "constraints" },
  { label: "stack", key: "stack" },
  { label: "architecture", key: "architecture" },
  { label: "tradeoffs", key: "tradeoffs" },
  { label: "result", key: "result" },
];

function getProjectsTextOutput(): string {
  return [
    "Selected engineering case studies from Valentyn Radchuk's CV and project history.",
    "",
    ...caseStudies.flatMap((study) => [
      study.title,
      study.summary,
      "",
      ...caseStudyFields.flatMap(({ label, key }) => [
        `${label}:`,
        study[key],
        "",
      ]),
    ]),
  ].join("\n").trimEnd();
}

function getRedirectIndex(params: string[]): number {
  return params.indexOf(">");
}

function getRedirectFilename(params: string[]): string | undefined {
  const redirectIndex = params.indexOf(">");

  if (redirectIndex === -1) return undefined;

  return params[redirectIndex + 1];
}

function getSafeTextFilename(filename: string | undefined): string {
  const fallback = "projects.txt";
  const safeName = filename?.replace(/[\\/:*?"<>|]/g, "-").trim();

  if (!safeName) return fallback;

  return safeName.toLowerCase().endsWith(".txt")
    ? safeName
    : `${safeName}.txt`;
}

export const ProjectsCommand: FC<CommandProps> = ({ params = [] }) => {
  const hasRunRedirect = useRef(false);
  const redirectIndex = getRedirectIndex(params);
  const redirectFilename = getRedirectFilename(params);
  const downloadName = getSafeTextFilename(redirectFilename);
  const isRedirecting = redirectIndex !== -1;

  useEffect(() => {
    if (!isRedirecting || hasRunRedirect.current) return;

    hasRunRedirect.current = true;

    const blob = new Blob([getProjectsTextOutput()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    downloadFile(url, downloadName);
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }, [downloadName, isRedirecting]);

  if (isRedirecting) {
    return (
      <Text.Paragraph>
        Saved projects output to <Text.Terminal>{downloadName}</Text.Terminal>.
      </Text.Paragraph>
    );
  }

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
