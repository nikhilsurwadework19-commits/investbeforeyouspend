export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Disclaimer</h1>
        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <p><strong className="text-slate-900">Educational Purpose Only.</strong> InvestBeforeYouSpend is an educational platform. Nothing on this website constitutes financial, investment, legal, or tax advice.</p>
          <p><strong className="text-slate-900">Referral Fees.</strong> We earn referral fees when users open accounts with our partner investment platforms (Fidelity, Schwab, Marcus, etc.) and when dealers pay us for qualified leads. This does not affect the information we provide.</p>
          <p><strong className="text-slate-900">No Guarantees.</strong> Investment returns shown are historical averages. Past performance does not guarantee future results. You may lose money investing.</p>
          <p><strong className="text-slate-900">Consult a Professional.</strong> Always consult a licensed financial advisor before making investment decisions. We are not licensed financial advisors.</p>
          <p><strong className="text-slate-900">Dealer Relationships.</strong> Dealers in our marketplace are independent businesses. We do not guarantee their pricing, availability, or conduct.</p>
        </div>
      </div>
    </div>
  );
}
