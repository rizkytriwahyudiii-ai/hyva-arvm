import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  step: number;
}

const STEPS = [
  { n: 1, label: 'Info' },
  { n: 2, label: 'Kirim' },
  { n: 3, label: 'Konfirmasi' },
];

/** Indikator 3 langkah checkout: Info -> Kirim -> Konfirmasi */
export default function CheckoutSteps({ step }: CheckoutStepsProps) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                step >= s.n ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step > s.n ? <Check size={13} /> : s.n}
            </div>
            <span
              className={`text-[8px] uppercase tracking-[0.15em] ${
                step >= s.n ? 'text-black' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 ${step > s.n ? 'bg-black' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}