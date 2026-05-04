import PricingCard, { type PricingCardProps } from './PricingCard';

const PLANS: PricingCardProps[] = [
  {
    title: 'Free',
    price: '0',
    description: 'Perfect to get started',
    features: [
      '3 bookings / month',
      '1 team member',
      'Core dashboard',
      'Customer management',
      'PDF invoices',
    ],
    cta: 'Start free',
    highlight: false,
    dark: false,
  },
  {
    title: 'Growth',
    price: '99',
    description: 'Best for growing agencies',
    features: [
      'Everything in Free',
      '300 bookings / month',
      '5 team members',
      'Payment tracking & SST',
      'Reports & analytics',
      'Priority support',
    ],
    cta: 'Upgrade to Growth',
    highlight: true,
    dark: false,
  },
  {
    title: 'Pro',
    price: '199',
    description: 'For scaling agencies',
    features: [
      'Everything in Growth',
      'Unlimited bookings',
      '10 team members',
      'Advanced reports',
      'Dedicated onboarding',
    ],
    cta: 'Upgrade to Pro',
    highlight: false,
    dark: true,
  },
];

export default function PricingSection() {
  return (
    <div className="container">
      <div className="pricing-cards-grid">
        {PLANS.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  );
}
