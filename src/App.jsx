import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './tokens.css';

function track(type, payload) {
  const data = JSON.stringify({ type, ...payload });
  try {
    if (!navigator.sendBeacon('/api/event', new Blob([data], { type: 'application/json' }))) {
      fetch('/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data, keepalive: true }).catch(() => {});
    }
  } catch (_) {}
}

const skillCategories = [
  { name: 'Cloud & Infrastructure',       skills: ['AWS', 'Terraform', 'Ansible', 'Vagrant'] },
  { name: 'Containers & Orchestration',   skills: ['Docker', 'Kubernetes', 'K3S', 'ArgoCD', 'Helm'] },
  { name: 'CI/CD & Automation',           skills: ['GitHub Actions', 'GitLab CI', 'Jenkins'] },
  { name: 'Monitoring & Observability',   skills: ['Prometheus', 'Grafana', 'Alertmanager'] },
  { name: 'Systems & Languages',          skills: ['Linux', 'Python', 'Bash', 'Nginx', 'Git'] },
];

const projects = [
  {
    title: 'Two-Tier Web App with Docker & Jenkins',
    tech: 'Docker · Jenkins · Terraform · AWS EC2',
    description: 'End-to-end CI/CD deployment of a Flask + MySQL application on AWS — Terraform provisions the infrastructure, Docker containerises the stack, and Jenkins automates builds via GitHub webhooks.',
    metric: 'Full CI/CD on every push',
    github: 'https://github.com/poppyszn/DevOps-Project-Two-Tier-Web-App-with-Docker-and-Jenkins',
  },
  {
    title: 'Monolith to EKS Migration',
    tech: 'AWS EKS · Kubernetes · ArgoCD · Terraform',
    description: 'Five-service polyglot stack (Node.js, Python, NestJS, React, Go) containerised with production-grade Dockerfiles and deployed to AWS EKS using GitOps with ArgoCD.',
    metric: 'Production-grade multi-service',
    github: 'https://github.com/poppyszn/DevOps-Project-AWS-EKS-Monolith-Migration',
  },
  {
    title: 'Multi-Tier Web App on Vagrant',
    tech: 'Vagrant · Nginx · Tomcat · MySQL · RabbitMQ',
    description: 'Fully automated local infrastructure deploying a Java social-networking app across multiple VMs — with Nginx load balancing, Memcached, and RabbitMQ message queuing, all provisioned via Vagrant.',
    metric: 'Zero-touch VM provisioning',
    github: 'https://github.com/poppyszn/DevOps-Project-Multi-Tier-Web-App-on-Vagrant',
  },
  {
    title: 'AWS Projects Portfolio',
    tech: 'AWS · Terraform · IAM · S3 · EC2',
    description: 'Collection of production-ready AWS cloud infrastructure projects covering legacy migrations, auto-scaling architectures, storage, and DNS management — all built with Infrastructure as Code.',
    metric: 'Multiple production deployments',
    github: 'https://github.com/poppyszn/AWS-Projects',
  },
];

const experience = [
  {
    role: 'Lead DevOps Engineer',
    company: 'Vascon Solutions',
    period: 'Feb 2025 – Present',
    type: 'Full-time · Remote',
    highlights: [
      'Spearheaded company-wide infrastructure security policies, significantly reducing vulnerabilities',
      'Designed CI/CD pipelines with GitLab CI achieving 40% deployment efficiency increase',
      'Architected scalable AWS infrastructure optimising cost, performance, and availability',
      'Led integration of third-party applications ensuring seamless data flow via APIs',
      'Mentored junior engineers and facilitated best practice workshops',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Vascon Solutions',
    period: 'Nov 2024 – Feb 2025',
    type: 'Full-time · Remote',
    highlights: [
      'Implemented CI/CD pipelines to automate deployment, reducing time to market',
      'Containerised applications with Docker for easier scaling in cloud environments',
      'Deployed monitoring and alerting solutions for proactive performance management',
    ],
  },
  {
    role: 'DevOps Intern',
    company: 'Vascon Solutions',
    period: 'Dec 2023 – Oct 2024',
    type: 'Internship · Remote',
    highlights: [
      'Developed automated deployment scripts using Terraform and Jenkins',
      'Participated in containerisation efforts creating replicable environments',
      'Collaborated with senior engineers learning DevOps best practices',
    ],
  },
];

const articles = [
  {
    title: 'How I Containerised 5 Monoliths and Deployed Them to EKS',
    summary: 'A hands-on breakdown of migrating five legacy monolith apps into containers and shipping them to production EKS — covering Dockerfile patterns, ECR, and a full CI/CD pipeline.',
    href: 'https://dev.to/devpops/how-i-containerised-5-monoliths-and-deployed-them-to-eks-3p2',
    tag: 'Docker · EKS · CI/CD',
  },
  {
    title: 'How to Properly Set Up k3s on Your Homelab or Server (2026 Edition)',
    summary: 'The definitive guide to getting k3s production-ready — from bare metal to a fully functioning cluster with Traefik ingress, cert-manager, and ArgoCD GitOps.',
    href: 'https://dev.to/devpops/how-to-properly-set-up-k3s-on-your-homelab-or-server-2026-edition-595',
    tag: 'k3s · Kubernetes · Homelab',
  },
];

const homelabStack = [
  {
    name: 'k3s',
    role: 'Container Orchestration',
    description: 'Lightweight Kubernetes on a repurposed desktop — single node, production-grade config managing all cluster workloads.',
  },
  {
    name: 'Traefik',
    role: 'Ingress Controller',
    description: 'Routes all inbound traffic across services and handles TLS termination within the cluster.',
  },
  {
    name: 'ArgoCD',
    role: 'GitOps CD',
    description: 'Watches the Git repo and automatically syncs any manifest or Helm chart changes to the cluster.',
  },
  {
    name: 'Harbor',
    role: 'Container Registry',
    description: 'Self-hosted registry at harbor.dev-pops.site — stores and serves all container images built by CI.',
  },
  {
    name: 'cert-manager',
    role: 'TLS Automation',
    description: 'Automatically provisions and renews TLS certificates for all services running in the cluster.',
  },
];

const upcomingProjects = [
  {
    title: 'Homelab IaC Repository',
    tag: 'Infrastructure as Code',
    description: 'Open-sourcing all homelab infrastructure — k3s Helm charts, ArgoCD applications, and Terraform configs — as a living, versioned record of how the lab is built.',
    status: 'In Progress',
  },
  {
    title: 'Uptime Kuma',
    tag: 'Monitoring',
    description: 'Self-hosted status page monitoring all homelab services with public-facing uptime history — live at status.dev-pops.site.',
    status: 'Live',
    href: 'https://status.dev-pops.site/status/homelab',
  },
  {
    title: 'Loki + Promtail',
    tag: 'Observability',
    description: 'Completing the observability stack with cluster-wide log aggregation alongside the existing Prometheus and Grafana setup. Full metrics, logs, and alerting in one place.',
    status: 'Planning',
  },
  {
    title: 'HashiCorp Vault',
    tag: 'Security',
    description: 'Proper secret management on k3s — dynamic secrets, lease-based access, and policy-driven control replacing manual kubectl secret creation across the cluster.',
    status: 'Live',
  },
  {
    title: 'Metrics Pipeline',
    tag: 'Observability',
    description: 'Full metrics pipeline on k3s — Prometheus scraping cluster and app metrics, long-term storage via Thanos + MinIO (S3-compatible), and Grafana dashboards for visualization.',
    status: 'Live',
  },
];

const stats = [
  { value: '40%',  label: 'Faster Deployments' },
  { value: '99.9%', label: 'Uptime Achieved' },
  { value: '50%',  label: 'Onboarding Reduction' },
  { value: '13+',  label: 'Technologies Mastered' },
];

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Portfolio() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [formState, handleFormSubmit] = useForm('xpqqaekv');

  const roles = ['Lead DevOps Engineer', 'Cloud Architect', 'Automation Expert', 'Infrastructure Builder'];

  useEffect(() => {
    const role = roles[roleIndex];
    let i = 0;
    setTypedText('');
    const t = setInterval(() => {
      if (i < role.length) { setTypedText(role.substring(0, i + 1)); i++; }
      else { clearInterval(t); setTimeout(() => setRoleIndex(p => (p + 1) % roles.length), 2200); }
    }, 80);
    return () => clearInterval(t);
  }, [roleIndex]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    track('page_view');
  }, []);

  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            track('section_view', { section: entry.target.id });
          }
        });
      },
      { threshold: 0.3 }
    );
    ['home', 'about', 'skills', 'projects', 'writing', 'homelab', 'experience', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', color: 'var(--c-text)', fontFamily: 'var(--font)' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--c-border)', padding: '0 24px', height: '68px',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '17px', fontWeight: '600', color: 'var(--c-accent)', letterSpacing: '-0.02em' }}>
            {'<PO />'}
          </span>
          <div className="hide-mobile" style={{ display: 'flex', gap: '2px' }}>
            {['Home', 'About', 'Skills', 'Projects', 'Homelab', 'Experience', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
                onClick={e => { e.preventDefault(); scrollTo(item.toLowerCase()); }}>
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://github.com/poppyszn/portfolio-site/actions/workflows/build-push.yml"
               target="_blank" rel="noopener noreferrer"
               className="hide-mobile"
               style={{ display: 'inline-block', lineHeight: 0 }}>
              <img
                src="https://github.com/poppyszn/portfolio-site/actions/workflows/build-push.yml/badge.svg"
                alt="Build & Push"
                style={{ height: '20px' }}
              />
            </a>
            <a href="https://status.dev-pops.site/status/homelab"
               target="_blank" rel="noopener noreferrer"
               className="hide-mobile"
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: '6px',
                 padding: '5px 11px',
                 background: 'var(--c-success-bg)',
                 border: '1px solid var(--c-success-border)',
                 borderRadius: 'var(--radius-full)',
                 fontSize: '12.5px', fontWeight: '600', color: 'var(--c-success)',
                 textDecoration: 'none',
                 transition: 'opacity var(--t-fast)',
               }}
               onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
               onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--c-success)',
                animation: 'pulseDot 2.5s ease-in-out infinite',
                flexShrink: 0,
              }} />
              Status
            </a>
            <button className="btn btn-primary btn-sm" onClick={() => { scrollTo('contact'); track('cta_click', { label: 'lets_talk' }); }}>
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '68px',
        background: 'radial-gradient(ellipse 100% 60% at 50% -5%, rgba(30,64,175,0.07) 0%, transparent 65%)',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <div className="badge-available anim-1" style={{ marginBottom: '28px' }}>
                <div className="badge-dot" />
                Available for consulting projects
              </div>

              <h1 className="anim-2" style={{
                fontSize: 'clamp(44px, 6vw, 68px)', fontWeight: '800',
                lineHeight: '1.04', letterSpacing: '-0.04em', marginBottom: '14px',
              }}>
                Precious<br />
                <span className="gradient-text">Okpor</span>
              </h1>

              <div className="anim-3" style={{
                fontSize: '18px', color: 'var(--c-text-2)', marginBottom: '22px',
                fontFamily: 'var(--font-mono)', minHeight: '28px',
              }}>
                {typedText}
                <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--c-accent)', marginLeft: '1px' }}>|</span>
              </div>

              <p className="anim-4" style={{
                fontSize: '17px', color: 'var(--c-text-2)', lineHeight: '1.78',
                maxWidth: '460px', marginBottom: '36px',
              }}>
                I help companies <strong style={{ color: 'var(--c-text)', fontWeight: '600' }}>ship faster</strong> and{' '}
                <strong style={{ color: 'var(--c-text)', fontWeight: '600' }}>scale with confidence</strong>. Specialising
                in AWS, Kubernetes, and CI/CD automation that turns hours of deployment into minutes.
              </p>

              <div className="anim-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
                <button className="btn btn-primary" onClick={() => { scrollTo('contact'); track('cta_click', { label: 'book_consultation' }); }}>
                  Book Free Consultation →
                </button>
                <a href="/resume.pdf" download className="btn btn-secondary" onClick={() => track('cta_click', { label: 'download_cv' })}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download CV
                </a>
              </div>

              <div className="anim-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <a href="https://github.com/poppyszn" target="_blank" rel="noopener noreferrer" className="social-link" onClick={() => track('cta_click', { label: 'github' })}>
                  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/dev-pops/" target="_blank" rel="noopener noreferrer" className="social-link" onClick={() => track('cta_click', { label: 'linkedin' })}>
                  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://dev.to/devpops" target="_blank" rel="noopener noreferrer" className="social-link" onClick={() => track('cta_click', { label: 'devto' })}>
                  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
                  </svg>
                  dev.to
                </a>
              </div>
            </div>

            {/* Right — terminal */}
            <div className="terminal anim-scale">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                <div className="terminal-dot" style={{ background: '#28C840' }} />
                <span style={{ marginLeft: '10px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--c-text-3)' }}>
                  precious@devops — kubectl
                </span>
              </div>
              <div className="terminal-body">
                <div style={{ color: 'var(--c-text-3)' }}>$ kubectl get deployments -n production</div>
                <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--c-text-3)', borderBottom: '1px solid var(--c-border-light)', paddingBottom: '4px', marginBottom: '4px' }}>
                  NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY&nbsp;&nbsp;STATUS
                </div>
                {[
                  { name: 'api-server',    ready: '3/3' },
                  { name: 'web-frontend',  ready: '2/2' },
                  { name: 'worker',        ready: '4/4' },
                ].map(d => (
                  <div key={d.name} style={{ display: 'flex', gap: '0', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--c-text)', width: '160px' }}>{d.name}</span>
                    <span style={{ color: 'var(--c-text-2)', width: '50px' }}>{d.ready}</span>
                    <span style={{ color: 'var(--c-success)', fontWeight: '600' }}>Running</span>
                  </div>
                ))}
                <div style={{ marginTop: '16px', color: 'var(--c-text-3)' }}>$ terraform plan</div>
                <div style={{ marginTop: '4px', color: 'var(--c-success)' }}>
                  ✔ Plan: 0 to add, 2 to change, 0 to destroy.
                </div>
                <div style={{ marginTop: '16px', color: 'var(--c-text-3)' }}>$ echo "All systems nominal"</div>
                <div style={{ marginTop: '4px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--c-accent)', fontWeight: '600' }}>99.9% uptime</span>
                  <span style={{ color: 'var(--c-success)' }}>All systems nominal</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: 'var(--c-bg-soft)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', padding: '52px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--c-accent)', lineHeight: '1' }}>
                {s.value}
              </div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--c-text-2)', fontWeight: '500', letterSpacing: '-0.01em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>

            <div>
              <div className="section-label" style={{ marginBottom: '20px' }}>About Me</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '24px' }}>
                Building Infrastructure That{' '}
                <span className="gradient-text">Ships with Confidence</span>
              </h2>
              <p style={{ color: 'var(--c-text-2)', lineHeight: '1.8', fontSize: '16px', marginBottom: '18px' }}>
                I'm a DevOps Engineer who transforms chaotic deployment processes into streamlined, automated
                pipelines. I've migrated legacy systems to Infrastructure as Code, implemented Kubernetes
                clusters with GitOps workflows, and built CI/CD pipelines that reduce deployment time from
                hours to minutes.
              </p>
              <p style={{ color: 'var(--c-text-2)', lineHeight: '1.8', fontSize: '16px' }}>
                My approach:{' '}
                <strong style={{ color: 'var(--c-text)', fontWeight: '600' }}>reduce complexity</strong>,{' '}
                <strong style={{ color: 'var(--c-text)', fontWeight: '600' }}>automate repetitive tasks</strong>, and{' '}
                <strong style={{ color: 'var(--c-text)', fontWeight: '600' }}>create resilient systems</strong> so
                developers can focus on building products, not fighting infrastructure.
              </p>
            </div>

            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.01em' }}>
                What I Bring
              </h3>
              {[
                'Full IaC migrations for production systems',
                'K3S cluster implementations with ArgoCD',
                'GitHub Actions pipelines for multi-env deployments',
                'Container orchestration with Docker & Kubernetes',
                'Monitoring solutions with Prometheus & Grafana',
                'Kubernetes cluster management with ArgoCD GitOps workflows',
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < arr.length - 1 ? '14px' : 0 }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                    background: 'var(--c-accent-light)', border: '1px solid var(--c-accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckIcon />
                  </div>
                  <span style={{ color: 'var(--c-text-2)', fontSize: '15px', lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: 'var(--c-bg-soft)', borderTop: '1px solid var(--c-border)', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>Technical Expertise</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em' }}>
              Skills & Technologies
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {skillCategories.map((cat, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div style={{
                  minWidth: '200px', fontSize: '12px', fontWeight: '600', color: 'var(--c-text-3)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {cat.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                  {cat.skills.map(skill => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>Featured Work</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em' }}>
              Projects
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.map((p, i) => (
              <a key={i} href={p.github} target="_blank" rel="noopener noreferrer"
                className="card card-hover"
                style={{ padding: '28px', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
                onClick={() => track('cta_click', { label: `project_${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').split('_').slice(0, 3).join('_')}` })}>
                <div style={{
                  display: 'inline-flex', padding: '3px 10px',
                  background: 'var(--c-accent-light)', borderRadius: 'var(--radius-full)',
                  marginBottom: '16px', alignSelf: 'flex-start',
                }}>
                  <span style={{ color: 'var(--c-accent)', fontSize: '11.5px', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                    {p.tech}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: '1.3' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--c-text-2)', lineHeight: '1.65', fontSize: '14px', marginBottom: '20px', flex: 1 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--c-border-light)' }}>
                  <span style={{ color: 'var(--c-accent)', fontSize: '13px', fontWeight: '600' }}>{p.metric}</span>
                  <span style={{ color: 'var(--c-text-3)', fontSize: '13px' }}>View on GitHub →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" style={{ borderTop: '1px solid var(--c-border)', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '12px' }}>Technical Writing</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em' }}>
                Articles
              </h2>
            </div>
            <a href="https://dev.to/devpops" target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--c-text-2)', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color var(--t-fast)' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--c-text)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-2)'}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
              </svg>
              All articles on dev.to →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {articles.map((a, i) => (
              <a key={i} href={a.href} target="_blank" rel="noopener noreferrer"
                 className="card card-hover"
                 style={{ padding: '32px', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  display: 'inline-flex', padding: '3px 10px',
                  background: 'var(--c-accent-light)', borderRadius: 'var(--radius-full)',
                  marginBottom: '16px', alignSelf: 'flex-start',
                }}>
                  <span style={{ color: 'var(--c-accent)', fontSize: '11.5px', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                    {a.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: '1.35', flex: 1 }}>
                  {a.title}
                </h3>
                <p style={{ color: 'var(--c-text-2)', fontSize: '14px', lineHeight: '1.65', marginBottom: '20px' }}>
                  {a.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '16px', borderTop: '1px solid var(--c-border-light)' }}>
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
                  </svg>
                  <span style={{ color: 'var(--c-accent)', fontSize: '13px', fontWeight: '600' }}>Read on dev.to →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOMELAB */}
      <section id="homelab" style={{ background: 'var(--c-bg-soft)', borderTop: '1px solid var(--c-border)', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>Infrastructure</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Homelab
            </h2>
            <p style={{ color: 'var(--c-text-2)', fontSize: '16px', maxWidth: '560px', margin: '0 auto' }}>
              A self-managed k3s cluster running on a repurposed desktop — not a cloud lab, real hardware I operate daily.
            </p>
          </div>

          {/* Pipeline flow */}
          <div style={{ marginBottom: '56px' }}>
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: 'var(--c-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              GitOps Delivery Pipeline
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['git push', 'GitHub Actions', 'Harbor Registry', 'ArgoCD', 'k3s Cluster'].map((step, i, arr) => [
                <div key={`step-${i}`} style={{
                  padding: '8px 16px',
                  background: 'var(--c-bg)',
                  border: '1.5px solid var(--c-accent-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--c-accent)',
                  fontFamily: 'var(--font-mono)',
                  whiteSpace: 'nowrap',
                }}>
                  {step}
                </div>,
                i < arr.length - 1 && (
                  <span key={`arrow-${i}`} style={{ color: 'var(--c-text-3)', fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>→</span>
                ),
              ])}
            </div>
          </div>

          {/* Service cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {homelabStack.map((svc, i) => (
              <div key={i} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: 'var(--c-text)',
                  }}>
                    {svc.name}
                  </span>
                </div>
                <div style={{
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: 'var(--c-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                }}>
                  {svc.role}
                </div>
                <p style={{ color: 'var(--c-text-2)', fontSize: '13.5px', lineHeight: '1.6', flex: 1 }}>
                  {svc.description}
                </p>
              </div>
            ))}
          </div>

          {/* Hardware note */}
          <div style={{
            marginTop: '40px',
            padding: '16px 24px',
            background: 'var(--c-bg)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '20px' }}>🖥</span>
            <p style={{ color: 'var(--c-text-2)', fontSize: '14px', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--c-text)' }}>Hardware:</strong> Old desktop repurposed as a single-node k3s server.
              Domain: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-accent)', fontSize: '13px' }}>dev-pops.site</span> —
              Cloudflare DNS + TLS, routed through Traefik ingress.
            </p>
          </div>
        </div>
      </section>

      {/* UPCOMING PROJECTS */}
      <section style={{ borderTop: '1px solid var(--c-border)', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>What's Next</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Upcoming Projects
            </h2>
            <p style={{ color: 'var(--c-text-2)', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              Homelab infrastructure projects I'm building and open-sourcing on my personal k3s cluster.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {upcomingProjects.map((p, i) => {
              const statusClass = p.status === 'Live' ? 'status-live' : p.status === 'In Progress' ? 'status-in-progress' : 'status-planning';
              const cardProps = p.href
                ? { component: 'a', href: p.href, target: '_blank', rel: 'noopener noreferrer', style: { textDecoration: 'none', color: 'inherit' } }
                : {};
              const Tag = p.href ? 'a' : 'div';
              return (
                <Tag key={i} {...(p.href ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`card${p.href ? ' card-hover' : ''}`}
                  style={{ padding: '28px', display: 'flex', flexDirection: 'column', ...(p.href ? { textDecoration: 'none', color: 'inherit' } : {}) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' }}>
                    <div style={{
                      display: 'inline-flex', padding: '3px 10px',
                      background: 'var(--c-accent-light)', borderRadius: 'var(--radius-full)',
                    }}>
                      <span style={{ color: 'var(--c-accent)', fontSize: '11.5px', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                        {p.tag}
                      </span>
                    </div>
                    <span className={`status-badge ${statusClass}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: '1.3' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--c-text-2)', lineHeight: '1.65', fontSize: '14px', flex: 1 }}>
                    {p.description}
                  </p>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: 'var(--c-bg-soft)', borderTop: '1px solid var(--c-border)', padding: '120px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>Career Journey</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em' }}>
              Work Experience
            </h2>
          </div>
          <div>
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-line" />
                <div className="card" style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '3px' }}>
                        {exp.role}
                      </h3>
                      <div style={{ color: 'var(--c-accent)', fontSize: '14px', fontWeight: '600' }}>{exp.company}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'var(--c-text-2)', fontSize: '13px', fontWeight: '500' }}>{exp.period}</div>
                      <div style={{ color: 'var(--c-text-3)', fontSize: '12px', marginTop: '2px' }}>{exp.type}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: j < exp.highlights.length - 1 ? '10px' : 0 }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--c-accent)', marginTop: '9px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--c-text-2)', fontSize: '14px', lineHeight: '1.65' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: '16px' }}>Get In Touch</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: '1.1' }}>
            Let's Build Something <span className="gradient-text">Great</span>
          </h2>
          <p style={{ color: 'var(--c-text-2)', fontSize: '17px', lineHeight: '1.75', marginBottom: '48px' }}>
            Currently taking on 2–3 consulting projects. Whether you need a cloud migration,
            CI/CD pipelines, or infrastructure at scale — I'm here to help.
          </p>

          <div className="card" style={{ padding: '36px', textAlign: 'left' }}>
            {formState.succeeded ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 16px',
                  background: 'var(--c-success-bg)', border: '1px solid var(--c-success-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5L18 6" stroke="var(--c-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--c-text-2)', fontSize: '15px' }}>I'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { track('contact_form'); handleFormSubmit(e); }} style={{ display: 'grid', gap: '18px' }}>
                <div>
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input id="name" name="name" type="text" required placeholder="John Doe" className="form-input" />
                  <ValidationError prefix="Name" field="name" errors={formState.errors}
                    style={{ color: 'var(--c-error)', fontSize: '13px', marginTop: '4px', display: 'block' }} />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input id="email" name="email" type="email" required placeholder="john@company.com" className="form-input" />
                  <ValidationError prefix="Email" field="email" errors={formState.errors}
                    style={{ color: 'var(--c-error)', fontSize: '13px', marginTop: '4px', display: 'block' }} />
                </div>
                <div>
                  <label htmlFor="message" className="form-label">Project Details</label>
                  <textarea id="message" name="message" rows={4} required className="form-input"
                    placeholder="Tell me about your project, timeline, and requirements…"
                    style={{ resize: 'vertical' }} />
                  <ValidationError prefix="Message" field="message" errors={formState.errors}
                    style={{ color: 'var(--c-error)', fontSize: '13px', marginTop: '4px', display: 'block' }} />
                </div>
                <button type="submit" disabled={formState.submitting} className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '4px', opacity: formState.submitting ? 0.7 : 1, cursor: formState.submitting ? 'not-allowed' : 'pointer' }}>
                  {formState.submitting ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '36px', flexWrap: 'wrap' }}>
            <a href="mailto:preciousokpor@proton.me" className="social-link">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              preciousokpor@proton.me
            </a>
            <a href="https://www.linkedin.com/in/dev-pops/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/poppyszn" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://dev.to/devpops" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
              </svg>
              dev.to
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg-soft)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: '600', color: 'var(--c-accent)' }}>
            {'<PO />'}
          </span>
          <p style={{ color: 'var(--c-text-3)', fontSize: '13px' }}>
            © 2025 Precious Okpor · Lead DevOps Engineer
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/poppyszn' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dev-pops/' },
              { label: 'dev.to', href: 'https://dev.to/devpops' },
              { label: 'Resume', href: '/resume.pdf', download: true },
            ].map(link => (
              <a key={link.label} href={link.href} target={link.download ? undefined : '_blank'}
                rel={link.download ? undefined : 'noopener noreferrer'}
                download={link.download || undefined}
                style={{ color: 'var(--c-text-3)', fontSize: '13px', textDecoration: 'none', transition: 'color var(--t-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-text-2)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-3)'}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
