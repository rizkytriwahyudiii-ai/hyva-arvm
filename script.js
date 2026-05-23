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
   4. SISTEM KERANJANG (CART LOGIC) - VERSI WAJIB LOGIN & FORM ALAMAT
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

            let currentUsername = localStorage.getItem('loggedInUser') || '';
            let formShippingHtml = `
                <div class="form-shipping-address" style="margin-top: 20px; border-top: 2px dashed #8b734b; padding-top: 15px;">
                    <h4 style="font-size:13px; margin-bottom:10px; text-transform:uppercase; color:#262525;"><i class="fas fa-map-marker-alt"></i> Alamat Lengkap Pengiriman</h4>
                    <div style="margin-bottom:8px;">
                        <input type="text" id="ship-name" placeholder="Nama Penerima" style="width:100%; padding:8px; font-size:12px; border:1px solid #ccc; border-radius:4px;" value="${currentUsername}">
                    </div>
                    <div style="margin-bottom:8px;">
                        <input type="text" id="ship-phone" placeholder="Nomor WhatsApp Aktif" style="width:100%; padding:8px; font-size:12px; border:1px solid #ccc; border-radius:4px;">
                    </div>
                    <div style="margin-bottom:8px;">
                        <textarea id="ship-address" placeholder="Tulis jalan, nomor rumah, RT/RW, kecamatan, kabupaten, dan kode pos..." style="width:100%; padding:8px; font-size:12px; border:1px solid #ccc; border-radius:4px; height:60px; resize:none; font-family:'Montserrat',sans-serif;"></textarea>
                    </div>
                </div>
            `;
            
            container.innerHTML = itemsHtml + formShippingHtml;
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
   5. PEMBAYARAN & CHECKOUT WITH STATUS TRACKING (INTEGRATED WITH ADMIN)
   ========================================================================== */
function checkoutWA() {
    if (cart.length === 0) return alert("Keranjang kosong!");
    
    const name = document.getElementById('ship-name')?.value.trim();
    const phone = document.getElementById('ship-phone')?.value.trim();
    const address = document.getElementById('ship-address')?.value.trim();
    if (!name || !phone || !address) {
        return alert("Gagal: Silakan isi data Nama, No. WA, dan Alamat lengkap pengiriman di dalam keranjang!");
    }

    let msg = `Halo Hyva Arvm, saya mau pesan:%0A`;
    cart.forEach(i => msg += `- ${i.name}%0A`);
    let total = cart.reduce((s, i) => s + i.price, 0);
    msg += `%0ATotal: Rp ${total.toLocaleString()}%0A%0A`;
    msg += `*Detail Pengiriman:*%0ANama: ${name}%0AAlamat: ${address}%0ANo HP: ${phone}`;
    
    simpanTransaksiKeRiwayat(name, phone, address, total);

    window.open(`https://wa.me/628123456789?text=${msg}`, '_blank');
}

function checkoutShopee() {
    if (cart.length === 0) {
        alert("Keranjangmu masih kosong, silakan pilih parfum favoritmu dulu!");
        return;
    }
    if (cart.length === 1 && cart[0].shopeeLink) {
        window.open(cart[0].shopeeLink, "_blank");
    } else {
        window.open("https://shopee.co.id/hyva.arvm", "_blank");
        alert("Kamu memilih beberapa parfum. Silakan cari produknya di toko Shopee kami ya!");
    }
}

function checkoutOtomatis() {
    if (cart.length === 0) {
        alert("Keranjang belanjaanmu masih kosong!");
        return;
    }
    
    const name = document.getElementById('ship-name')?.value.trim();
    const phone = document.getElementById('ship-phone')?.value.trim();
    const address = document.getElementById('ship-address')?.value.trim();
    if (!name || !phone || !address) {
        alert("Gagal: Mohon lengkapi formulir Alamat Pengiriman terlebih dahulu!");
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalLabel = document.getElementById('qris-total');
    if (totalLabel) {
        totalLabel.innerText = "Rp " + total.toLocaleString();
    }
    
    sessionStorage.setItem('temp_shipping', JSON.stringify({ name, phone, address }));
    
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

    window.open(`https://wa.me/628123456789?text=${pesan}`, "_blank");

    pemicuUlasanSetelahBeli();

    cart = [];
    localStorage.removeItem('hyva_cart');
    sessionStorage.removeItem('temp_shipping');
    updateCartUI();
    closePayModal();
    
    alert("Pembayaran berhasil dicatat! Status paket Anda sekarang diatur menjadi 'Sedang Dikemas'. Silakan cek status pengiriman barang di dashboard akun Anda.");
    window.location.href = 'index.html'; 
}

function hubungiAdmin() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const pesan = encodeURIComponent(`Halo Admin Hyva Arvm, saya sudah melakukan pembayaran QRIS sebesar Rp ${total.toLocaleString()}. Berikut bukti bayarnya.`);
    window.open(`https://wa.me/628123456789?text=${pesan}`, "_blank");
}

// FORMAT SINKRONISASI COBA BACA JUMLAH PRODUK KE GRAFIK (Nama Produk (1x))
function simpanTransaksiKeRiwayat(nama, wa, alamat, totalHarga) {
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Guest';
    const orderId = "HA-" + Math.floor(100000 + Math.random() * 900000); 
    
    // Kelompokkan produk yang sama untuk menghitung kuantitas (Qty)
    let kumpulkanItem = {};
    cart.forEach(item => {
        kumpulkanItem[item.name] = (kumpulkanItem[item.name] || 0) + 1;
    });
    
    // Konstruksi string: "Inspired by Romance Wish (2x), Inspired by Aqua Kiss (1x)"
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
   7. SISTEM AUTENTIKASI DENGAN DATABASE SINKRONISASI ADMIN
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
        renderUserOrderStatus();
        closeAuthModal();   
    } catch (e) {
        console.error("Gagal memproses otentikasi Google:", e);
    }
}

function handleUserAuth(event, type) {
    event.preventDefault();
    let userName = "";
    let userEmail = "manual-auth@hyva.com";
    
    if (type === 'daftar') {
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        userName = nameInput && nameInput.value.trim() !== "" ? nameInput.value.trim() : "Pelanggan Hyva";
        if(emailInput && emailInput.value.trim() !== "") userEmail = emailInput.value.trim();
        
        showHyvaToast(`Pendaftaran Berhasil! Halo ${userName}`, "fas fa-user-plus");
    } else {
        const loginInput = document.getElementById('login-identity');
        if (loginInput && loginInput.value.trim() !== "") {
            const rawValue = loginInput.value.trim();
            userName = rawValue.includes('@') ? rawValue.split('@')[0] : rawValue;
            if(rawValue.includes('@')) userEmail = rawValue;
        } else {
            userName = "Pelanggan Hyva";
        }
        showHyvaToast("Login Berhasil!", "fas fa-sign-in-alt");
    }

    // Suntik data pendaftaran manual ke panel admin
    let users = JSON.parse(localStorage.getItem('hyva_users_database')) || [];
    if (users.findIndex(u => u.name === userName) === -1) {
        users.push({
            id: "USR-" + Math.floor(1000 + Math.random() * 9000),
            name: userName,
            email: userEmail,
            joinedDate: new Date().toLocaleDateString('id-ID')
        });
        localStorage.setItem('hyva_users_database', JSON.stringify(users));
    }

    localStorage.setItem('loggedInUser', userName);
    updateNavbarUser();
    renderUserOrderStatus();
    closeAuthModal();
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
