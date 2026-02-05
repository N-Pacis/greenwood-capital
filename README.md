# Alternative Credit Scoring System

> **"This system exists to challenge systemically biased FICO scores by valuing community trust, consistency, and effort — not historical exclusion."**

## Overview

The Alternative Credit Scoring System is an equity-first module for community microloan platforms that replaces traditional FICO scoring with a transparent, explainable, and user-controllable system.

Built for the Code2040 Hackathon, this project demonstrates how credit scoring can be reimagined to serve communities that have historically been excluded from traditional financial systems.

## Key Features

### Transparent Scoring Algorithm

Every calculation is visible and explainable:

| Factor | Weight | Description |
|--------|--------|-------------|
| Rent Payment History | 30% | On-time rent payments and consistency |
| Utility Payments | 20% | Electricity, water, internet bill payments |
| Community Endorsements | 25% | Verified support from mentors and organizations |
| Business Mentorship | 25% | Completed training programs and certifications |

### Equity Safeguards

This system deliberately **excludes**:
- Criminal history
- Zip code-based penalization
- Demographic inference
- Any "black box" logic

### User Empowerment

- **Full Visibility**: See exactly how your score is calculated
- **Plain Language**: No financial jargon - clear explanations
- **Dispute System**: Challenge any data point you believe is incorrect
- **Improvement Guidance**: Actionable tips to raise your score

## User Personas

This system is designed for:

1. **First-time Entrepreneurs** - Building credit through business activities
2. **Immigrant Business Owners** - No US credit history but strong community ties
3. **Young Professionals** - Thin credit files, building from scratch
4. **Community-Backed Borrowers** - Strong local support despite financial challenges

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd code-2040-hackathon

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Demo Users

The application includes four pre-configured demo users to showcase different scoring scenarios:

1. **Maria Santos** - First-time entrepreneur with good score
2. **David Chen** - Immigrant business owner with excellent score
3. **Jasmine Williams** - Young professional building credit
4. **Marcus Johnson** - Community-backed borrower with fair score

## Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data**: Mock data (ready for Supabase integration)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Login components
│   ├── common/         # Header, Modal, etc.
│   ├── dashboard/      # Score display components
│   └── disputes/       # Dispute form and list
├── config/             # Scoring weights configuration
├── context/            # React context providers
├── data/               # Mock data
├── lib/                # Score calculation logic
└── pages/              # Page components
```

## Scoring Algorithm

The score calculation is fully transparent:

```javascript
Alternative Score =
  (Rent Payment Score × 0.30) +
  (Utility Payment Score × 0.20) +
  (Community Endorsements × 0.25) +
  (Mentorship Completion × 0.25)
```

Score Range: **300-850** (familiar FICO-like scale)

All weights are configurable in `src/config/scoringWeights.js`.

## Future Enhancements

- [ ] Supabase backend integration for persistent data
- [ ] Real document upload and verification
- [ ] Email notifications for dispute updates
- [ ] Admin dashboard for reviewing disputes
- [ ] Integration with microloan application flow
- [ ] Mobile-responsive PWA version

## Contributing

This project welcomes contributions that align with its equity-first mission. Please ensure any proposed changes:

1. Maintain full transparency in scoring
2. Do not introduce any form of discriminatory criteria
3. Keep explanations in plain, accessible language

## License

MIT License - See LICENSE file for details.

---

**Built with purpose for the Code2040 Hackathon**

*Credit scoring should reflect who you are and what you've accomplished — not where you come from or what systems have excluded you.*
