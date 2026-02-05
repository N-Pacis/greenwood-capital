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
      {/* Hero — distinct first slide with background texture and accent */}
      <section className="relative min-h-[88vh] flex items-center border-b border-border hero-first-slide">
        {/* Dot grid texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.4]" aria-hidden>
          <div className="absolute inset-0 hero-dot-grid" />
        </div>
        {/* Gradient orbs — stronger presence */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.18] blur-[120px] animate-float"
            style={{ background: 'radial-gradient(circle, #1a6b2a 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-1/4 -left-32 w-[380px] h-[380px] rounded-full opacity-[0.12] blur-[90px] animate-float animate-delay-3"
            style={{ background: 'radial-gradient(circle, #0f9660 0%, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-app to-transparent pointer-events-none" />
        </div>
        {/* Ambient icons — visible but subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroAmbientIcons />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="max-w-2xl flex flex-col">
            {/* Accent bar + label */}
            <div className="flex items-center gap-3 mb-5 opacity-0 animate-fade-in-up animate-delay-1">
              <span className="w-10 h-0.5 bg-primary rounded-full" />
              <p className="text-primary text-sm font-medium tracking-wide uppercase font-heading">
                Equity-first credit
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-main mb-6 font-heading tracking-tight opacity-0 animate-fade-in-up animate-delay-2">
              Credit scoring that values you
            </h1>
            <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed max-w-lg opacity-0 animate-fade-in-up animate-delay-3">
              Your creditworthiness shouldn't be defined by a system that wasn't built with you in mind.
            </p>
            <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-up animate-delay-4">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-heading"
              >
                {isAuthenticated ? 'View Your Score' : 'Get Started'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-main rounded-xl font-medium hover:bg-panel hover:border-muted transition-all duration-200"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What we exclude — scroll reveal */}
      <RevealSection id="exclude" className="py-24 sm:py-28 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-main mb-3 font-heading reveal-item stagger-1">
            What we don't use
          </h2>
          <p className="text-muted text-lg mb-14 max-w-xl reveal-item stagger-2">
            Traditional scoring often penalizes factors outside your control. We exclude them.
          </p>
          <ul className="space-y-5">
            {[
              { Icon: Ban, title: 'No criminal history', description: 'Your past doesn\'t define your financial future.' },
              { Icon: MapPin, title: 'No zip code penalization', description: 'Where you live doesn\'t determine your reliability.' },
              { Icon: UserX, title: 'No demographic inference', description: 'We judge actions, not identity. Race, gender, and background are never factors.' },
            ].map((item, i) => (
              <li key={item.title} className={`reveal-item stagger-${i + 3}`}>
                <ExcludedItem icon={item.Icon} title={item.title} description={item.description} />
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* What we measure — grid with hover cards */}
      <RevealSection id="how-it-works" className="py-24 sm:py-28 bg-panel/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-main mb-3 font-heading reveal-item stagger-1">
            What we measure
          </h2>
          <p className="text-muted text-lg mb-14 max-w-xl reveal-item stagger-2">
            Our score is based on what actually shows financial responsibility and community trust.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Home, weight: '30%', title: 'Rent payment history', description: 'On-time rent payments show reliability.' },
              { icon: Zap, weight: '20%', title: 'Utility payments', description: 'Everyday bills demonstrate consistency.' },
              { icon: Handshake, weight: '25%', title: 'Community endorsements', description: 'Verified support from local organizations and mentors.' },
              { icon: GraduationCap, weight: '25%', title: 'Business mentorship', description: 'Training and certifications show commitment to growth.' },
            ].map((card, i) => (
              <div key={card.title} className={`reveal-item stagger-${i + 3}`}>
                <ScoringCard
                  icon={card.icon}
                  weight={card.weight}
                  title={card.title}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Transparency — full-bleed green */}
      <RevealSection id="transparency" className="py-24 sm:py-28 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-heading reveal-item stagger-1">
            100% transparent scoring
          </h2>
          <p className="text-white/90 text-lg mb-14 max-w-2xl reveal-item stagger-2">
            No black boxes. Every part of your score is visible, explainable, and disputable.
          </p>
          <div className="grid sm:grid-cols-3 gap-10">
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
      <RevealSection id="mission" className="py-24 sm:py-28 border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-item stagger-1">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-8 opacity-90" />
          </div>
          <blockquote className="text-xl sm:text-2xl text-main font-medium leading-relaxed reveal-item stagger-2">
            "This system exists to challenge systemically biased FICO scores by valuing
            community trust, consistency, and effort — not historical exclusion."
          </blockquote>
          <p className="text-sm text-muted mt-6 reveal-item stagger-3">Our mission</p>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection id="cta" className="py-24 sm:py-28 bg-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-main mb-3 font-heading reveal-item stagger-1">
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
      <footer className="py-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">Greenwood Capital · Code2040 Hackathon</p>
          <p className="text-xs text-muted">Demonstration of equity-first credit scoring</p>
        </div>
      </footer>
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

function ExcludedItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-5 p-4 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-muted/50 transition-all duration-300">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-panel border border-border flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-main font-heading">{title}</h3>
        <p className="text-muted mt-1">{description}</p>
      </div>
    </div>
  );
}

function ScoringCard({ icon: Icon, weight, title, description }) {
  return (
    <div className="h-full bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-panel border border-border flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-semibold text-primary bg-panel px-2.5 py-1 rounded-lg">{weight}</span>
      </div>
      <h3 className="font-semibold text-main font-heading mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function TransparencyPillar({ icon: Icon, title, description }) {
  return (
    <div className="text-center sm:text-left">
      <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5 mx-auto sm:mx-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-white text-base font-heading mb-2">{title}</h3>
      <p className="text-sm text-white/85 leading-relaxed">{description}</p>
    </div>
  );
}
