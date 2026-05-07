export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <p><strong className="text-slate-900">1. Educational use only.</strong> This platform provides educational content and goal-planning tools. It is not a financial advisor, broker, or dealer.</p>
          <p><strong className="text-slate-900">2. Age requirement.</strong> You must be 18 or older to use this platform.</p>
          <p><strong className="text-slate-900">3. Referral disclosure.</strong> We earn referral fees when you open investment accounts through our partner links or when dealers pay us for your lead. This is disclosed on all relevant pages.</p>
          <p><strong className="text-slate-900">4. No liability.</strong> We are not liable for financial decisions you make based on our educational content or dealer referrals.</p>
          <p><strong className="text-slate-900">5. Subscription.</strong> Premium subscriptions may be cancelled at any time. Refunds are available within 7 days of purchase.</p>
          <p><strong className="text-slate-900">6. Dealer terms.</strong> Dealers in our marketplace are independent. We do not guarantee any specific pricing or availability.</p>
        </div>
      </div>
    </div>
  );
}
