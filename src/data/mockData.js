/**
 * MOCK DATA FOR ALTERNATIVE CREDIT SCORING DEMO
 *
 * This file contains seeded data representing different user personas:
 * 1. Maria Santos - First-time entrepreneur (good score)
 * 2. David Chen - Immigrant business owner (excellent score)
 * 3. Jasmine Williams - Thin credit history (building score)
 * 4. Marcus Johnson - Community-backed borrower (fair score)
 */

// Helper to generate UUIDs
const uuid = () => crypto.randomUUID();

// Demo user profiles
export const DEMO_USERS = {
  maria: {
    id: 'user-maria-santos',
    fullName: 'Maria Santos',
    email: 'maria@example.com',
    persona: 'First-time Entrepreneur',
    description: 'Starting her first business after years of steady employment',
    avatarColor: '#8b5cf6'
  },
  david: {
    id: 'user-david-chen',
    fullName: 'David Chen',
    email: 'david@example.com',
    persona: 'Immigrant Business Owner',
    description: 'Experienced restaurateur with no US credit history',
    avatarColor: '#0ea5e9'
  },
  jasmine: {
    id: 'user-jasmine-williams',
    fullName: 'Jasmine Williams',
    email: 'jasmine@example.com',
    persona: 'Young Professional',
    description: 'Recent graduate building credit from scratch',
    avatarColor: '#ec4899'
  },
  marcus: {
    id: 'user-marcus-johnson',
    fullName: 'Marcus Johnson',
    email: 'marcus@example.com',
    persona: 'Community-Backed Borrower',
    description: 'Strong community ties, rebuilding after financial hardship',
    avatarColor: '#f59e0b'
  }
};

// Generate date strings
const monthsAgo = (n) => {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d.toISOString().split('T')[0];
};

// RENT PAYMENTS DATA
export const RENT_PAYMENTS = {
  'user-maria-santos': [
    { id: uuid(), paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(4), dueDate: monthsAgo(4), amount: 1200, status: 'late', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(5), dueDate: monthsAgo(5), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(6), dueDate: monthsAgo(6), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(7), dueDate: monthsAgo(7), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(8), dueDate: monthsAgo(8), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(9), dueDate: monthsAgo(9), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(10), dueDate: monthsAgo(10), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(11), dueDate: monthsAgo(11), amount: 1200, status: 'on_time', landlordName: 'Sunrise Properties' },
    { id: uuid(), paymentDate: monthsAgo(12), dueDate: monthsAgo(12), amount: 1150, status: 'on_time', landlordName: 'Sunrise Properties' },
  ],
  'user-david-chen': [
    { id: uuid(), paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(4), dueDate: monthsAgo(4), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(5), dueDate: monthsAgo(5), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(6), dueDate: monthsAgo(6), amount: 2500, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(7), dueDate: monthsAgo(7), amount: 2400, status: 'on_time', landlordName: 'Metro Commercial LLC' },
    { id: uuid(), paymentDate: monthsAgo(8), dueDate: monthsAgo(8), amount: 2400, status: 'on_time', landlordName: 'Metro Commercial LLC' },
  ],
  'user-jasmine-williams': [
    { id: uuid(), paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 950, status: 'on_time', landlordName: 'Oak Street Apartments' },
    { id: uuid(), paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 950, status: 'on_time', landlordName: 'Oak Street Apartments' },
    { id: uuid(), paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 950, status: 'late', landlordName: 'Oak Street Apartments' },
    { id: uuid(), paymentDate: monthsAgo(4), dueDate: monthsAgo(4), amount: 950, status: 'on_time', landlordName: 'Oak Street Apartments' },
  ],
  'user-marcus-johnson': [
    { id: uuid(), paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 1100, status: 'on_time', landlordName: 'Community Housing Trust' },
    { id: uuid(), paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 1100, status: 'late', landlordName: 'Community Housing Trust' },
    { id: uuid(), paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 1100, status: 'on_time', landlordName: 'Community Housing Trust' },
    { id: uuid(), paymentDate: monthsAgo(4), dueDate: monthsAgo(4), amount: 1100, status: 'on_time', landlordName: 'Community Housing Trust' },
    { id: uuid(), paymentDate: monthsAgo(5), dueDate: monthsAgo(5), amount: 1100, status: 'late', landlordName: 'Community Housing Trust' },
    { id: uuid(), paymentDate: monthsAgo(6), dueDate: monthsAgo(6), amount: 1100, status: 'missed', landlordName: 'Community Housing Trust' },
  ],
};

// UTILITY PAYMENTS DATA
export const UTILITY_PAYMENTS = {
  'user-maria-santos': [
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 85, status: 'on_time', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 92, status: 'on_time', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 78, status: 'on_time', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'water', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 45, status: 'on_time', providerName: 'Municipal Water' },
    { id: uuid(), utilityType: 'water', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 42, status: 'on_time', providerName: 'Municipal Water' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 65, status: 'on_time', providerName: 'FastNet' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 65, status: 'on_time', providerName: 'FastNet' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 65, status: 'late', providerName: 'FastNet' },
  ],
  'user-david-chen': [
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 320, status: 'on_time', providerName: 'Commercial Electric' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 345, status: 'on_time', providerName: 'Commercial Electric' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(3), dueDate: monthsAgo(3), amount: 298, status: 'on_time', providerName: 'Commercial Electric' },
    { id: uuid(), utilityType: 'gas', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 180, status: 'on_time', providerName: 'City Gas' },
    { id: uuid(), utilityType: 'gas', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 165, status: 'on_time', providerName: 'City Gas' },
    { id: uuid(), utilityType: 'water', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 95, status: 'on_time', providerName: 'Municipal Water' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 120, status: 'on_time', providerName: 'Business Fiber' },
  ],
  'user-jasmine-williams': [
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 55, status: 'on_time', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 62, status: 'late', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 50, status: 'on_time', providerName: 'FastNet' },
  ],
  'user-marcus-johnson': [
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 75, status: 'on_time', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'electricity', paymentDate: monthsAgo(2), dueDate: monthsAgo(2), amount: 82, status: 'late', providerName: 'City Power Co' },
    { id: uuid(), utilityType: 'water', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 38, status: 'on_time', providerName: 'Municipal Water' },
    { id: uuid(), utilityType: 'internet', paymentDate: monthsAgo(1), dueDate: monthsAgo(1), amount: 45, status: 'on_time', providerName: 'Budget Net' },
  ],
};

// COMMUNITY ENDORSEMENTS DATA
export const COMMUNITY_ENDORSEMENTS = {
  'user-maria-santos': [
    { id: uuid(), endorserName: 'Rosa Martinez', endorserType: 'mentor', trustLevel: 4, endorsementText: 'Maria has shown exceptional dedication to learning business fundamentals. She attends every session and applies concepts immediately.', verified: true, verifiedAt: monthsAgo(1) },
    { id: uuid(), endorserName: 'Small Business Development Center', endorserType: 'organization', trustLevel: 5, endorsementText: 'Completed our 12-week entrepreneurship program with distinction.', verified: true, verifiedAt: monthsAgo(2) },
    { id: uuid(), endorserName: 'Rev. James Thompson', endorserType: 'community_leader', trustLevel: 4, endorsementText: 'Known Maria for 5 years through our congregation. Trustworthy and hardworking.', verified: true, verifiedAt: monthsAgo(1) },
  ],
  'user-david-chen': [
    { id: uuid(), endorserName: 'Asian Business Association', endorserType: 'organization', trustLevel: 5, endorsementText: 'David successfully operated restaurants in Taiwan for 15 years before immigrating. Active member of our association.', verified: true, verifiedAt: monthsAgo(1) },
    { id: uuid(), endorserName: 'Michael Wong', endorserType: 'mentor', trustLevel: 5, endorsementText: 'Mentored David through the restaurant licensing process. His attention to detail and food safety knowledge is exceptional.', verified: true, verifiedAt: monthsAgo(2) },
    { id: uuid(), endorserName: 'Chinatown Business Council', endorserType: 'organization', trustLevel: 5, endorsementText: 'Verified business owner with excellent standing in our community.', verified: true, verifiedAt: monthsAgo(1) },
    { id: uuid(), endorserName: 'Linda Park', endorserType: 'community_leader', trustLevel: 4, endorsementText: 'David has been instrumental in organizing community food drives. A pillar of our neighborhood.', verified: true, verifiedAt: monthsAgo(3) },
    { id: uuid(), endorserName: 'Robert Kim', endorserType: 'mentor', trustLevel: 4, endorsementText: 'Helped David navigate US business regulations. He learns quickly and follows through.', verified: true, verifiedAt: monthsAgo(2) },
  ],
  'user-jasmine-williams': [
    { id: uuid(), endorserName: 'Dr. Angela Foster', endorserType: 'mentor', trustLevel: 4, endorsementText: 'Jasmine was my top student. Her analytical skills and work ethic are outstanding.', verified: true, verifiedAt: monthsAgo(1) },
  ],
  'user-marcus-johnson': [
    { id: uuid(), endorserName: 'Community Development Corp', endorserType: 'organization', trustLevel: 5, endorsementText: 'Marcus has been an active volunteer for 3 years. He helps run our financial literacy workshops.', verified: true, verifiedAt: monthsAgo(1) },
    { id: uuid(), endorserName: 'Pastor Williams', endorserType: 'community_leader', trustLevel: 5, endorsementText: 'Known Marcus for over a decade. Despite challenges, he has always prioritized his family and community.', verified: true, verifiedAt: monthsAgo(1) },
    { id: uuid(), endorserName: 'Sarah Mitchell', endorserType: 'mentor', trustLevel: 4, endorsementText: 'I\'ve worked with Marcus on his business plan. He has real potential and determination.', verified: true, verifiedAt: monthsAgo(2) },
    { id: uuid(), endorserName: 'Neighborhood Association', endorserType: 'organization', trustLevel: 4, endorsementText: 'Marcus leads our youth mentorship program. The kids look up to him.', verified: true, verifiedAt: monthsAgo(2) },
    { id: uuid(), endorserName: 'Coach Davis', endorserType: 'community_leader', trustLevel: 4, endorsementText: 'Marcus volunteers as assistant coach for our youth basketball league. Reliable and great with kids.', verified: false, verifiedAt: null },
  ],
};

// MENTORSHIP PROGRAMS DATA
export const MENTORSHIP_PROGRAMS = {
  'user-maria-santos': [
    { id: uuid(), programName: 'Small Business Essentials', organization: 'SBDC', completionDate: monthsAgo(2), certificateUrl: '/certificates/sbe-maria.pdf', programType: 'business', verified: true },
    { id: uuid(), programName: 'Financial Literacy 101', organization: 'Community Bank Foundation', completionDate: monthsAgo(4), certificateUrl: '/certificates/fin101-maria.pdf', programType: 'financial_literacy', verified: true },
  ],
  'user-david-chen': [
    { id: uuid(), programName: 'US Restaurant Compliance', organization: 'Restaurant Association', completionDate: monthsAgo(3), certificateUrl: '/certificates/compliance-david.pdf', programType: 'business', verified: true },
    { id: uuid(), programName: 'Food Safety Manager Certification', organization: 'ServSafe', completionDate: monthsAgo(4), certificateUrl: '/certificates/servsafe-david.pdf', programType: 'technical', verified: true },
    { id: uuid(), programName: 'Small Business Finance', organization: 'SCORE', completionDate: monthsAgo(5), certificateUrl: '/certificates/finance-david.pdf', programType: 'financial_literacy', verified: true },
    { id: uuid(), programName: 'Leadership in Hospitality', organization: 'Hospitality Institute', completionDate: monthsAgo(6), certificateUrl: '/certificates/leadership-david.pdf', programType: 'leadership', verified: true },
  ],
  'user-jasmine-williams': [
    { id: uuid(), programName: 'Young Entrepreneurs Workshop', organization: 'Youth Business Alliance', completionDate: monthsAgo(1), certificateUrl: '/certificates/yew-jasmine.pdf', programType: 'business', verified: true },
  ],
  'user-marcus-johnson': [
    { id: uuid(), programName: 'Second Chance Business Program', organization: 'Reentry Coalition', completionDate: monthsAgo(2), certificateUrl: '/certificates/scbp-marcus.pdf', programType: 'business', verified: true },
    { id: uuid(), programName: 'Financial Recovery Workshop', organization: 'Community Credit Union', completionDate: monthsAgo(3), certificateUrl: '/certificates/frw-marcus.pdf', programType: 'financial_literacy', verified: true },
  ],
};

// DISPUTES DATA (for demo purposes)
export const DISPUTES = {
  'user-maria-santos': [
    { id: uuid(), factorType: 'rent', factorId: 'rent-4', reason: 'Payment was made on time but landlord reported late due to processing delay.', supportingDocumentUrl: '/docs/bank-statement.pdf', status: 'resolved', resolutionNotes: 'Verified with bank statement. Score adjusted.', createdAt: monthsAgo(3), updatedAt: monthsAgo(2) },
  ],
  'user-david-chen': [],
  'user-jasmine-williams': [],
  'user-marcus-johnson': [
    { id: uuid(), factorType: 'rent', factorId: 'rent-6', reason: 'Missed payment was during medical emergency. Have documentation.', supportingDocumentUrl: '/docs/medical-records.pdf', status: 'under_review', resolutionNotes: null, createdAt: monthsAgo(1), updatedAt: monthsAgo(1) },
  ],
};

// Helper function to get all data for a user
export function getUserData(userId) {
  return {
    user: Object.values(DEMO_USERS).find(u => u.id === userId) || DEMO_USERS.maria,
    rentPayments: RENT_PAYMENTS[userId] || [],
    utilityPayments: UTILITY_PAYMENTS[userId] || [],
    communityEndorsements: COMMUNITY_ENDORSEMENTS[userId] || [],
    mentorshipPrograms: MENTORSHIP_PROGRAMS[userId] || [],
    disputes: DISPUTES[userId] || [],
  };
}

// Get list of all demo users
export function getAllDemoUsers() {
  return Object.values(DEMO_USERS);
}
