/* ==========================================================================
   WILAYAH-API.JS: ENGINE PENGAMBILAN DATA WILAYAH (ANTI-GAGAL)
   ========================================================================== */

async function fetchWilayah(endpoint) {
    try {
        const response = await fetch(`https://wilayah.id/api/${endpoint}.json`);
        if (!response.ok) throw new Error("Gagal mengambil data dari server");
        const json = await response.json();
        return json.data || [];
    } catch (error) {
        console.error("Error API Wilayah:", error);
        return []; // Mengembalikan array kosong agar tidak crash
    }
}

async function loadDaftarProvinsi() {
    const provSelect = document.getElementById('checkout-provinsi');
    if (!provSelect) return;
    
    provSelect.innerHTML = '<option value="">Memuat Provinsi...</option>';
    const data = await fetchWilayah('provinces');
    
    provSelect.innerHTML = '<option value="">Pilih Provinsi</option>';
    data.forEach(p => {
        provSelect.innerHTML += `<option value="${p.code}">${p.name}</option>`;
    });
}

async function loadDaftarKota(provCode) {
    const kotaSelect = document.getElementById('checkout-kota');
    if (!kotaSelect) return;
    
    kotaSelect.innerHTML = '<option value="">Memuat Kota...</option>';
    const data = await fetchWilayah(`regencies/${provCode}`);
    
    kotaSelect.innerHTML = '<option value="">Pilih Kota / Kabupaten</option>';
    data.forEach(k => {
        kotaSelect.innerHTML += `<option value="${k.code}">${k.name}</option>`;
    });
}

async function loadDaftarKecamatan(kotaCode) {
    const kecSelect = document.getElementById('checkout-kecamatan');
    if (!kecSelect) return;
    
    kecSelect.innerHTML = '<option value="">Memuat Kecamatan...</option>';
    const data = await fetchWilayah(`districts/${kotaCode}`);
    
    kecSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
    data.forEach(d => {
        kecSelect.innerHTML += `<option value="${d.code}">${d.name}</option>`;
    });
}
