import { ReactNode } from 'react';

interface FieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

/** Wrapper label + input yang dipakai berulang di seluruh form checkout */
export default function Field({ label, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-gray-400">{hint}</p>}
    </div>
  );
}