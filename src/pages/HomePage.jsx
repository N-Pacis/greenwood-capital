import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Home Page Component
 * Landing page with information about the Alternative Credit Scoring system
 */
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Credit Scoring That
            <span className="text-blue-600"> Values You</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your creditworthiness shouldn't be defined by a system that wasn't built with you in mind.
            Our Alternative Credit Score values community trust, consistency, and effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              {isAuthenticated ? 'View Your Score' : 'Get Started'}
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* What We Don't Use Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            What We <span className="text-red-500">Don't</span> Use
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Traditional credit scoring often penalizes people for factors outside their control.
            We've deliberately excluded these from our system.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <ExcludedFactor
              icon="🚫"
              title="No Criminal History"
              description="Your past shouldn't define your financial future. We believe in second chances."
            />
            <ExcludedFactor
              icon="📍"
              title="No Zip Code Penalization"
              description="Where you live doesn't determine your reliability. We evaluate you, not your neighborhood."
            />
            <ExcludedFactor
              icon="👤"
              title="No Demographic Inference"
              description="Your race, gender, or background are never factors. We judge actions, not identities."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            What We <span className="text-green-600">Do</span> Measure
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our scoring focuses on what actually demonstrates financial responsibility and community trust.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoringFactor
              weight="30%"
              icon="🏠"
              title="Rent Payment History"
              description="Consistent rent payments show reliability. We track your on-time payment percentage."
            />
            <ScoringFactor
              weight="20%"
              icon="⚡"
              title="Utility Payments"
              description="Electricity, water, internet - these everyday bills demonstrate financial consistency."
            />
            <ScoringFactor
              weight="25%"
              icon="🤝"
              title="Community Endorsements"
              description="Verified support from local organizations, mentors, and community leaders."
            />
            <ScoringFactor
              weight="25%"
              icon="📚"
              title="Business Mentorship"
              description="Completed training programs and certifications show commitment to growth."
            />
          </div>
        </div>
      </div>

      {/* Transparency Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            100% Transparent Scoring
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            No black boxes. No hidden factors. Every part of your score is visible, explainable,
            and disputable. You'll see exactly how each factor contributes to your score.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <TransparencyFeature
              title="See Everything"
              description="Every data point and calculation is visible"
            />
            <TransparencyFeature
              title="Plain Language"
              description="No jargon - just clear explanations"
            />
            <TransparencyFeature
              title="Dispute Anything"
              description="Challenge any data point you believe is wrong"
            />
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <blockquote className="text-xl text-gray-700 italic mb-4">
              "This system exists to challenge systemically biased FICO scores by valuing
              community trust, consistency, and effort — not historical exclusion."
            </blockquote>
            <p className="text-sm text-gray-500">— Our Mission</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to See Your Alternative Credit Score?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Join a credit system that was built with equity in mind.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/login'}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            Alternative Credit Score - Built for the Code2040 Hackathon
          </p>
          <p className="text-xs text-gray-600 mt-2">
            This is a demonstration project showcasing equity-first credit scoring.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ExcludedFactor({ icon, title, description }) {
  return (
    <div className="bg-red-50 rounded-xl p-6 border border-red-100">
      <span className="text-3xl mb-4 block">{icon}</span>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function ScoringFactor({ weight, icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {weight}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function TransparencyFeature({ title, description }) {
  return (
    <div className="bg-blue-700 rounded-xl p-4">
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-blue-200">{description}</p>
    </div>
  );
}
