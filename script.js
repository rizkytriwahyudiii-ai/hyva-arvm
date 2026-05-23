/* ==========================================================================
   1. DATA PRODUK (DATABASE DINAMIS TERINTEGRASI DASHBOARD ADMIN)
   ========================================================================== */
const defaultMasterProducts = [
    { id: 1, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Romance Wish", price: 48000, img: "ROMANCE-WISH.jpeg", desc: "Aroma floral yang sexy dan fresh. Lembut dan feminin sepanjang hari.", notes: { top: "Floral", heart: "Cucumber", base: "Freesia" }, karakter: "bunga mentimun segar dingin lembut santai siang hari keringat", rating: { top: 5, heart: 3, base: 2, longevity: 80 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 2, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Aqua Kiss", price: 48000, img: "AQUA-KISS.jpeg", desc: "Kesegaran aquatic yang sporty. Menetralkan bau badan asam.", notes: { top: "Sea Notes", heart: "Aloe Vera", base: "Daisy" }, karakter: "laut air pantai citrus dingin segar olahraga panas matahari", rating: { top: 5, heart: 4, base: 2, longevity: 60 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 3, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Scandalous", price: 48000, img: "SCANDALOUS.jpeg", desc: "Aroma manis buah raspberry yang mewah dan elegan.", notes: { top: "Raspberry", heart: "Peony", base: "Praline" }, karakter: "buah manis elegan pesta mewah malam hari kencan", rating: { top: 4, heart: 3, base: 5, longevity: 85 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 4, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Taylor Swift", price: 48000, img: "TYLOR-SWITH.jpeg", desc: "Aroma manis buah yang ceria dan soft.", notes: { top: "Apricot", heart: "Honeysuckle", base: "Musk" }, karakter: "buah manis ceria lembut kalem sekolah kantor", rating: { top: 5, heart: 3, base: 3, longevity: 70 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 5, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Pink Chiffon", price: 48000, img: "PINK-CHIFON.jpeg", desc: "Wangi manis lembut, feminin, dan sedikit powdery.", notes: { top: "Red Pear", heart: "Tiare Flower", base: "Chiffon Musk" }, karakter: "manis bedak lembut cantik ceria feminin", rating: { top: 4, heart: 4, base: 3, longevity: 75 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 6, brand: "HYVA ARVM", category: "unisex", name: "Inspired by Baccarat Rouge 540", price: 48000, img: "BACCART.jpeg", desc: "Kemewahan amberwood yang ikonik. Aroma sultan yang bold.", notes: { top: "Saffron", heart: "Amberwood", base: "Fir Resin" }, karakter: "mewah sultan mahal kayu hangat bold elegan", rating: { top: 4, heart: 5, base: 5, longevity: 95 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 7, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Black Opium", price: 48000, img: "BLACK-OPIUM.jpeg", desc: "Kombinasi kopi dan vanilla yang misterius.", notes: { top: "Coffee", heart: "Jasmine", base: "Vanilla" }, karakter: "kopi manis elegan malam hari pesta menggoda", rating: { top: 4, heart: 3, base: 5, longevity: 90 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 8, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Vanilla Mango", price: 48000, img: "VANILA-MANGO.jpeg", desc: "Perpaduan segar mangga tropis dan manis vanilla.", notes: { top: "Mango", heart: "Peach", base: "Vanilla" }, karakter: "mangga buah tropis segar manis siang hari", rating: { top: 5, heart: 3, base: 4, longevity: 80 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 9, brand: "HYVA ARVM", category: "wanita", name: "Inspired by Wild Vanilla", price: 48000, img: "WILD-VANILA.jpeg", desc: "Aroma vanilla murni yang hangat dan klasik.", notes: { top: "Vanilla Bean", heart: "Sugar", base: "White Musk" }, karakter: "vanilla manis hangat kalem klasik nyaman", rating: { top: 3, heart: 3, base: 5, longevity: 85 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 10, brand: "HYVA ARVM", category: "pria", name: "Inspired by 212 VIP Man", price: 48000, img: "212-VIP-MAN.jpeg", desc: "Aroma maskulin yang enerjik dan eksklusif.", notes: { top: "Lime", heart: "Ginger", base: "Leather" }, karakter: "pria maskulin berani segar jahe sukses modern", rating: { top: 4, heart: 4, base: 4, longevity: 80 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 11, brand: "HYVA ARVM", category: "pria", name: "Inspired by Dunhill Blue", price: 48000, img: "DUNHIL-BLUE.jpeg", desc: "Kesegaran jeruk dan laut clean.", notes: { top: "Lychee", heart: "Rosewood", base: "Amber" }, karakter: "jeruk leci kamu segar dingin maskulin kerja", rating: { top: 5, heart: 3, base: 3, longevity: 80 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 12, brand: "HYVA ARVM", category: "pria", name: "Inspired by Lacoste Sport", price: 48000, img: "LACOSTE-SPORT.jpeg", desc: "Aroma sangat fresh. Terbaik untuk olahraga.", notes: { top: "Grapefruit", heart: "Juniper", base: "Cedar" }, karakter: "sporty segar jeruk olahraga keringat bersih", rating: { top: 5, heart: 4, base: 2, longevity: 70 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 13, brand: "HYVA ARVM", category: "pria", name: "Inspired by One Million Lucky", price: 48000, img: "ONE-MILION-LUCKY.jpeg", desc: "Wangi woodsy yang manis dan unik.", notes: { top: "Plum", heart: "Hazelnut", base: "Cedar" }, karakter: "kayu manis unik memikat beruntung kacang", rating: { top: 4, heart: 5, base: 4, longevity: 85 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 14, brand: "HYVA ARVM", category: "unisex", name: "Inspired by YSL Libre", price: 48000, img: "YSL-LIBRE.jpeg", desc: "Kebebasan dalam aroma lavender mewah.", notes: { top: "Lavender", heart: "Orange Blossom", base: "Vanilla" }, karakter: "lavender bunga mewah unisex bebas berkelas", rating: { top: 4, heart: 4, base: 4, longevity: 90 }, shopeeLink: "https://shopee.co.id/hyva.arvm" },
    { id: 15, brand: "HYVA ARVM", category: "unisex", name: "PROMO BUNDLING 3 BOTOL", price: 140000, img: "bandling.WEBP", desc: "Bebas pilih 3 varian apa saja.", notes: { top: "Mix", heart: "Mix", base: "Mix" }, karakter: "promo paket hemat pilihan banyak", rating: { top: 5, heart: 5, base: 5, longevity: 100 }, shopeeLink: "https://shopee.co.id/hyva.arvm" }
];

// Sinkronisasi data utama agar membaca perubahan dari admin panel
if(!localStorage.getItem('hyva_products_database')) {
    localStorage.setItem('hyva_products_database', JSON.stringify(defaultMasterProducts));
}
const products = JSON.parse(localStorage.getItem('hyva_products_database'));

/* ==========================================================================
   2. FUNGSI TAMPILAN PRODUK (RENDERING & FILTER)
   ========================================================================== */
function renderStars(count) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < count ? "★" : "☆";
    }
    return stars;
}

function displayProducts(filteredItems = products) {
    const list = document.getElementById('product-list');
    if (!list) return;
    
    list.innerHTML = "";
    
    filteredItems.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-card';
        
        item.innerHTML = `
            <div onclick="openDetail(${product.id})" style="cursor:pointer">
                <img src="${product.img}" alt="${product.name}">
                <p class="brand notranslate" translate="no">${product.brand}</p>
                <h3 class="notranslate" translate="no">${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString()}</p>
            </div>
            <button class="btn-add" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i> 
                Add To Cart
            </button>
        `;
        list.appendChild(item);
    });
}

function filterAroma() {
    const query = document.getElementById('aromaSearch').value.toLowerCase();
    const filtered = products.filter(p => {
        return p.name.toLowerCase().includes(query) || 
               p.desc.toLowerCase().includes(query) || 
               p.karakter.toLowerCase().includes(query);
    });
    displayProducts(filtered);
}

function filterProducts(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
    window.scrollTo({ top: 650, behavior: 'smooth' });
}

/* ==========================================================================
   3. DETAIL PRODUK (MODAL DETAIL)
   ========================================================================== */
function openDetail(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    document.getElementById('detail-img').src = p.img;
    document.getElementById('detail-brand').innerText = p.brand;
    document.getElementById('detail-name').innerText = p.name;
    document.getElementById('detail-price').innerText = "Rp " + p.price.toLocaleString();
    document.getElementById('detail-desc').innerText = p.desc;

    document.getElementById('note-top').innerText = p.notes.top;
    document.getElementById('note-heart').innerText = p.notes.heart;
    document.getElementById('note-base').innerText = p.notes.base;

    document.getElementById('stars-top').innerHTML = renderStars(p.rating.top);
    document.getElementById('stars-heart').innerHTML = renderStars(p.rating.heart);
    document.getElementById('stars-base').innerHTML = renderStars(p.rating.base);

    const bar = document.getElementById('bar-fill');
    if (bar) {
        bar.style.width = "0%";
        setTimeout(() => {
            bar.style.width = p.rating.longevity + "%";
        }, 100);
    }

    document.getElementById('add-to-bag-btn').onclick = function() {
        addToCart(p.id);
        closeDetail(); 
    };

    document.getElementById('product-detail-modal').style.display = "block";
}

function closeDetail() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) {
        modal.style.display = "none";
        console.log("Modal berhasil ditutup.");
    } else {
        console.error("Elemen dengan ID 'product-detail-modal' tidak ditemukan!");
    }
}

/* ==========================================================================
   4. SISTEM KERANJANG (CART LOGIC) - VERSI WAJIB LOGIN & MODAL ALAMAT MODERN
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem('hyva_cart')) || [];

function saveCartToStorage() {
    localStorage.setItem('hyva_cart', JSON.stringify(cart));
}

function addToCart(id) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        showHyvaToast("Pemberitahuan: Anda harus masuk/login terlebih dahulu untuk menambahkan produk ke keranjang belanja!", "fas fa-user-lock");
        if (typeof openAuthModal === 'function') {
            openAuthModal('login');
        }
        return;
    }

    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        saveCartToStorage();
        updateCartUI();
        showHyvaToast(`Berhasil menambahkan "${product.name}" ke keranjang.`, "fas fa-shopping-bag");
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    const container = document.getElementById('cart-items');
    if (container) {
        if (cart.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:#999; padding:20px 0;">Keranjang belanjaan Anda kosong.</p>`;
        } else {
            let itemsHtml = cart.map((item, index) => `
                <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <div>
                        <p style="margin: 0; font-weight: bold; font-size:13px;">${item.name}</p>
                        <p style="margin: 0; color: #8b734b; font-weight:600; font-size:12px;">Rp ${item.price.toLocaleString()}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="btn-remove" title="Hapus Barang" style="background:none; border:none; color:#d9534f; cursor:pointer; font-size:11px; font-weight:bold;">
                        <i class="fas fa-trash-alt"></i> HAPUS
                    </button>
                </div>
            `).join('');

            // Membaca alamat yang tersimpan untuk ditampilkan sebagai info ringkas di dalam keranjang
            let savedAddressInfo = localStorage.getItem('userAddress') || 'Belum diisi';
            let addressStyle = savedAddressInfo === 'Belum diisi' ? 'color:#d9534f; font-weight:bold;' : 'color:#2e7d32; font-weight:600;';

            let addressPreviewHtml = `
                <div class="form-shipping-address" style="margin-top: 20px; border-top: 2px dashed #8b734b; padding-top: 15px;">
                    <h4 style="font-size:13px; margin-bottom:8px; text-transform:uppercase; color:#262525; display:flex; justify-content:space-between; align-items:center;">
                        <span><i class="fas fa-map-marker-alt" style="color:#d4af37;"></i> Alamat Tujuan Pengiriman</span>
                        <a href="javascript:void(0)" onclick="openAddressModal()" style="color:#d4af37; text-transform:none; font-size:11px; text-decoration:underline;">Ubah Alamat</a>
                    </h4>
                    <div style="background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #e2e8f0; font-size:12px; line-height:1.4; ${addressStyle}">
                        ${savedAddressInfo}
                    </div>
                </div>
            `;
            
            container.innerHTML = itemsHtml + addressPreviewHtml;
        }
    }

    const totalLabel = document.getElementById('total-price');
    if (totalLabel) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalLabel.innerText = "Rp " + total.toLocaleString();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartUI();
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
        document.body.style.overflow = 'auto';
    } else {
        cartModal.style.display = "block";
        updateCartUI(); 
        document.body.style.overflow = 'hidden';
    }
}

/* ==========================================================================
   5. PEMBAYARAN & CHECKOUT WITH STATUS TRACKING (INTEGRATED WITH ADRESS MODAL)
   ========================================================================== */
function checkoutWA() {
    if (cart.length === 0) {
        showHyvaToast("Gagal: Keranjang belanjaan Kakak masih kosong! 🛒", "fas fa-shopping-cart");
        return;
    }
    
    const savedAddress = localStorage.getItem('userAddress');
    const savedPhone = localStorage.getItem('userPhone') || '-';
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Pelanggan Hyva';

    // VALIDASI PEMBLOKIRAN DATA KOSONG
    if (!savedAddress || savedAddress.trim() === "" || savedAddress === "Belum diisi") {
        showHyvaToast("Alamat pengiriman belum diatur. Yuk lengkapi terlebih dahulu! 📍", "fas fa-map-marked-alt");
        toggleCart(); // Tutup keranjang agar modal alamat terlihat jelas
        openAddressModal();
        return; // BERHENTI MUTLAK
    }

    let msg = `Halo Hyva Arvm, saya mau pesan:%0A`;
    cart.forEach(i => msg += `- ${i.name}%0A`);
    let total = cart.reduce((s, i) => s + i.price, 0);
    msg += `%0ATotal: Rp ${total.toLocaleString()}%0A%0A`;
    msg += `*Detail Pengiriman:*%0ANama Penerima: ${loggedInUser}%0AAlamat: ${savedAddress}%0ANo HP/WA: ${savedPhone}`;
    
    simpanTransaksiKeRiwayat(loggedInUser, savedPhone, savedAddress, total);
    window.open(`https://wa.me/6282245556161?text=${msg}`, '_blank');
}

function checkoutShopee() {
    if (cart.length === 0) {
        showHyvaToast("Keranjangmu masih kosong, silakan pilih parfum favoritmu dulu! ✨", "fas fa-ghost");
        return;
    }
    if (cart.length === 1 && cart[0].shopeeLink) {
        window.open(cart[0].shopeeLink, "_blank");
    } else {
        window.open("https://shopee.co.id/hyva.arvm", "_blank");
        showHyvaToast("Kakak memilih beberapa produk. Silakan cari variannya di etalase Shopee kami ya! 🛍️", "fas fa-info-circle");
    }
}

function checkoutOtomatis() {
    if (cart.length === 0) {
        showHyvaToast("Gagal: Keranjang belanjaan Kakak masih kosong! 🛒", "fas fa-shopping-cart");
        return;
    }
    
    const savedAddress = localStorage.getItem('userAddress');
    const savedPhone = localStorage.getItem('userPhone') || '-';
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Pelanggan Hyva';

    // VALIDASI PEMBLOKIRAN DATA KOSONG
    if (!savedAddress || savedAddress.trim() === "" || savedAddress === "Belum diisi") {
        showHyvaToast("Alamat pengiriman belum diatur. Yuk lengkapi terlebih dahulu! 📍", "fas fa-map-marked-alt");
        toggleCart(); // Tutup keranjang agar modal alamat terlihat jelas
        openAddressModal();
        return; // BERHENTI MUTLAK
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalLabel = document.getElementById('qris-total');
    if (totalLabel) {
        totalLabel.innerText = "Rp " + total.toLocaleString();
    }
    
    sessionStorage.setItem('temp_shipping', JSON.stringify({ name: loggedInUser, phone: savedPhone, address: savedAddress }));
    
    toggleCart(); 
    openPayModal();
}

function openPayModal() {
    const modal = document.getElementById('qris-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closePayModal() {
    const modal = document.getElementById('qris-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmPayment() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = JSON.parse(sessionStorage.getItem('temp_shipping')) || { name: 'Penerima', phone: '-', address: '-' };
    
    const pesan = encodeURIComponent(
        `Halo Admin Hyva Arvm, saya sudah bayar sebesar Rp ${total.toLocaleString()}.\n\n` +
        `Produk:\n${cart.map(i => `- ${i.name}`).join('\n')}\n\n` +
        `Detail Tujuan Pengiriman:\nNama: ${shipping.name}\nNo WA: ${shipping.phone}\nAlamat: ${shipping.address}`
    );
    
    simpanTransaksiKeRiwayat(shipping.name, shipping.phone, shipping.address, total);
    window.open(`https://wa.me/6282245556161?text=${pesan}`, "_blank");

    if (typeof pemicuUlasanSetelahBeli === 'function') pemicuUlasanSetelahBeli();

    cart = [];
    localStorage.removeItem('hyva_cart');
    sessionStorage.removeItem('temp_shipping');
    updateCartUI();
    closePayModal();
    
    showHyvaToast("Pembayaran sukses dicatat! Status diatur menjadi 'Sedang Dikemas'. Cek riwayat pengiriman di dashboard Kakak ✨", "fas fa-check-circle");
    
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

function hubungiAdmin() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const pesan = encodeURIComponent(`Halo Admin Hyva Arvm, saya sudah melakukan pembayaran QRIS sebesar Rp ${total.toLocaleString()}. Berikut bukti bayarnya.`);
    window.open(`https://wa.me/6282245556161?text=${pesan}`, "_blank");
}

function simpanTransaksiKeRiwayat(nama, wa, alamat, totalHarga) {
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Guest';
    const orderId = "HA-" + Math.floor(100000 + Math.random() * 900000); 
    
    let kumpulkanItem = {};
    cart.forEach(item => {
        kumpulkanItem[item.name] = (kumpulkanItem[item.name] || 0) + 1;
    });
    
    let itemsFormattedString = Object.keys(kumpulkanItem).map(name => `${name} (${kumpulkanItem[name]}x)`).join(', ');

    const orderData = {
        orderId: orderId,
        username: loggedInUser,
        items: itemsFormattedString,
        totalPrice: totalHarga,
        shippingAddress: alamat,
        receiverName: nama,
        receiverPhone: wa,
        status: "Sedang Dikemas", 
        date: new Date().toLocaleDateString('id-ID')
    };

    let globalOrders = JSON.parse(localStorage.getItem('hyva_global_orders')) || [];
    globalOrders.unshift(orderData);
    localStorage.setItem('hyva_global_orders', JSON.stringify(globalOrders));

    if (typeof renderUserOrderStatus === 'function') {
        renderUserOrderStatus();
    }
}

function renderUserOrderStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const statusContainer = document.getElementById('user-order-tracking-section');
    
    if (!statusContainer) return;
    
    if (!loggedInUser) {
        statusContainer.innerHTML = `
            <div class="tracking-card-container" style="text-align: center; padding: 30px;">
                <i class="fas fa-user-lock" style="font-size: 30px; color: #ccc; margin-bottom: 10px;"></i>
                <p style="color:#666; font-size:14px; margin: 0;">Silakan <strong>Login / Masuk</strong> terlebih dahulu untuk melacak status pengiriman paket pesanan Anda secara real-time.</p>
            </div>
        `;
        return;
    }
    
    let globalOrders = JSON.parse(localStorage.getItem('hyva_global_orders')) || [];
    let userOrders = globalOrders.filter(order => order.username === loggedInUser);
    
    if (userOrders.length === 0) {
        statusContainer.innerHTML = `
            <div class="tracking-card-container" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-box-open" style="font-size: 40px; color: #dbd3c5; margin-bottom: 15px;"></i>
                <h4 class="tracking-title" style="justify-content: center; font-size: 18px; margin-bottom: 5px;">Belum Ada Riwayat Pengiriman</h4>
                <p style="color:#777; font-size:13px; margin: 0;">Seluruh riwayat pesanan parfum Anda akan tercatat secara aman di sini setelah Anda menyelesaikan pembayaran.</p>
            </div>
        `;
        return;
    }
    
    let htmlTableRows = userOrders.map(order => {
        let badgeClass = "badge-packing"; 
        if (order.status === "Dikirim") badgeClass = "badge-transit";
        if (order.status === "Selesai") badgeClass = "badge-delivered";
        
        return `
            <tr>
                <td style="font-weight: bold; color: #a68b5c;">${order.orderId}</td>
                <td style="color: #666;">${order.date}</td>
                <td style="max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight: 500;" title="${order.items}">${order.items}</td>
                <td style="font-weight:600;">Rp ${order.totalPrice.toLocaleString()}</td>
                <td>
                    <span class="badge-status-shipping ${badgeClass}">
                        ${order.status}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
    
    statusContainer.innerHTML = `
        <div class="tracking-card-container">
            <h3 class="tracking-title"><i class="fas fa-shipping-fast"></i> Riwayat Pelacakan Pengiriman</h3>
            <div class="table-responsive-wrapper">
                <table class="tracking-table-style">
                    <thead>
                        <tr>
                            <th>ID Order</th>
                            <th>Tanggal</th>
                            <th>Produk Parfum</th>
                            <th>Total Pembayaran</th>
                            <th>Status Pengiriman</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlTableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/* ==========================================================================
   FUNGSI ALAMAT PREMIUM STYLE SHOPEE - PECAH KOLOM WILAYAH & AUTO GUEST FIX
   ========================================================================== */

let hyvaMap = null;
let hyvaMarker = null;

// 1. Fungsi Membuka Modal Alamat Terstruktur Premium
function openAddressModal() {
    let addressModal = document.getElementById('address-modal');
    
    // Ambil sesi user aktif, jika null buat objek kosong agar pembeli non-login/guest tidak diblokir
    const currentUser = JSON.parse(localStorage.getItem('hyva_logged_in_user')) || {};
    
    let nama = currentUser.name || "";
    let telepon = currentUser.phone || "";
    let provinsi = "";
    let kota = "";
    let kecamatan = "";
    let kodePos = "";
    let detailAlamat = currentUser.address || "";
    let koordinatText = "";

    // Muat data jika sebelumnya sudah pernah tersimpan terstruktur
    if (currentUser.structuredAddress) {
        nama = currentUser.structuredAddress.nama || nama;
        telepon = currentUser.structuredAddress.telepon || telepon;
        provinsi = currentUser.structuredAddress.provinsi || "";
        kota = currentUser.structuredAddress.kota || "";
        kecamatan = currentUser.structuredAddress.kecamatan || "";
        kodePos = currentUser.structuredAddress.kodePos || "";
        detailAlamat = currentUser.structuredAddress.detailAlamat || "";
        if (currentUser.structuredAddress.lat && currentUser.structuredAddress.lng) {
            koordinatText = `${currentUser.structuredAddress.lat}, ${currentUser.structuredAddress.lng}`;
        }
    } else if (detailAlamat && detailAlamat.includes("PROV:")) {
        // Antisipasi pembersihan jika ada sisa string format lama
        detailAlamat = detailAlamat.split(', PROV:')[0];
    }

    if (!addressModal) {
        addressModal = document.createElement('div');
        addressModal.id = 'address-modal';
        addressModal.className = 'hyva-pay-modal';
        addressModal.style.display = 'flex';
        addressModal.style.zIndex = '9999';
        document.body.appendChild(addressModal);
    }

    // Render Form Terpisah Sesuai Permintaan (Provinsi, Kota, Kecamatan, Kode Pos)
    addressModal.innerHTML = `
        <div class="logout-box" style="max-width: 580px; width: 95%; padding: 25px; border-radius: 12px; text-align: left; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 5px; color: #1a1a1a; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-map-marker-alt" style="color: #a68b5c;"></i> Alamat Pengiriman Baru
            </h3>
            <p style="font-size: 12px; color: #777; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Mohon isi informasi pengiriman lengkap serta tandai titik lokasi rumah Kakak.</p>
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">NAMA LENGKAP</label>
                        <input type="text" id="addr-nama" value="${nama}" placeholder="Nama Penerima" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">NOMOR TELEPON</label>
                        <input type="tel" id="addr-telepon" value="${telepon}" placeholder="Contoh: 0822..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">PROVINSI</label>
                        <input type="text" id="addr-provinsi" value="${provinsi}" placeholder="Contoh: Jawa Timur" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">KOTA / KABUPATEN</label>
                        <input type="text" id="addr-kota" value="${kota}" placeholder="Contoh: Mojokerto" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">KECAMATAN</label>
                        <input type="text" id="addr-kecamatan" value="${kecamatan}" placeholder="Contoh: Magersari" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">KODE POS</label>
                        <input type="text" id="addr-kodepos" value="${kodePos}" placeholder="Contoh: 61318" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px;">
                    </div>
                </div>

                <div>
                    <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">ALAMAT LENGKAP (NAMA JALAN, NO. RUMAH, RT/RW, BLOK)</label>
                    <textarea id="addr-detail" placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kompleks Perumahan, atau Patokan Unit" style="width: 100%; height: 60px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 13px; resize: none;">${detailAlamat}</textarea>
                </div>

                <div>
                    <label style="font-size: 11px; font-weight: 600; color: #444; display: block; margin-bottom: 5px;">TITIK KOORDINAT LOKASI (MAPS)</label>
                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="text" id="addr-koordinat" value="${koordinatText}" readonly placeholder="Belum ada lokasi yang ditandai" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #f9f9f9; font-size: 12px; color: #555;">
                        <button type="button" onclick="aktifkanPetaInteraktif()" style="padding: 10px 14px; background: #a68b5c; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-map-marked-alt"></i> TANDAI TITIK
                        </button>
                    </div>
                    <div id="hyva-map-container" style="display: none; width: 100%; height: 180px; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin-top: 10px;"></div>
                    <p id="map-hint" style="font-size: 11px; color: #888; display: none; margin-top: 4px;"><i class="fas fa-info-circle"></i> Geser pin merah tepat di atas lokasi atap rumah Kakak.</p>
                </div>
            </div>

            <div class="logout-actions" style="margin-top: 25px; display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn-login-tokped" onclick="closeAddressModal()" style="padding: 10px 20px; background: #f5f5f5; color: #333; border: 1px solid #ddd; min-width: auto; cursor: pointer; font-size: 12px;">BATAL</button>
                <button type="button" class="btn-register-tokped" onclick="saveUserAddress()" style="padding: 10px 25px; background: #000; color: #fff; min-width: auto; cursor: pointer; font-size: 12px;">SIMPAN</button>
            </div>
        </div>
    `;
    addressModal.style.display = 'flex';
}

// 2. Fungsi Menampilkan Peta Interaktif Leaflet
function aktifkanPetaInteraktif() {
    const mapContainer = document.getElementById('hyva-map-container');
    const mapHint = document.getElementById('map-hint');
    if (!mapContainer) return;

    mapContainer.style.display = 'block';
    mapHint.style.display = 'block';

    let defaultLat = -7.4705;
    let defaultLng = 112.4401;

    const coordsInput = document.getElementById('addr-koordinat').value;
    if (coordsInput) {
        const splitCoords = coordsInput.split(',');
        if (splitCoords.length === 2) {
            defaultLat = parseFloat(splitCoords[0]);
            defaultLng = parseFloat(splitCoords[1]);
        }
    }

    if (hyvaMap === null) {
        hyvaMap = L.map('hyva-map-container').setView([defaultLat, defaultLng], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© Hyva Arvm'
        }).addTo(hyvaMap);

        hyvaMarker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(hyvaMap);

        hyvaMarker.on('dragend', function () {
            const position = hyvaMarker.getLatLng();
            updateKoordinatForm(position.lat, position.lng);
        });

        hyvaMap.on('click', function (e) {
            hyvaMarker.setLatLng(e.latlng);
            updateKoordinatForm(e.latlng.lat, e.latlng.lng);
        });
    } else {
        hyvaMap.invalidateSize();
        hyvaMap.setView([defaultLat, defaultLng], 15);
        hyvaMarker.setLatLng([defaultLat, defaultLng]);
    }

    if (navigator.geolocation && !coordsInput) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            if(hyvaMap) {
                hyvaMap.setView([userLat, userLng], 17);
                hyvaMarker.setLatLng([userLat, userLng]);
                updateKoordinatForm(userLat, userLng);
            }
        }, function() {
            updateKoordinatForm(defaultLat, defaultLng);
        });
    } else {
        updateKoordinatForm(defaultLat, defaultLng);
    }
}

// 3. Otomatis Deteksi Pecahan Wilayah (Reverse Geocoding Luar Negeri/Lokal)
function updateKoordinatForm(lat, lng) {
    const fixedLat = lat.toFixed(6);
    const fixedLng = lng.toFixed(6);
    const elKoor = document.getElementById('addr-koordinat');
    if (elKoor) elKoor.value = `${fixedLat}, ${fixedLng}`;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${fixedLat}&lon=${fixedLng}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.address) {
                const elProv = document.getElementById('addr-provinsi');
                const elKota = document.getElementById('addr-kota');
                const elKec = document.getElementById('addr-kecamatan');
                const elPos = document.getElementById('addr-kodepos');

                // Isi otomatis pecahan formulir berdasarkan deteksi koordinat GPS peta
                if (elProv) elProv.value = data.address.state || "";
                if (elKota) elKota.value = data.address.city || data.address.regency || data.address.county || "";
                if (elKec) elKec.value = data.address.subdistrict || data.address.village || data.address.suburb || "";
                if (elPos) elPos.value = data.address.postcode || "";
            }
        }).catch(err => console.log("Gagal reverse geocoding"));
}

// 4. Menutup Modal Alamat & Bersihkan Instance Peta
function closeAddressModal() {
    const addressModal = document.getElementById('address-modal');
    if (addressModal) addressModal.style.display = 'none';
    hyvaMap = null; 
}

// 5. Fungsi Penyimpanan Canggih (Mendukung Pembeli Guest / Non-Login)
function saveUserAddress() {
    // Pengumpul elemen DOM aman
    const elNama = document.getElementById('addr-nama');
    const elTelepon = document.getElementById('addr-telepon');
    const elProvinsi = document.getElementById('addr-provinsi');
    const elKota = document.getElementById('addr-kota');
    const elKecamatan = document.getElementById('addr-kecamatan');
    const elKodePos = document.getElementById('addr-kodepos');
    const elDetail = document.getElementById('addr-detail');
    const elKoor = document.getElementById('addr-koordinat');

    if (!elNama || !elTelepon || !elProvinsi || !elKota || !elKecamatan || !elKodePos || !elDetail) return;

    const nama = elNama.value.trim();
    const telepon = elTelepon.value.trim();
    const provinsi = elProvinsi.value.trim();
    const kota = elKota.value.trim();
    const kecamatan = elKecamatan.value.trim();
    const kodePos = elKodePos.value.trim();
    const detailAlamat = elDetail.value.trim();
    const koordinatText = elKoor ? elKoor.value.trim() : "";

    // Validasi Kelengkapan Isi Form
    if (!nama || !telepon || !provinsi || !kota || !kecamatan || !kodePos || !detailAlamat) {
        if (typeof showHyvaToast === "function") {
            showHyvaToast("Mohon lengkapi seluruh kolom alamat Kak! ⚠️", "fas fa-exclamation-triangle");
        } else {
            alert("Mohon lengkapi seluruh kolom alamat Kak!");
        }
        return;
    }

    let lat = "", lng = "", mapsLink = "";
    if (koordinatText && koordinatText.includes(',')) {
        const parts = koordinatText.split(',');
        lat = parts[0].trim();
        lng = parts[1].trim();
        mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    }

    // Pembuatan string gabungan untuk manifest kurir nota WhatsApp admin
    let alamatGabunganLengkap = `${nama} (${telepon}), ${detailAlamat}, Kec. ${kecamatan}, ${kota}, Prov. ${provinsi}, ${kodePos}`;
    if (mapsLink) {
        alamatGabunganLengkap += `\n📍 Link Koordinat Peta: ${mapsLink}`;
    }

    // SOLUSI GUEST: Jika user belum login, kita buatkan struktur objek guest sementara agar tidak crash
    let currentUser = JSON.parse(localStorage.getItem('hyva_logged_in_user'));
    if (!currentUser) {
        currentUser = { name: nama, phone: telepon, email: "guest@hyvaarvm.com", isGuest: true };
    }

    // Masukkan data terstruktur ke sesi halaman aktif
    currentUser.address = alamatGabunganLengkap;
    currentUser.structuredAddress = {
        nama: nama,
        telepon: telepon,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        kodePos: kodePos,
        detailAlamat: detailAlamat,
        lat: lat,
        lng: lng,
        mapsLink: mapsLink
    };
    localStorage.setItem('hyva_logged_in_user', JSON.stringify(currentUser));

    // Sinkronkan ke database utama akun hanya jika dia user terdaftar
    if (!currentUser.isGuest) {
        let allUsers = JSON.parse(localStorage.getItem('hyva_users_database')) || [];
        let userIndex = allUsers.findIndex(u => u.email === currentUser.email || u.phone === currentUser.phone);
        if (userIndex !== -1) {
            allUsers[userIndex].address = alamatGabunganLengkap;
            allUsers[userIndex].structuredAddress = currentUser.structuredAddress;
            localStorage.setItem('hyva_users_database', JSON.stringify(allUsers));
        }
    }

    // Tutup popup dengan mulus
    closeAddressModal();

    if (typeof showHyvaToast === "function") {
        showHyvaToast("Alamat pengiriman berhasil diperbarui! 📍✨", "fas fa-check-circle");
    }

    // Sinkronisasi pembaruan elemen pelacakan pesanan
    if (typeof renderOrderTracking === "function") {
        renderOrderTracking();
    } else {
        setTimeout(() => { location.reload(); }, 800);
    }
}

/* ==========================================================================
   6. SISTEM REVIEW DINAMIS DENGAN PAGINASI
   ========================================================================== */
let currentSelectedRating = 5;
let currentReviewPage = 1;
const reviewsPerPage = 3; 

const defaultReviews = [
    { name: "Siti Rahma", rating: 5, text: "Aroma Scandalous-nya bener-bener mewah banget! Manis raspberry-nya berkelas, awet seharian pas dipake kondangan. Repurchase sih ini pasti! ✨", date: "3 hari yang lalu" },
    { name: "Budi Santoso", rating: 5, text: "Gokil sih Dunhill Blue-nya segar abis, pas banget buat dipake ngantor atau abis olahraga. Bau keringat langsung ilang berganti wangi maskulin clean.", date: "1 minggu yang lalu" },
    { name: "Amanda Putri", rating: 5, text: "Paket bundling isi 3 ekonomis parah! Suka banget sama Romance Wish, floral-nya kalem dan gak bikin pusing. Pengiriman cepet dan aman bapelnya tebel.", date: "2 minggu yang lalu" },
    { name: "Dimas Pratama", rating: 5, text: "Baccarat Rouge 540-nya kembaran banget sama aslinya, wangi sultan semerbak. Tiap lewat depan temen kantor pasti ditanyain pake parfum apa.", date: "3 minggu yang lalu" },
    { name: "Citra Lestari", rating: 4, text: "Wild Vanilla-nya manis soft banget kayak kue berjalan, buat yang suka aroma sweet pasti langsung jatuh cinta. Next mau coba varian Black Opium.", date: "1 bulan yang lalu" }
];

function setRatingReview(rating) {
    currentSelectedRating = rating;
    const inputRatingValue = document.getElementById('selected-rating-value');
    if(inputRatingValue) inputRatingValue.value = rating;
    
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

function pemicuUlasanSetelahBeli() {
    localStorage.setItem('hasPurchasedHyva', 'true');
    localStorage.removeItem('hasReviewedHyva'); 
    checkReviewEligibility();
}

function checkReviewEligibility() {
    const hasPurchased = localStorage.getItem('hasPurchasedHyva');
    const hasReviewed = localStorage.getItem('hasReviewedHyva');
    const reviewBox = document.getElementById('user-review-box');

    if (hasPurchased === 'true' && hasReviewed !== 'true') {
        if (reviewBox) reviewBox.style.display = 'block';
    } else {
        if (reviewBox) reviewBox.style.display = 'none';
    }
}

function saveUserReview(event) {
    event.preventDefault();
    const textReviewElement = document.getElementById('user-review-text');
    const textReview = textReviewElement ? textReviewElement.value : "";
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userName = (loggedInUser && loggedInUser !== "") ? loggedInUser : "Pelanggan Hyva";
    
    const finalReviewText = textReview.trim() !== "" ? textReview : "Memberikan rating bintang tanpa meninggalkan pesan teks.";

    const reviewData = {
        name: userName,
        rating: currentSelectedRating,
        text: finalReviewText,
        date: "Baru saja"
    };

    let localReviews = JSON.parse(localStorage.getItem('hyvaLocalReviews')) || [];
    localReviews.unshift(reviewData); 
    localStorage.setItem('hyvaLocalReviews', JSON.stringify(localReviews));
    localStorage.setItem('hasReviewedHyva', 'true');
    
    closeReviewBox();
    currentReviewPage = 1; 
    renderLocalReviews();
}

function closeReviewBox() {
    const reviewBox = document.getElementById('user-review-box');
    if (reviewBox) reviewBox.style.display = 'none';
    localStorage.setItem('hasReviewedHyva', 'true'); 
}

function renderLocalReviews() {
    const displayGrid = document.getElementById('dynamic-testimonials-grid');
    if (!displayGrid) return;
    
    let localReviews = JSON.parse(localStorage.getItem('hyvaLocalReviews')) || [];
    let allReviews = [...localReviews, ...defaultReviews];

    const totalReviews = allReviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const startIndex = (currentReviewPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const paginatedReviews = allReviews.slice(startIndex, endIndex);

    displayGrid.className = "testimonials-grid-v2"; 
    displayGrid.innerHTML = ''; 

    paginatedReviews.forEach(item => {
        let starHTML = '';
        for (let i = 0; i < 5; i++) {
            starHTML += i < item.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }

        displayGrid.innerHTML += `
            <div class="testi-card-v2">
                <div class="testi-stars-v2">${starHTML}</div>
                <p class="testi-text-v2">"${item.text}"</p>
                <div class="testi-user-v2">
                    <strong>${item.name}</strong>
                    <span>Verified Buyer - ${item.date}</span>
                </div>
            </div>
        `;
    });

    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    let paginationContainer = document.getElementById('review-pagination-container');
    
    if (!paginationContainer) {
        const displayGrid = document.getElementById('dynamic-testimonials-grid');
        if (!displayGrid) return;
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'review-pagination-container';
        displayGrid.parentNode.insertBefore(paginationContainer, displayGrid.nextSibling);
    }

    if (totalPages <= 1) {
        paginationContainer.innerHTML = ''; 
        return;
    }

    let htmlControls = `
        <div class="review-pagination">
            <button class="pag-arrow" ${currentReviewPage === 1 ? 'disabled' : ''} onclick="changeReviewPage(${currentReviewPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="pag-numbers">
    `;

    for (let i = 1; i <= totalPages; i++) {
        htmlControls += `
            <button class="pag-btn ${i === currentReviewPage ? 'active' : ''}" onclick="changeReviewPage(${i})">
                ${i}
            </button>
        `;
    }

    htmlControls += `
            </div>
            <button class="pag-arrow" ${currentReviewPage === totalPages ? 'disabled' : ''} onclick="changeReviewPage(${currentReviewPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;

    paginationContainer.innerHTML = htmlControls;
}

function changeReviewPage(pageNumber) {
    currentReviewPage = pageNumber;
    renderLocalReviews();
    
    const testimonialSection = document.querySelector('.testimonials-section');
    if(testimonialSection) {
        testimonialSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================================================
   7. SISTEM AUTENTIKASI DENGAN DATABASE SINKRONISASI ADMIN (VERSI KETAT)
   ========================================================================== */
function showAuthTab(type) {
    const loginForm = document.getElementById('form-login');
    const daftarForm = document.getElementById('form-daftar');
    const tabL = document.getElementById('tab-login');
    const tabD = document.getElementById('tab-daftar');
    const footer = document.getElementById('auth-footer');

    if (type === 'login') {
        if(loginForm) loginForm.style.display = 'block';
        if(daftarForm) daftarForm.style.display = 'none';
        if(tabL) tabL.classList.add('active');
        if(tabD) tabD.classList.remove('active');
        if(footer) footer.innerHTML = 'Baru di Hyva Arvm? <a href="javascript:void(0)" onclick="showAuthTab(\'daftar\')">Daftar</a>';
    } else {
        if(loginForm) loginForm.style.display = 'none';
        if(daftarForm) daftarForm.style.display = 'block';
        if(tabD) tabD.classList.add('active');
        if(tabL) tabL.classList.remove('active');
        if(footer) footer.innerHTML = 'Sudah punya akun? <a href="javascript:void(0)" onclick="showAuthTab(\'login\')">Login</a>';
    }
}

function openAuthModal(type = 'login') {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'flex';
    showAuthTab(type);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';
}

function handleCredentialResponse(response) {
    try {
        let base64Url = response.credential.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(jsonPayload);
        const userEmail = payload.email;
        const userName = payload.given_name || payload.name;
        
        // PUSH DATA KE DATABASE ADMIN
        let users = JSON.parse(localStorage.getItem('hyva_users_database')) || [];
        if (users.findIndex(u => u.email === userEmail) === -1) {
            users.push({
                id: "USR-" + Math.floor(1000 + Math.random() * 9000),
                name: payload.name,
                email: userEmail,
                joinedDate: new Date().toLocaleDateString('id-ID')
            });
            localStorage.setItem('hyva_users_database', JSON.stringify(users));
        }
        
        localStorage.setItem('loggedInUser', userName);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userPhoto', payload.picture);

        showHyvaToast(`Halo ${payload.name}! Kamu berhasil login via Google.`, "fas fa-user-check");
        
        updateNavbarUser(); 
        if(typeof renderUserOrderStatus === 'function') renderUserOrderStatus();
        closeAuthModal();   
    } catch (e) {
        console.error("Gagal memproses otentikasi Google:", e);
    }
}

// ==========================================
// BAGIAN UTAMA YANG DIPERBAIKI SECARA KETAT
// ==========================================
function handleUserAuth(event, type) {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('hyva_users_database')) || [];

    if (type === 'daftar') {
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        const passInput = document.getElementById('reg-password'); // Mengambil input password pendaftaran jika ada
        
        const userName = nameInput ? nameInput.value.trim() : "";
        const userEmail = emailInput ? emailInput.value.trim() : "";
        const userPass = passInput ? passInput.value.trim() : "123456"; // Default password jika field tidak ditemukan

        if (userName === "" || userEmail === "") {
            showHyvaToast("Gagal: Nama dan Email wajib diisi! ⚠️", "fas fa-exclamation-triangle");
            return;
        }

        // Cek apakah email atau username sudah pernah terdaftar
        const emailExist = users.some(u => u.email.toLowerCase() === userEmail.toLowerCase() || u.name.toLowerCase() === userName.toLowerCase());
        if (emailExist) {
            showHyvaToast("Gagal: Username atau Email sudah terdaftar. Silakan login! ⛔", "fas fa-user-times");
            showAuthTab('login');
            return;
        }

        // Simpan akun baru ke database
        users.push({
            id: "USR-" + Math.floor(1000 + Math.random() * 9000),
            name: userName,
            email: userEmail,
            password: userPass, // Menyimpan password untuk divalidasi saat login nanti
            joinedDate: new Date().toLocaleDateString('id-ID')
        });
        localStorage.setItem('hyva_users_database', JSON.stringify(users));
        
        showHyvaToast(`Pendaftaran Berhasil! Halo ${userName}, silakan login. ✨`, "fas fa-user-plus");
        showAuthTab('login'); // Alihkan langsung ke tab login setelah sukses daftar

    } else {
        // --- PROSES LOGIN KETAT ---
        const loginInput = document.getElementById('login-identity');
        const loginPassInput = document.getElementById('login-password'); // Pastikan ID ini sesuai dengan field password login di HTML Anda
        
        const identityValue = loginInput ? loginInput.value.trim() : "";
        const passwordValue = loginPassInput ? loginPassInput.value.trim() : "";

        if (identityValue === "") {
            showHyvaToast("Gagal: Username atau Email tidak boleh kosong! ⚠️", "fas fa-exclamation-triangle");
            return;
        }

        // Cari akun di database berdasarkan Nama atau Email
        const accountFound = users.find(u => 
            u.name.toLowerCase() === identityValue.toLowerCase() || 
            u.email.toLowerCase() === identityValue.toLowerCase()
        );

        // VALIDASI 1: Jika user acak / tidak terdaftar
        if (!accountFound) {
            showHyvaToast("Gagal: Akun tidak ditemukan. Silakan daftar terlebih dahulu! ⛔", "fas fa-user-times");
            return;
        }

        // VALIDASI 2: Cek password jika database memiliki record password (opsional)
        if (accountFound.password && passwordValue !== "" && accountFound.password !== passwordValue) {
            showHyvaToast("Gagal: Kata sandi salah. Silakan coba lagi! 🔑", "fas fa-key");
            return;
        }

        // Jika lolos semua validasi, nyatakan login sukses
        localStorage.setItem('loggedInUser', accountFound.name);
        localStorage.setItem('isLoggedIn', 'true');
        
        showHyvaToast(`Selamat Datang Kembali, ${accountFound.name}! ✨`, "fas fa-sign-in-alt");
        
        updateNavbarUser();
        if(typeof renderUserOrderStatus === 'function') renderUserOrderStatus();
        closeAuthModal();
    }
}

function updateNavbarUser() {
    const guestButtons = document.getElementById('auth-guest-buttons');
    const userInfo = document.getElementById('auth-user-info');
    const userText = document.getElementById('user-auth-text');
    const savedName = localStorage.getItem('loggedInUser');

    if (savedName && savedName !== "") {
        if(guestButtons) guestButtons.style.display = 'none';
        if(userInfo) userInfo.style.display = 'flex';
        if(userText) userText.innerText = savedName;
    } else {
        if(guestButtons) guestButtons.style.display = 'flex';
        if(userInfo) userInfo.style.display = 'none';
    }
}

function confirmLogout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('hyva_cart'); 
    window.location.reload();
}

function handleProfileClick() {
    const savedName = localStorage.getItem('loggedInUser');
    if (savedName && savedName !== "") {
        openLogoutModal();
    } else {
        openAuthModal();
    }
}

function openLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) modal.style.display = 'flex';
}

function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) modal.style.display = 'none';
}

/* ==========================================================================
   8. INTERFACE PANEL ADMIN CONTROL (GRAFIK & MANAJEMEN TRANSAKSI)
   ========================================================================== */
let productsChartInstance = null;

if (document.getElementById('order-table-body')) {
    document.addEventListener('DOMContentLoaded', () => {
        loadOrdersDataAndDrawCharts();
        loadRegisteredUsersData();
    });
}

function loadOrdersDataAndDrawCharts() {
    let orders = localStorage.getItem('hyva_global_orders');
    if (!orders) {
        const sampleData = [
            { orderId: "HA-4820", username: "Rizky Tri", date: "24/05/2026", receiverName: "Rizky Triyana", receiverPhone: "0857123456", shippingAddress: "Mojokerto", items: "Inspired by Romance Wish (2x)", totalPrice: 96000, status: "Sedang Dikemas" },
            { orderId: "HA-9102", username: "Amalia Putri", date: "25/05/2026", receiverName: "Amalia Putri", receiverPhone: "0812999922", shippingAddress: "Surabaya", items: "Inspired by Romance Wish (1x), Inspired by Black Opium (1x)", totalPrice: 96000, status: "Dikirim" }
        ];
        localStorage.setItem('hyva_global_orders', JSON.stringify(sampleData));
        orders = JSON.stringify(sampleData);
    }
    
    const parsedOrders = JSON.parse(orders);
    const tbody = document.getElementById('order-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let totalRevenue = 0;
    let productCounts = {};

    parsedOrders.forEach((order) => {
        totalRevenue += (order.totalPrice || 0);

        if (order.items) {
            let itemArray = order.items.split(',');
            itemArray.forEach(itemName => {
                let qty = 1;
                let matchQty = itemName.match(/\((\d+)x\)/);
                if (matchQty) qty = parseInt(matchQty[1]);
                
                let cleanName = itemName.replace(/\(\d+x\)/g, '').trim();
                if (cleanName) productCounts[cleanName] = (productCounts[cleanName] || 0) + qty;
            });
        }

        let badgeClass = "status-packing";
        if (order.status === "Dikirim") badgeClass = "status-transit";
        if (order.status === "Selesai") badgeClass = "status-delivered";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${order.orderId}</strong></td>
            <td style="color:#666; font-size:12px;">${order.date || '-'}</td>
            <td><span style="font-weight:600;">${order.username}</span></td>
            <td>
                <div class="form-grid-shipping">
                    <strong>Penerima:</strong> ${order.receiverName || order.username}<br>
                    <strong>WA:</strong> ${order.receiverPhone || '-'}<br>
                    <strong>Alamat:</strong> ${order.shippingAddress || '-'}
                </div>
            </td>
            <td style="font-weight:500; color:#333;">${order.items}</td>
            <td style="font-weight:bold; color:#a68b5c;">Rp ${order.totalPrice.toLocaleString()}</td>
            <td><span class="status-badge ${badgeClass}">${order.status}</span></td>
            <td>
                <select class="select-status" onchange="updateStatusPengiriman('${order.orderId}', this.value)">
                    <option value="Sedang Dikemas" ${order.status === 'Sedang Dikemas' ? 'selected' : ''}>Sedang Dikemas</option>
                    <option value="Dikirim" ${order.status === 'Dikirim' ? 'selected' : ''}>Dikirim</option>
                    <option value="Selesai" ${order.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                </select>
            </td>
            <td><button class="btn-action btn-delete" onclick="deleteOrder('${order.orderId}')"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });

    if (document.getElementById('total-revenue-label')) {
        document.getElementById('total-revenue-label').innerText = "Rp " + totalRevenue.toLocaleString('id-ID');
        document.getElementById('total-orders-label').innerText = parsedOrders.length + " Pesanan";
    }

    renderProductsChart(productCounts);
}

function renderProductsChart(productCounts) {
    const canvas = document.getElementById('productsChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (productsChartInstance) productsChartInstance.destroy();

    productsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(productCounts),
            datasets: [{
                label: 'Jumlah Botol Terjual',
                data: Object.values(productCounts),
                backgroundColor: 'rgba(166, 139, 92, 0.7)',
                borderColor: 'rgba(166, 139, 92, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function updateStatusPengiriman(orderId, statusBaru) {
    let globalOrders = JSON.parse(localStorage.getItem('hyva_global_orders')) || [];
    let index = globalOrders.findIndex(o => String(o.orderId) === String(orderId));
    if (index !== -1) {
        globalOrders[index].status = statusBaru;
        localStorage.setItem('hyva_global_orders', JSON.stringify(globalOrders));
        loadOrdersDataAndDrawCharts();
    }
}

function deleteOrder(orderId) {
    if (confirm("Hapus permanen invoice pesanan ini dari database admin?")) {
        let globalOrders = JSON.parse(localStorage.getItem('hyva_global_orders')) || [];
        globalOrders = globalOrders.filter(o => String(o.orderId) !== String(orderId));
        localStorage.setItem('hyva_global_orders', JSON.stringify(globalOrders));
        loadOrdersDataAndDrawCharts();
    }
}

function loadRegisteredUsersData() {
    const users = JSON.parse(localStorage.getItem('hyva_users_database')) || [];
    const tbody = document.getElementById('user-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#999; padding:20px;">Belum ada konsumen baru terdaftar.</td></tr>`;
        return;
    }
    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td><small style="color:#666;">${user.id}</small></td>
                <td><strong>${user.name}</strong></td>
                <td><i class="far fa-envelope"></i> ${user.email}</td>
                <td><button class="btn-action btn-delete" onclick="deleteUser('${user.id}')">Hapus</button></td>
            </tr>`;
    });
}

function deleteUser(id) {
    if (confirm("Hapus akun pelanggan ini dari database lokal admin?")) {
        let users = JSON.parse(localStorage.getItem('hyva_users_database')) || [];
        users = users.filter(u => u.id !== id);
        localStorage.setItem('hyva_users_database', JSON.stringify(users));
        loadRegisteredUsersData();
    }
}

/* ==========================================================================
   9. ABOUT SLIDER MOTORIC & SCROLL EVENT
   ========================================================================== */
function initAboutSlider() {
    const slides = document.querySelectorAll(".about-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 3000; 

    function changeSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides[currentSlide].classList.remove("active");
        if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

        currentSlide = index;
        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    let autoSlide = setInterval(() => { changeSlide(currentSlide + 1); }, slideInterval);

    dots.forEach((dot, index) => {
        dot.onclick = function() {
            clearInterval(autoSlide);
            changeSlide(index);
            autoSlide = setInterval(() => { changeSlide(currentSlide + 1); }, slideInterval);
        };
    });
}

/* ==========================================================================
   10. INISIALISASI UTAMA & SINKRON WINDOWS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    checkReviewEligibility();
    renderLocalReviews(); 
    setRatingReview(5); 
    initAboutSlider(); 
    renderUserOrderStatus();
});

window.onload = function() {
    const savedData = localStorage.getItem('hyva_cart');
    if (savedData) {
        cart = JSON.parse(savedData);
        updateCartUI();
    }
    updateNavbarUser(); 
    
    // Inisialisasi Tombol Google Login jika terdeteksi di index
    if (typeof google !== 'undefined' && document.getElementById("google-login-btn")) {
        google.accounts.id.initialize({
            client_id: "704838321040-uq9pbt7c585qesve7eouvsf97f74p5un.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("google-login-btn"),
            { theme: "outline", size: "medium", text: "signin_with" }
        );
    }
};

window.addEventListener('click', function(event) {
    const detailModal = document.getElementById('product-detail-modal');
    const qrisModal = document.getElementById('qris-modal');
    const logoutModal = document.getElementById('logout-modal');
    const authModal = document.getElementById('auth-modal');

    if (event.target == detailModal) closeDetail();
    if (event.target == qrisModal) closePayModal();
    if (event.target == logoutModal) closeLogoutModal();
    if (event.target == authModal) closeAuthModal();
});

window.addEventListener('scroll', function() {
    const aboutSection = document.querySelector('.about-product-section');
    if (!aboutSection) return; 
    const position = aboutSection.getBoundingClientRect().top;
    if (position < window.innerHeight - 150) {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
    }
});

/* ==========================================================================
   11. AI SCENT ATELIER (API CONNECTOR)
   ========================================================================== */
const GEMINI_API_KEY = "AIzaSyAbxUi0qDxN2heRC9lgG6EMvbzs3sNGXjE"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = ` Kamu adalah "Hyva Scent Expert", pakar parfum mewah dari brand Hyva Arvm. Tugasmu menganalisis suasana hati pembeli dan merekomendasikan varian dari katalog kami secara puitis dan berkelas menggunakan kata 'Kakak' ✨.`;

async function sendAIChat() {
    const input = document.getElementById('ai-user-input');
    const display = document.getElementById('ai-response-display');
    const btn = document.getElementById('ai-send-btn');
    
    if (!input || !display || !btn || input.value.trim() === "") return;
    const message = input.value.trim();

    display.classList.remove('response-placeholder');
    display.innerHTML = `<div style="color: #d4af37;"><i class="fas fa-spinner fa-spin"></i> Meracik formula aroma...</div>`;
    btn.disabled = true;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\nKatalog:" + JSON.stringify(products.map(p=>p.name)) + "\n\nCerita: " + message }] }] })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let botReply = data.candidates[0].content.parts[0].text;
            botReply = botReply.replace(/\*\*(.*?)\*\"/g, '<strong style="color:#d4af37;">$1</strong>').replace(/\n/g, "<br>");
            display.innerHTML = botReply;
        }
    } catch (error) {
        display.innerHTML = "<span>Maaf Kak, mengalami kendala teknis. Coba lagi ya ✨</span>";
    } finally {
        btn.disabled = false;
    }
}

function handleAIKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAIChat();
    }
}

/* ==========================================================================
   ENGINE UTAMA PREMIUM POP-UP NOTIFICATION (TOAST MECHANISM MODERN)
   ========================================================================== */
function showHyvaToast(message, iconClass = "fas fa-info-circle") {
    let container = document.querySelector('.hyva-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'hyva-toast-container';
        document.body.appendChild(container);
    }

    // Mengubah format pesan agar nama produk otomatis ter-highlight cetak tebal lembut
    let formattedMessage = message.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');

    const toast = document.createElement('div');
    toast.className = 'hyva-toast';
    toast.innerHTML = `
        <div class="hyva-toast-icon-wrapper">
            <i class="${iconClass}"></i>
        </div>
        <div class="hyva-toast-text">${formattedMessage}</div>
    `;
    
    container.appendChild(toast);

    // Animasi Muncul
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Animasi Menghilang Otomatis dalam 4 detik
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 450);
    }, 4000);
}
