import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// SEO Meta Component (for reference - would go in document head)
const SEOContent = {
  title: "Precious Okpor | DevOps Engineer - AWS, Kubernetes, Terraform Expert",
  description: "DevOps Engineer helping startups deploy faster and scale infrastructure without headaches. Specializing in AWS, Docker, Kubernetes, CI/CD pipelines, and Infrastructure as Code.",
  keywords: "DevOps Engineer, AWS, Kubernetes, Docker, Terraform, CI/CD, Infrastructure as Code, Cloud Architecture"
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const roles = ['DevOps Engineer', 'Cloud Architect', 'Automation Expert', 'Infrastructure Builder'];
  const [roleIndex, setRoleIndex] = useState(0);
  
  // Formspree contact form
  const [formState, handleFormSubmit] = useForm("xpqqaekv");

  useEffect(() => {
    const role = roles[roleIndex];
    let charIndex = 0;
    setTypedText('');
    
    const typeInterval = setInterval(() => {
      if (charIndex < role.length) {
        setTypedText(role.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const skills = [
    { name: 'AWS', icon: '☁️', level: 95 },
    { name: 'Kubernetes', icon: '⚙️', level: 90 },
    { name: 'Docker', icon: '🐳', level: 95 },
    { name: 'Terraform', icon: '🏗️', level: 90 },
    { name: 'GitHub Actions', icon: '🔄', level: 92 },
    { name: 'Linux', icon: '🐧', level: 93 },
    { name: 'Python', icon: '🐍', level: 85 },
    { name: 'Ansible', icon: '📜', level: 88 },
    { name: 'Prometheus', icon: '📊', level: 85 },
    { name: 'Grafana', icon: '📈', level: 87 },
    { name: 'GitLab CI', icon: '🦊', level: 88 },
    { name: 'Nginx', icon: '🌐', level: 85 },
    { name: 'n8n', icon: '🔗', level: 85 }
  ];

  // ============================================
  // 🔗 YOUR PROJECT LINKS
  // ============================================
  const projects = [
    {
      title: 'Preview Deployment Pipeline',
      tech: 'GitHub Actions • Vercel',
      description: 'Automated build and test system that deploys unique staging instances on every PR with auto-generated preview links.',
      metrics: '90% faster reviews',
      github: 'https://github.com/poppyszn/Dynamic-Preview-Deployments-with-GitHub-Actions-Vercel'
    },
    {
      title: 'Multi-Tier AWS Migration',
      tech: 'AWS • Terraform • Vagrant',
      description: 'Complete Lift-and-Shift migration strategy transforming local Vagrant stacks into production-grade AWS infrastructure.',
      metrics: '99.9% uptime achieved',
      github: 'https://github.com/poppyszn/AWS-Projects/tree/main/lift-and-shift-multi-tier-app'
    },
    {
      title: 'Serverless URL Shortener',
      tech: 'Lambda • API Gateway • DynamoDB',
      description: 'Scalable, cost-effective link shortening service built entirely with serverless architecture and Infrastructure as Code.',
      metrics: '10M+ requests/month',
      github: 'https://github.com/poppyszn/AWS-Projects/tree/main/serverless-url-shortener'
    },
    {
      title: 'Static Website Hosting on Amazon S3',
      tech: 'AWS • Terraform',
      description: 'Designed and implemented a complete static website hosting solution on AWS using S3 and Route 53, with all infrastructure managed through Terraform for reproducibility and version control.',
      metrics: 'Sub-$5/month hosting costs',
      github: 'https://github.com/poppyszn/AWS-Projects/tree/main/static-website-hosting-s3'
    }
  ];

  const experience = [
    {
      role: 'Lead DevOps Engineer',
      company: 'Vascon Solutions',
      period: 'Feb 2025 - Present',
      type: 'Full-time • Remote',
      highlights: [
        'Spearheaded company-wide infrastructure security policies, significantly reducing vulnerabilities',
        'Designed CI/CD pipelines with GitLab CI achieving 40% deployment efficiency increase',
        'Architected scalable AWS infrastructure optimizing cost, performance, and availability',
        'Led integration of third-party applications ensuring seamless data flow via APIs',
        'Mentored junior engineers and facilitated best practice workshops'
      ]
    },
    {
      role: 'DevOps Engineer',
      company: 'Vascon Solutions',
      period: 'Nov 2024 - Feb 2025',
      type: 'Full-time • Remote',
      highlights: [
        'Implemented CI/CD pipelines to automate deployment, reducing time to market',
        'Containerized applications with Docker for easier scaling in cloud environments',
        'Deployed monitoring and alerting solutions for proactive performance management'
      ]
    },
    {
      role: 'DevOps Intern',
      company: 'Vascon Solutions',
      period: 'Dec 2023 - Oct 2024',
      type: 'Internship • Remote',
      highlights: [
        'Developed automated deployment scripts using Terraform and Jenkins',
        'Participated in containerization efforts creating replicable environments',
        'Collaborated with senior engineers learning DevOps best practices'
      ]
    }
  ];

  const stats = [
    { value: '40%', label: 'Faster Deployments' },
    { value: '99.9%', label: 'Uptime Achieved' },
    { value: '50%', label: 'Onboarding Reduction' },
    { value: '2-3', label: 'Active Projects' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%)',
      color: '#e6edf3',
      fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }
        
        section[id] {
          scroll-margin-top: 80px;
        }
        
        ::selection {
          background: rgba(0, 255, 200, 0.3);
          color: #fff;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 200, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 200, 0.6); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .nav-link {
          position: relative;
          color: #8b949e;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        
        .nav-link:hover {
          color: #00ffc8;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ffc8, #00d4aa);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 80%;
        }
        
        .cta-button {
          background: linear-gradient(135deg, #00ffc8 0%, #00d4aa 100%);
          color: #0a0a0f;
          border: none;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          letter-spacing: 0.3px;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(0, 255, 200, 0.4);
        }
        
        .secondary-button {
          background: transparent;
          color: #00ffc8;
          border: 2px solid #00ffc8;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        
        .secondary-button:hover {
          background: rgba(0, 255, 200, 0.1);
          transform: translateY(-2px);
        }
        
        .n8n-button {
          background: transparent;
          color: #00ffc8;
          border: 2px solid #00ffc8;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          position: relative;
          overflow: hidden;
        }
        
        .n8n-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 100, 150, 0.5),
            rgba(255, 150, 200, 0.8),
            rgba(255, 100, 150, 0.5),
            transparent
          );
          animation: pink-shine 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        @keyframes pink-shine {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }
        
        .n8n-button:hover {
          background: rgba(0, 255, 200, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(255, 100, 150, 0.4);
        }
        
        .skill-card {
          background: linear-gradient(135deg, rgba(22, 27, 34, 0.8) 0%, rgba(13, 17, 23, 0.9) 100%);
          border: 1px solid rgba(48, 54, 61, 0.6);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffc8, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .skill-card:hover::before {
          opacity: 1;
        }
        
        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 255, 200, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .project-card {
          background: linear-gradient(145deg, rgba(22, 27, 34, 0.6) 0%, rgba(13, 17, 23, 0.8) 100%);
          border: 1px solid rgba(48, 54, 61, 0.5);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, transparent 40%, rgba(0, 255, 200, 0.3) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .project-card:hover::after {
          opacity: 1;
        }
        
        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        
        .timeline-item {
          position: relative;
          padding-left: 40px;
          padding-bottom: 48px;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 24px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #00ffc8, rgba(0, 255, 200, 0.1));
        }
        
        .timeline-item:last-child::before {
          display: none;
        }
        
        .timeline-dot {
          position: absolute;
          left: 0;
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00ffc8;
          box-shadow: 0 0 20px rgba(0, 255, 200, 0.5);
        }
        
        .stat-card {
          text-align: center;
          padding: 32px 24px;
          background: rgba(22, 27, 34, 0.5);
          border: 1px solid rgba(48, 54, 61, 0.4);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: scale(1.05);
          border-color: rgba(0, 255, 200, 0.3);
        }
        
        .terminal-window {
          background: #161b22;
          border-radius: 12px;
          border: 1px solid #30363d;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        
        .terminal-header {
          background: #21262d;
          padding: 12px 16px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 200, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 200, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        
        .glow-orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #00ffc8 !important;
          box-shadow: 0 0 0 3px rgba(0, 255, 200, 0.1);
        }
        
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 24px',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(48, 54, 61, 0.4)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '20px',
            fontWeight: '600',
            color: '#00ffc8'
          }}>
            {'<PO />'}
          </div>
          
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {item}
              </a>
            ))}
          </div>
          
          <button
            className="cta-button"
            style={{ padding: '10px 24px', fontSize: '14px' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Let's Talk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '120px 24px 80px'
      }}>
        <div className="grid-bg" />
        <div className="glow-orb" style={{ top: '10%', right: '10%', background: '#00ffc8' }} />
        <div className="glow-orb" style={{ bottom: '20%', left: '5%', background: '#0066ff' }} />
        
        <div style={{ maxWidth: '1000px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(0, 255, 200, 0.1)',
            border: '1px solid rgba(0, 255, 200, 0.3)',
            borderRadius: '50px',
            marginBottom: '32px',
            animation: 'fade-in-up 0.6s ease forwards'
          }}>
            <span style={{ color: '#00ffc8', fontSize: '14px', fontWeight: '500' }}>
              ✨ Available for consulting projects
            </span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '24px',
            fontFamily: '"Space Grotesk", sans-serif',
            animation: 'fade-in-up 0.6s ease 0.1s forwards',
            opacity: 0,
            animationFillMode: 'forwards'
          }}>
            Hey, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00ffc8 0%, #00d4aa 50%, #00ffaa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Precious Okpor
            </span>
          </h1>
          
          <div style={{
            fontSize: 'clamp(20px, 4vw, 32px)',
            color: '#8b949e',
            marginBottom: '32px',
            fontFamily: '"JetBrains Mono", monospace',
            animation: 'fade-in-up 0.6s ease 0.2s forwards',
            opacity: 0,
            animationFillMode: 'forwards'
          }}>
            {'> '}{typedText}
            <span style={{ 
              opacity: showCursor ? 1 : 0,
              color: '#00ffc8',
              marginLeft: '2px'
            }}>|</span>
          </div>
          
          <p style={{
            fontSize: '18px',
            color: '#8b949e',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto 48px',
            animation: 'fade-in-up 0.6s ease 0.3s forwards',
            opacity: 0,
            animationFillMode: 'forwards'
          }}>
            I help startups <strong style={{ color: '#e6edf3' }}>deploy faster</strong> and{' '}
            <strong style={{ color: '#e6edf3' }}>scale infrastructure</strong> without the headaches. 
            Specializing in AWS, Kubernetes, and CI/CD automation to transform your deployment 
            pipeline from hours to minutes.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fade-in-up 0.6s ease 0.4s forwards',
            opacity: 0,
            animationFillMode: 'forwards'
          }}>
            <button
              className="cta-button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Book Free Consultation →
            </button>
            <button
              className="secondary-button"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              View My Work
            </button>
            <a href="https://github.com/poppyszn/n8n-automation-portfolio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="n8n-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                n8n Automations
              </button>
            </a>
            <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
              <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download CV
              </button>
            </a>
          </div>
          
          {/* Terminal Preview */}
          <div className="terminal-window" style={{
            marginTop: '64px',
            textAlign: 'left',
            animation: 'scale-in 0.8s ease 0.6s forwards',
            opacity: 0,
            animationFillMode: 'forwards'
          }}>
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#ff5f56' }} />
              <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
              <div className="terminal-dot" style={{ background: '#27ca40' }} />
              <span style={{ marginLeft: '12px', color: '#8b949e', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' }}>
                precious@devops:~
              </span>
            </div>
            <div style={{ padding: '20px 24px', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px' }}>
              <div style={{ color: '#8b949e' }}>$ kubectl get pods -n production</div>
              <div style={{ color: '#7ee787', marginTop: '8px' }}>✓ All systems operational</div>
              <div style={{ display: 'flex', gap: '40px', marginTop: '12px', flexWrap: 'wrap' }}>
                <span><span style={{ color: '#8b949e' }}>api-server</span> <span style={{ color: '#7ee787' }}>Running</span></span>
                <span><span style={{ color: '#8b949e' }}>worker-nodes</span> <span style={{ color: '#7ee787' }}>3/3</span></span>
                <span><span style={{ color: '#8b949e' }}>uptime</span> <span style={{ color: '#00ffc8' }}>99.99%</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(22, 27, 34, 0.3)',
        borderTop: '1px solid rgba(48, 54, 61, 0.3)',
        borderBottom: '1px solid rgba(48, 54, 61, 0.3)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                fontFamily: '"Space Grotesk", sans-serif',
                background: 'linear-gradient(135deg, #00ffc8, #00d4aa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{ color: '#8b949e', fontSize: '15px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '120px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <span style={{
                color: '#00ffc8',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                About Me
              </span>
              <h2 style={{
                fontSize: '40px',
                fontWeight: '700',
                marginTop: '16px',
                marginBottom: '24px',
                fontFamily: '"Space Grotesk", sans-serif'
              }}>
                Building Infrastructure That{' '}
                <span style={{ color: '#00ffc8' }}>Ships with Confidence</span>
              </h2>
              <p style={{ color: '#8b949e', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                I'm a DevOps Engineer who transforms chaotic deployment processes into streamlined, 
                automated pipelines. Over the past year, I've migrated legacy systems to Infrastructure 
                as Code, implemented Kubernetes clusters with GitOps workflows, and built CI/CD 
                pipelines that reduce deployment time from hours to minutes.
              </p>
              <p style={{ color: '#8b949e', lineHeight: '1.8', fontSize: '16px', marginBottom: '32px' }}>
                My approach: <strong style={{ color: '#e6edf3' }}>reduce complexity</strong>, 
                <strong style={{ color: '#e6edf3' }}> automate repetitive tasks</strong>, and 
                <strong style={{ color: '#e6edf3' }}> create systems that work</strong> so 
                developers can focus on building products instead of fighting infrastructure.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="https://www.linkedin.com/in/dev-pops/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                </a>
                <a href="https://github.com/poppyszn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </a>
                <a href="/resume.pdf" download style={{ textDecoration: 'none' }}>
                  <button className="secondary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Resume
                  </button>
                </a>
                <a href="https://github.com/poppyszn/n8n-automation-portfolio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="n8n-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    n8n Automations
                  </button>
                </a>
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(0, 255, 200, 0.2)'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', color: '#00ffc8' }}>What I Bring</h3>
              {[
                'Full IaC migrations for production systems',
                'K3S cluster implementations with ArgoCD',
                'GitHub Actions pipelines for multi-env deployments',
                'Container orchestration with Docker & Kubernetes',
                'Monitoring solutions with Prometheus & Grafana',
                'n8n workflow automation & integrations'
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                  color: '#e6edf3'
                }}>
                  <span style={{ color: '#00ffc8', fontSize: '18px' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{
        padding: '120px 24px',
        background: 'rgba(22, 27, 34, 0.3)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              color: '#00ffc8',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Technical Expertise
            </span>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '700',
              marginTop: '16px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              Skills & Technologies
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            {skills.map((skill, i) => (
              <div key={i} className="skill-card" style={{
                animationDelay: `${i * 0.05}s`
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{skill.icon}</div>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>{skill.name}</div>
                <div style={{
                  height: '4px',
                  background: 'rgba(48, 54, 61, 0.8)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.level}%`,
                    background: 'linear-gradient(90deg, #00ffc8, #00d4aa)',
                    borderRadius: '2px',
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              color: '#00ffc8',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Featured Work
            </span>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '700',
              marginTop: '16px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              Project Gallery
            </h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: 'rgba(0, 255, 200, 0.1)',
                  borderRadius: '6px',
                  marginBottom: '16px'
                }}>
                  <span style={{ color: '#00ffc8', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>
                    {project.tech}
                  </span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#8b949e', lineHeight: '1.7', marginBottom: '20px', fontSize: '15px' }}>
                  {project.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(48, 54, 61, 0.5)'
                }}>
                  <span style={{
                    color: '#00ffc8',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {project.metrics}
                  </span>
                  <span style={{
                    color: '#8b949e',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        padding: '120px 24px',
        background: 'rgba(22, 27, 34, 0.3)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              color: '#00ffc8',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Career Journey
            </span>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '700',
              marginTop: '16px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              Work Experience
            </h2>
          </div>
          
          <div>
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div style={{
                  background: 'rgba(22, 27, 34, 0.6)',
                  border: '1px solid rgba(48, 54, 61, 0.5)',
                  borderRadius: '16px',
                  padding: '28px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                        {exp.role}
                      </h3>
                      <div style={{ color: '#00ffc8', fontWeight: '500' }}>{exp.company}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#8b949e', fontSize: '14px' }}>{exp.period}</div>
                      <div style={{ color: '#6e7681', fontSize: '13px' }}>{exp.type}</div>
                    </div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} style={{
                        color: '#8b949e',
                        lineHeight: '1.7',
                        marginBottom: '8px',
                        fontSize: '15px'
                      }}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '120px 24px', position: 'relative' }}>
        <div className="glow-orb" style={{ bottom: '10%', right: '10%', background: '#00ffc8' }} />
        
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{
            color: '#00ffc8',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Get In Touch
          </span>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginTop: '16px',
            marginBottom: '24px',
            fontFamily: '"Space Grotesk", sans-serif'
          }}>
            Let's Build Something{' '}
            <span style={{ color: '#00ffc8' }}>Amazing</span>
          </h2>
          <p style={{ color: '#8b949e', fontSize: '18px', lineHeight: '1.8', marginBottom: '48px' }}>
            Currently taking on 2-3 consulting projects. Whether you need to migrate to the cloud, 
            set up CI/CD pipelines, or scale your infrastructure, I'm here to help.
          </p>
          
          <div style={{
            background: 'rgba(22, 27, 34, 0.6)',
            border: '1px solid rgba(48, 54, 61, 0.5)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'left'
          }}>
            {formState.succeeded ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#00ffc8' }}>
                  Message Sent!
                </h3>
                <p style={{ color: '#8b949e', fontSize: '16px' }}>
                  Thanks for reaching out! I'll get back to you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#8b949e', fontSize: '14px' }}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(13, 17, 23, 0.8)',
                      border: '1px solid rgba(48, 54, 61, 0.8)',
                      borderRadius: '8px',
                      color: '#e6edf3',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <ValidationError prefix="Name" field="name" errors={formState.errors} style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '6px' }} />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#8b949e', fontSize: '14px' }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(13, 17, 23, 0.8)',
                      border: '1px solid rgba(48, 54, 61, 0.8)',
                      borderRadius: '8px',
                      color: '#e6edf3',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '6px' }} />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: '#8b949e', fontSize: '14px' }}>
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(13, 17, 23, 0.8)',
                      border: '1px solid rgba(48, 54, 61, 0.8)',
                      borderRadius: '8px',
                      color: '#e6edf3',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <ValidationError prefix="Message" field="message" errors={formState.errors} style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '6px' }} />
                </div>
                <button 
                  type="submit" 
                  disabled={formState.submitting}
                  className="cta-button" 
                  style={{ 
                    width: '100%', 
                    marginTop: '8px',
                    opacity: formState.submitting ? 0.7 : 1,
                    cursor: formState.submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {formState.submitting ? 'Sending...' : 'Book Free Consultation →'}
                </button>
              </form>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <a href="mailto:hello@preciousokpor.com" style={{
              color: '#8b949e',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.3s ease'
            }}>
              📧 hello@preciousokpor.com
            </a>
            <a href="https://www.linkedin.com/in/dev-pops/" target="_blank" rel="noopener noreferrer" style={{
              color: '#8b949e',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💼 LinkedIn
            </a>
            <a href="https://github.com/poppyszn" target="_blank" rel="noopener noreferrer" style={{
              color: '#8b949e',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        borderTop: '1px solid rgba(48, 54, 61, 0.4)',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '18px',
          fontWeight: '600',
          color: '#00ffc8',
          marginBottom: '16px'
        }}>
          {'<PO />'}
        </div>
        <p style={{ color: '#6e7681', fontSize: '14px' }}>
          © 2025 Precious Okpor. Deployed with ❤️ and way too much coffee.
        </p>
      </footer>
    </div>
  );
}
