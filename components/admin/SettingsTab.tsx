'use client';
import { Save, Loader2, Globe, Phone, Tag, Megaphone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { UseSettingsReturn } from '@/lib/admin/useSettings';
import { inputCls } from '@/lib/admin/types';

interface SettingsTabProps {
  settingsHook: UseSettingsReturn;
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6">
      <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 border-l-4 border-amber-700 pl-2">
        {icon} {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1 block">{label}</label>
      {hint && <p className="text-[10px] text-slate-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

export default function SettingsTab({ settingsHook }: SettingsTabProps) {
  const { settings, setSettings, loading, saving, saveSettings } = settingsHook;

  const handleSave = async () => {
    const result = await saveSettings();
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={20} className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Pengaturan Website</h2>
          <p className="text-[12px] text-slate-400 mt-0.5">Ubah teks, kontak, dan konten tampilan website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Hero Section */}
        <Section title="Hero Section (Halaman Utama)" icon={<Globe size={15} className="text-amber-700" />}>
          <Field label="Badge / Label kecil" hint='Contoh: "NEW ARRIVAL" atau "BEST SELLER"'>
            <input
              className={inputCls}
              value={settings.hero_badge}
              onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
              placeholder="NEW ARRIVAL"
            />
          </Field>
          <Field label="Judul Utama (Hero Title)">
            <input
              className={inputCls}
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              placeholder="Luxury Inspired Fragrance"
            />
          </Field>
          <Field label="Sub-judul / Deskripsi singkat">
            <textarea
              className={`${inputCls} h-20 resize-none`}
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              placeholder="Terinspirasi dari parfum dunia terbaik..."
            />
          </Field>
        </Section>

        {/* Announcement Banner */}
        <Section title="Banner Pengumuman" icon={<Megaphone size={15} className="text-amber-700" />}>
          <Field label="Teks Pengumuman" hint="Tampil sebagai banner di atas navbar">
            <input
              className={inputCls}
              value={settings.announcement_text}
              onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
              placeholder="FREE ONGKIR untuk pembelian di atas Rp150.000 🎉"
            />
          </Field>
          <Field label="Minimum Gratis Ongkir (Rp)">
            <input
              type="number"
              className={inputCls}
              value={settings.free_ongkir_min}
              onChange={(e) => setSettings({ ...settings, free_ongkir_min: Number(e.target.value) })}
            />
          </Field>
          <Field label="Status Banner">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setSettings({ ...settings, announcement_active: !settings.announcement_active })}
                className={`relative w-10 h-5 rounded-full transition-colors ${settings.announcement_active ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.announcement_active ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <span className="text-sm text-slate-600">
                {settings.announcement_active ? '✅ Banner aktif' : '⭕ Banner disembunyikan'}
              </span>
            </label>
          </Field>
        </Section>

        {/* Kontak & Sosial */}
        <Section title="Kontak & Media Sosial" icon={<Phone size={15} className="text-amber-700" />}>
          <Field label="Nomor WhatsApp" hint="Format: 628xxxxxxxx (tanpa + atau spasi)">
            <input
              className={inputCls}
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              placeholder="6282245556161"
            />
          </Field>
          <Field label="URL Instagram">
            <input
              className={inputCls}
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              placeholder="https://www.instagram.com/hyvaarvm"
            />
          </Field>
          <Field label="URL Shopee">
            <input
              className={inputCls}
              value={settings.shopee_url}
              onChange={(e) => setSettings({ ...settings, shopee_url: e.target.value })}
              placeholder="https://shopee.co.id/hyva.arvm"
            />
          </Field>
          <Field label="URL TikTok">
            <input
              className={inputCls}
              value={settings.tiktok_url}
              onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
              placeholder="https://www.tiktok.com/@hyvaarvm"
            />
          </Field>
        </Section>

        {/* Preview */}
        <Section title="Preview Perubahan" icon={<Tag size={15} className="text-amber-700" />}>
          <div className="bg-slate-900 rounded-lg p-5 text-white">
            {settings.announcement_active && (
              <div className="bg-amber-600 text-white text-[10px] text-center py-1.5 px-3 rounded mb-4 font-medium">
                {settings.announcement_text || 'Banner pengumuman...'}
              </div>
            )}
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
              {settings.hero_badge || 'BADGE'}
            </p>
            <h2 className="text-xl font-serif font-bold leading-tight mb-2">
              {settings.hero_title || 'Judul Utama'}
            </h2>
            <p className="text-[11px] text-white/60 leading-relaxed">
              {settings.hero_subtitle || 'Sub-judul...'}
            </p>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Preview tampilan hero section & banner
          </p>
        </Section>
      </div>

      {/* SQL Helper */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-xs font-bold text-amber-800 mb-2">⚡ Setup awal — jalankan sekali di Supabase SQL Editor:</p>
        <pre className="text-[11px] text-amber-700 bg-amber-100 p-3 rounded-lg overflow-x-auto leading-relaxed">
{`-- Buat tabel site_settings (jika belum ada)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  hero_title TEXT DEFAULT 'Luxury Inspired Fragrance',
  hero_subtitle TEXT,
  hero_badge TEXT DEFAULT 'NEW ARRIVAL',
  whatsapp_number TEXT DEFAULT '6282245556161',
  instagram_url TEXT,
  shopee_url TEXT,
  tiktok_url TEXT,
  free_ongkir_min INTEGER DEFAULT 150000,
  announcement_text TEXT,
  announcement_active BOOLEAN DEFAULT true
);

-- Tambah kolom is_signature ke products (jika belum ada)
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_signature BOOLEAN DEFAULT false;`}
        </pre>
      </div>
    </div>
  );
}
