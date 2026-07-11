import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { SiteSettings, EMPTY_SETTINGS } from './types';

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*').single();
    if (data) setSettings(data);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const saveSettings = async (): Promise<{ success: boolean; message: string }> => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from('site_settings').select('id').single();
      let error;
      if (existing?.id) {
        ({ error } = await supabase.from('site_settings').update(settings).eq('id', existing.id));
      } else {
        ({ error } = await supabase.from('site_settings').insert([settings]));
      }
      if (error) throw error;
      return { success: true, message: 'Pengaturan berhasil disimpan!' };
    } catch (err: any) {
      return { success: false, message: 'Gagal: ' + err.message };
    } finally {
      setSaving(false);
    }
  };

  return { settings, setSettings, loading, saving, saveSettings };
}

export type UseSettingsReturn = ReturnType<typeof useSettings>;
