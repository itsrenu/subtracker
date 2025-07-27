// Mock Plaid integration for demo purposes
// In production, you would use the actual Plaid API

export interface PlaidTransaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string[];
  merchant_name?: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'weekly';
  nextBillingDate: string;
  lastUsed?: string;
  category: string;
  status: 'active' | 'cancelled' | 'warning';
  logo?: string;
}

// Mock subscription data based on common patterns
const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    frequency: 'monthly',
    nextBillingDate: '2025-08-01',
    lastUsed: '2025-07-12',
    category: 'Entertainment',
    status: 'warning',
    logo: '🎬'
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    frequency: 'monthly',
    nextBillingDate: '2025-08-03',
    lastUsed: '2025-07-26',
    category: 'Music',
    status: 'active',
    logo: '🎵'
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    frequency: 'monthly',
    nextBillingDate: '2025-07-30',
    lastUsed: '2025-07-25',
    category: 'Software',
    status: 'active',
    logo: '🎨'
  },
  {
    id: '4',
    name: 'Gym Membership',
    amount: 29.99,
    frequency: 'monthly',
    nextBillingDate: '2025-08-05',
    lastUsed: '2025-07-01',
    category: 'Health',
    status: 'warning',
    logo: '💪'
  },
  {
    id: '5',
    name: 'Cloud Storage',
    amount: 5.99,
    frequency: 'monthly',
    nextBillingDate: '2025-08-02',
    lastUsed: '2025-07-26',
    category: 'Productivity',
    status: 'active',
    logo: '☁️'
  }
];

// Mock Plaid Link integration
export const createLinkToken = async (): Promise<string> => {
  // In production, this would call Plaid's API
  return 'mock-link-token';
};

export const exchangePublicToken = async (publicToken: string): Promise<string> => {
  // In production, this would exchange the public token for an access token
  return 'mock-access-token';
};

export const getTransactions = async (accessToken: string): Promise<PlaidTransaction[]> => {
  // Mock transaction data
  return [
    {
      id: '1',
      name: 'NETFLIX.COM',
      amount: 15.99,
      date: '2025-07-15',
      category: ['Entertainment', 'Streaming'],
      merchant_name: 'Netflix'
    },
    {
      id: '2',
      name: 'SPOTIFY',
      amount: 9.99,
      date: '2025-07-03',
      category: ['Music', 'Streaming'],
      merchant_name: 'Spotify'
    }
  ];
};

export const detectSubscriptions = async (transactions: PlaidTransaction[]): Promise<Subscription[]> => {
  // For demo purposes, return mock subscriptions
  return MOCK_SUBSCRIPTIONS;
};

export const getSubscriptions = async (): Promise<Subscription[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_SUBSCRIPTIONS;
};

export const calculateMonthlyTotal = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce((total, sub) => {
    if (sub.frequency === 'monthly') return total + sub.amount;
    if (sub.frequency === 'yearly') return total + (sub.amount / 12);
    if (sub.frequency === 'weekly') return total + (sub.amount * 4.33);
    return total;
  }, 0);
};

export const calculateAnnualSavings = (subscriptions: Subscription[]): number => {
  const warningSubscriptions = subscriptions.filter(sub => sub.status === 'warning');
  return warningSubscriptions.reduce((total, sub) => {
    if (sub.frequency === 'monthly') return total + (sub.amount * 12);
    if (sub.frequency === 'yearly') return total + sub.amount;
    if (sub.frequency === 'weekly') return total + (sub.amount * 52);
    return total;
  }, 0);
};