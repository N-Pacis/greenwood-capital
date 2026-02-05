import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInView } from '../hooks/useInView';
import Navbar from '../components/Navbar';
import {
  Ban,
  MapPin,
  UserX,
  Home,
  Zap,
  Handshake,
  GraduationCap,
  Eye,
  FileText,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Shield,
  CircleDot,
} from 'lucide-react';

/**
 * Home Page — modern layout with scroll animations
 */
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-app font-body overflow-x-hidden">
      <Navbar />
      {/* Hero — split layout: copy left, product visual right */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[90vh] flex flex-col lg:flex-row lg:items-center border-b border-border hero-first-slide">
        {/* Dot grid texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.35]" aria-hidden>
          <div className="absolute inset-0 hero-dot-grid" />
        </div>
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.16] blur-[120px] animate-float"
            style={{ background: 'radial-gradient(circle, #1a6b2a 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-1/4 -left-32 w-[380px] h-[380px] rounded-full opacity-[0.1] blur-[90px] animate-float animate-delay-3"
            style={{ background: 'radial-gradient(circle, #0f9660 0%, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-app to-transparent pointer-events-none" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroAmbientIcons />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center min-w-0">
          {/* Left: copy + CTA */}
          <div className="flex flex-col max-w-xl min-w-0 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5 opacity-0 animate-fade-in-up animate-delay-1">
              <span className="w-10 h-0.5 bg-primary rounded-full" />
              <span className="text-primary text-sm font-medium tracking-wide uppercase font-heading">
                Equity-first credit
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-main mb-4 sm:mb-6 font-heading tracking-tight leading-[1.15] opacity-0 animate-fade-in-up animate-delay-2">
              Credit scoring that values you
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted mb-6 sm:mb-8 leading-relaxed opacity-0 animate-fade-in-up animate-delay-3">
              Your creditworthiness shouldn't be defined by a system that wasn't built with you in mind.
            </p>
            <div className="flex flex-wrap gap-3 mb-6 opacity-0 animate-fade-in-up animate-delay-4">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-heading shadow-lg shadow-primary/20"
              >
                {isAuthenticated ? 'View Your Score' : 'Get Started'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-main rounded-xl font-medium hover:bg-panel hover:border-muted transition-all duration-200"
              >
                How it works
              </a>
            </div>
            <p className="text-sm text-muted opacity-0 animate-fade-in-up animate-delay-5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Transparent scoring
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> No FICO required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Community-powered
              </span>
            </p>
          </div>

          {/* Right: product-style visual (order first on mobile so it appears above copy) */}
          <div className="relative flex justify-center lg:justify-end opacity-0 animate-fade-in-up animate-delay-3 order-1 lg:order-2 w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <HeroScoreVisual />
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#exclude"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-main transition-colors opacity-0 animate-fade-in-up animate-delay-6"
          aria-label="Scroll to content"
        >
          <span className="text-xs font-medium tracking-wide uppercase">Scroll</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* What we exclude — list with left-accent cards */}
      <RevealSection id="exclude" className="py-16 sm:py-24 lg:py-28 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-main mb-3 font-heading reveal-item stagger-1">
            What we don't use
          </h2>
          <p className="text-muted text-lg mb-14 max-w-xl reveal-item stagger-2">
            Traditional scoring often penalizes factors outside your control. We exclude them.
          </p>
          <ul className="space-y-4">
            {[
              { Icon: Ban, title: 'No criminal history', description: 'Your past doesn\'t define your financial future.' },
              { Icon: MapPin, title: 'No zip code penalization', description: 'Where you live doesn\'t determine your reliability.' },
              { Icon: UserX, title: 'No demographic inference', description: 'We judge actions, not identity. Race, gender, and background are never factors.' },
            ].map((item, i) => (
              <li key={item.title} className={`reveal-item stagger-${i + 3}`}>
                <ExcludedItem index={i + 1} icon={item.Icon} title={item.title} description={item.description} />
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* What we measure — bento-style asymmetric grid */}
      <RevealSection id="how-it-works" className="py-16 sm:py-24 lg:py-28 bg-panel/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-main mb-3 font-heading reveal-item stagger-1">
            What we measure
          </h2>
          <p className="text-muted text-lg mb-14 max-w-xl reveal-item stagger-2">
            Our score is based on what actually shows financial responsibility and community trust.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5 auto-rows-fr min-w-0">
            <div className={`sm:col-span-2 sm:row-span-2 reveal-item stagger-3`}>
              <ScoringCard
                icon={Home}
                weight="30%"
                title="Rent payment history"
                description="On-time rent payments show reliability. We use verified rental data to reflect your consistency."
                featured
              />
            </div>
            <div className={`reveal-item stagger-3`}>
              <ScoringCard icon={Zap} weight="20%" title="Utility payments" description="Everyday bills demonstrate consistency." />
            </div>
            <div className={`reveal-item stagger-4`}>
              <ScoringCard icon={Handshake} weight="25%" title="Community endorsements" description="Verified support from local organizations and mentors." />
            </div>
            <div className={`sm:col-span-2 reveal-item stagger-5`}>
              <ScoringCard icon={GraduationCap} weight="25%" title="Business mentorship" description="Training and certifications show commitment to growth." wide />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Transparency — glass-style pillars on green */}
      <RevealSection id="transparency" className="py-16 sm:py-24 lg:py-28 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-heading reveal-item stagger-1">
            100% transparent scoring
          </h2>
          <p className="text-white/90 text-lg mb-14 max-w-2xl reveal-item stagger-2">
            No black boxes. Every part of your score is visible, explainable, and disputable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Eye, title: 'See everything', description: 'Every data point and calculation is visible.' },
              { icon: FileText, title: 'Plain language', description: 'No jargon — clear explanations only.' },
              { icon: MessageCircle, title: 'Dispute anything', description: 'Challenge any data you believe is wrong.' },
            ].map((pillar, i) => (
              <div key={pillar.title} className={`reveal-item stagger-${i + 3}`}>
                <TransparencyPillar icon={pillar.icon} title={pillar.title} description={pillar.description} />
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Mission quote */}
      <RevealSection id="mission" className="py-16 sm:py-24 lg:py-28 border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0">
          <div className="reveal-item stagger-1">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-8 opacity-90" />
          </div>
          <blockquote className="text-lg sm:text-xl lg:text-2xl text-main font-medium leading-relaxed reveal-item stagger-2">
            "This system exists to challenge systemically biased FICO scores by valuing
            community trust, consistency, and effort — not historical exclusion."
          </blockquote>
          <p className="text-sm text-muted mt-6 reveal-item stagger-3">Our mission</p>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection id="cta" className="py-16 sm:py-24 lg:py-28 bg-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main mb-3 font-heading reveal-item stagger-1">
            Ready for your score?
          </h2>
          <p className="text-muted text-lg mb-10 reveal-item stagger-2">
            Join a credit system built with equity in mind.
          </p>
          <div className="reveal-item stagger-3">
            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-heading"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <footer className="py-8 sm:py-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left min-w-0">
          <p className="text-sm text-muted">Greenwood Capital · Code2040 Hackathon</p>
          <p className="text-xs text-muted">Demonstration of equity-first credit scoring</p>
        </div>
      </footer>
    </div>
  );
}

/** Hero right-side visual: score preview card (product-style) */
function HeroScoreVisual() {
  return (
    <div className="card-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 w-full max-w-[280px] sm:max-w-sm border-primary/20 shadow-xl shadow-black/20 min-w-0">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 font-heading">
        Greenwood Score
      </p>
      <div className="flex items-end gap-4 mb-6">
        <span className="text-5xl sm:text-6xl font-bold text-main font-heading tracking-tight">742</span>
        <span className="text-sm text-muted mb-2">out of 850</span>
      </div>
      <div className="h-2 bg-panel rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000"
          style={{ width: '87%' }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {['Rent history', 'Community', 'Mentorship'].map((label) => (
          <span
            key={label}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-panel/80 border border-border text-muted"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Subtle finance-themed icons in hero background */
function HeroAmbientIcons() {
  const iconClass = 'absolute text-main opacity-[0.07]';
  const positions = [
    { Icon: DollarSign, left: '12%', top: '18%', size: 28 },
    { Icon: TrendingUp, left: '78%', top: '22%', size: 32 },
    { Icon: Shield, left: '85%', top: '55%', size: 24 },
    { Icon: CircleDot, left: '8%', top: '62%', size: 20 },
    { Icon: DollarSign, left: '72%', top: '72%', size: 22 },
    { Icon: TrendingUp, left: '18%', top: '78%', size: 26 },
    { Icon: Shield, left: '92%', top: '12%', size: 18 },
    { Icon: CircleDot, left: '5%', top: '38%', size: 16 },
    { Icon: DollarSign, left: '88%', top: '42%', size: 20 },
    { Icon: TrendingUp, left: '42%', top: '8%', size: 24 },
    { Icon: Shield, left: '55%', top: '85%', size: 22 },
  ];
  return (
    <>
      {positions.map(({ Icon, left, top, size }, i) => (
        <span
          key={i}
          className={iconClass}
          style={{ left, top, width: size, height: size }}
          aria-hidden
        >
          <Icon className="w-full h-full" strokeWidth={1.2} />
        </span>
      ))}
    </>
  );
}

function RevealSection({ id, className = '', children }) {
  const [ref, isInView] = useInView({ rootMargin: '0px 0px -80px 0px', threshold: 0.08 });
  return (
    <section
      id={id}
      ref={ref}
      className={`reveal-section ${isInView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

function ExcludedItem({ index, icon: Icon, title, description }) {
  return (
    <div className="card-glass rounded-2xl overflow-hidden flex gap-0 hover:border-primary/40 transition-all duration-300 group min-w-0">
      <div className="w-1 flex-shrink-0 bg-primary opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden />
      <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 flex-1 min-w-0">
        <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-panel/80 border border-border flex items-center justify-center text-xs font-bold text-primary font-heading">
          {index}
        </span>
        <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-panel/80 border border-border flex items-center justify-center">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-main font-heading text-sm sm:text-base">{title}</h3>
          <p className="text-xs sm:text-sm text-muted mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ScoringCard({ icon: Icon, weight, title, description, featured, wide }) {
  return (
    <div
      className={`h-full card-glass rounded-2xl p-5 sm:p-6 flex flex-col hover:border-primary/40 hover:shadow-[0_0_0_1px_rgba(26,107,42,0.15)] hover:-translate-y-0.5 transition-all duration-300 ${
        featured ? 'min-h-[200px] sm:min-h-[220px]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4 flex-shrink-0">
        <div className={`rounded-xl bg-panel/80 border border-border flex items-center justify-center flex-shrink-0 ${featured ? 'w-14 h-14' : 'w-11 h-11'}`}>
          <Icon className={featured ? 'w-7 h-7 text-primary' : 'w-5 h-5 text-primary'} />
        </div>
        <span className="text-xs font-semibold text-primary bg-panel/90 px-2.5 py-1 rounded-lg border border-border flex-shrink-0">{weight}</span>
      </div>
      <h3 className={`font-semibold text-main font-heading ${featured ? 'text-lg mb-2' : 'mb-1.5'}`}>{title}</h3>
      <p className={`text-muted leading-relaxed flex-1 min-w-0 ${featured ? 'text-sm sm:text-base' : 'text-sm'}`}>{description}</p>
    </div>
  );
}

function TransparencyPillar({ icon: Icon, title, description }) {
  return (
    <div className="card-glass-on-dark rounded-2xl p-6 h-full flex flex-col text-center sm:text-left hover:bg-white/[0.12] transition-colors duration-300">
      <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4 mx-auto sm:mx-0 flex-shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-white text-base font-heading mb-2">{title}</h3>
      <p className="text-sm text-white/80 leading-relaxed">{description}</p>
    </div>
  );
}
