export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <p><strong className="text-slate-900">What we collect.</strong> We collect your email, goal quiz answers, and usage data (pages visited, features used). We do not collect income details or bank information.</p>
          <p><strong className="text-slate-900">How we use it.</strong> To personalize your savings plan, improve the platform, and (with your consent) share anonymized goal data with dealers who bid for leads.</p>
          <p><strong className="text-slate-900">What we share.</strong> We share only your purchase goal type and target amount with dealers — never your name, email, or income without your explicit request.</p>
          <p><strong className="text-slate-900">Third parties.</strong> Firebase (Google) stores your account data. We use Anthropic's API for the AI chat. These services have their own privacy policies.</p>
          <p><strong className="text-slate-900">Your rights.</strong> You may request deletion of your account and data at any time by emailing us.</p>
        </div>
      </div>
    </div>
  );
}
