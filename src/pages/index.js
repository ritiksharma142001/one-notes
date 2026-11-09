import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import styles from './index.module.css';

const TOPICS = [
  { dir: 'core-java', title: 'Core Java', mark: 'J', tone: '#e76f00', text: 'JVM, OOP, strings, exceptions, collections, multithreading and streams.' },
  { dir: 'advanced-java', title: 'Advanced Java', mark: 'S', tone: '#6db33f', text: 'JDBC, Servlets & JSP, Spring Boot REST APIs, JPA and Hibernate.' },
  { dir: 'databases', title: 'Databases', mark: 'DB', tone: '#336791', text: 'SQL with MySQL & PostgreSQL, indexes, transactions and MongoDB.' },
  { dir: 'system-design', title: 'System Design', mark: 'SD', tone: '#7c3aed', text: 'Caching, load balancing, sharding, queues, CAP and an interview framework.' },
  { dir: 'javascript', title: 'JavaScript', mark: 'JS', tone: '#c9a400', text: 'Closures, this, the event loop, async/await, fetch and Axios.' },
  { dir: 'react', title: 'React', mark: 'R', tone: '#0891b2', text: 'Components, hooks, routing, data fetching and performance.' },
  { dir: 'web', title: 'HTML, CSS & Tailwind', mark: '</>', tone: '#e34f26', text: 'Semantic HTML, Flexbox & Grid, responsive design and Tailwind.' },
  { dir: 'node', title: 'Node.js & Express', mark: 'N', tone: '#3c873a', text: 'Modules, npm, Express routing, middleware, auth and REST.' },
  { dir: 'git', title: 'Git & GitHub', mark: 'G', tone: '#f05033', text: 'Branching, merge vs rebase, undoing anything and the PR flow.' },
  { dir: 'shell', title: 'Linux & Shell', mark: '$_', tone: '#475569', text: 'Navigating the terminal, Bash shortcuts and Vim.' },
  { dir: 'cs-fundamentals', title: 'CS Fundamentals', mark: 'CS', tone: '#db2777', text: 'Operating systems, DBMS and computer networks.' },
  { dir: 'interview', title: 'Interview Prep', mark: 'Q', tone: '#4f46e5', text: 'Java, Spring and frontend questions with crisp answers.' },
];

const PATHS = [
  {
    title: 'Java backend developer',
    steps: [
      ['Core Java', '/core-java/'],
      ['Collections', '/core-java/collections/framework-overview/'],
      ['SQL', '/databases/sql/'],
      ['Spring Boot', '/advanced-java/spring-boot/'],
      ['JPA', '/advanced-java/jpa-hibernate/'],
      ['System design', '/system-design/fundamentals/'],
    ],
  },
  {
    title: 'Frontend / full-stack developer',
    steps: [
      ['HTML', '/web/html/'],
      ['CSS', '/web/css/'],
      ['JavaScript', '/javascript/essentials/'],
      ['React', '/react/fundamentals/'],
      ['Hooks', '/react/hooks/'],
      ['Node & Express', '/node/node-express/'],
    ],
  },
  {
    title: 'Interview in a week',
    steps: [
      ['Java Q&A', '/interview/java-backend/'],
      ['Frontend Q&A', '/interview/frontend/'],
      ['OS', '/cs-fundamentals/operating-systems/'],
      ['DBMS', '/cs-fundamentals/dbms/'],
      ['Networks', '/cs-fundamentals/networks/'],
      ['Design a system', '/system-design/fundamentals/#interview-framework-45-minutes'],
    ],
  },
];

function useCounts() {
  const all = useAllDocsData();
  const docs = all.default?.versions?.[0]?.docs ?? [];
  const counts = {};
  for (const d of docs) {
    const top = d.id.split('/')[0];
    counts[top] = (counts[top] ?? 0) + 1;
  }
  return { counts, total: docs.length };
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { counts, total } = useCounts();

  return (
    <Layout
      title="Engineering notes"
      description="Free, searchable engineering notes by Ritik Sharma — Java, Spring Boot, React, SQL, system design, CS fundamentals and interview questions."
    >
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.kicker}>Free · searchable · no sign-up</p>
          <h1 className={styles.title}>
            Everything I learn,<br />
            <span className={styles.accent}>in one place.</span>
          </h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/core-java/">
              Start with Java
            </Link>
            <Link className="button button--secondary button--lg" to="/search/">
              Search the notes
            </Link>
          </div>
          <ul className={styles.stats}>
            <li><b>{total}</b> pages</li>
            <li><b>{TOPICS.length}</b> topics</li>
            <li><b>60+</b> interview Q&amp;As</li>
            <li>Dark mode · works on phone</li>
          </ul>
        </div>
      </header>

      <main>
        <section className="container margin-vert--xl">
          <h2 className={styles.h2}>Topics</h2>
          <div className={styles.grid}>
            {TOPICS.map((t) => (
              <Link key={t.dir} to={`/${t.dir}/`} className={styles.card} style={{ '--tone': t.tone }}>
                <span className={styles.mark} aria-hidden>{t.mark}</span>
                <span className={styles.cardBody}>
                  <span className={styles.cardTitle}>{t.title}</span>
                  <span className={styles.cardText}>{t.text}</span>
                  <span className={styles.cardMeta}>
                    {counts[t.dir] ?? 0} {counts[t.dir] === 1 ? 'page' : 'pages'} →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.pathsWrap}>
          <div className="container">
            <h2 className={styles.h2}>Follow a path</h2>
            <div className={styles.paths}>
              {PATHS.map((p) => (
                <div key={p.title} className={styles.path}>
                  <h3>{p.title}</h3>
                  <ol>
                    {p.steps.map(([label, to]) => (
                      <li key={label}><Link to={to}>{label}</Link></li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container margin-vert--xl">
          <div className={styles.how}>
            <div>
              <h2 className={styles.h2}>Made for revision</h2>
              <p>
                Every page is a cheat sheet: short explanations, runnable code, comparison tables, diagrams
                and an <em>interview quick answers</em> section at the end. Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to
                search anything.
              </p>
            </div>
            <div className={styles.howLinks}>
              <Link to="/about/">About these notes</Link>
              <a href="https://github.com/ritiksharma142001/one-notes">Suggest a fix on GitHub</a>
              <a href="https://eritik.vercel.app/">Ritik Sharma — portfolio</a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
