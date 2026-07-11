import { UseCustomersReturn } from '@/lib/admin/useCustomers';

interface CustomersTabProps {
  customersHook: UseCustomersReturn;
}

/** Tab "Daftar Pelanggan Terdaftar" — tabel sederhana data profil user */
export default function CustomersTab({ customersHook }: CustomersTabProps) {
  const { customers, loading } = customersHook;

  if (loading) {
    return <p className="text-center text-slate-400 py-12 text-sm">Memuat data pelanggan...</p>;
  }

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-white">
        <h3 className="font-bold text-slate-800">Database Akun Pengguna Terintegrasi</h3>
        <p className="text-[12px] text-slate-400 mt-0.5">{customers.length} pelanggan terdaftar</p>
      </div>

      {customers.length === 0 ? (
        <p className="text-center text-slate-400 py-12 text-sm">Belum ada pelanggan terdaftar</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wide">
              <tr>
                <th className="p-4 text-left">UID</th>
                <th className="p-4 text-left">Nama Akun</th>
                <th className="p-4 text-left">No. WhatsApp</th>
                <th className="p-4 text-left">Alamat</th>
                <th className="p-4 text-left">Terdaftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-[11px] text-slate-400">
                    {c.id.slice(0, 8)}...
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{c.full_name || '-'}</td>
                  <td className="p-4 text-slate-600">{c.phone || '-'}</td>
                  <td className="p-4 text-slate-500 max-w-[240px] truncate">{c.address || '-'}</td>
                  <td className="p-4 text-[12px] text-slate-400 whitespace-nowrap">
                    {c.created_at
                      ? new Date(c.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}