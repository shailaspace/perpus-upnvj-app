/* --- STATE APLIKASI --- */
let selectedSeats = [];
let selectedDuration = 1;

// Data awal riwayat (seperti di desain PDF/Gambar)
let riwayatKlaim = [
    { id: 'KLM-191028-031', kursi: 'C05', tanggal: '19 Okt 2026', waktu: '13.00–15.00 WIB', durasi: '2 jam', status: 'Selesai' },
    { id: 'KLM-161026-018', kursi: 'A08', tanggal: '16 Okt 2026', waktu: '09.00–10.00 WIB', durasi: '1 jam', status: 'Selesai' },
    { id: 'KLM-151026-024', kursi: 'D02', tanggal: '15 Okt 2026', waktu: '10.00–13.00 WIB', durasi: '3 jam', status: 'Selesai' },
    { id: 'KLM-131026-027', kursi: 'F06', tanggal: '13 Okt 2026', waktu: '14.00–16.00 WIB', durasi: '2 jam', status: 'Selesai' },
    { id: 'KLM-121026-009', kursi: 'B07', tanggal: '12 Okt 2026', waktu: '08.00–09.00 WIB', durasi: '1 jam', status: 'Selesai' }
];

/* --- FUNGSI NOTIFIKASI UMUM (BUKTI TOMBOL AKTIF) --- */
function tampilkanNotif(pesan, tipe = 'normal') {
    const toast = document.getElementById('toast');
    toast.innerText = pesan;
    toast.className = 'toast show';
    if (tipe === 'error') toast.classList.add('error');
    
    setTimeout(() => {
        toast.classList.remove('show');
        toast.className = 'toast';
    }, 3000);
}

/* --- LOGIKA LOGIN & LOGOUT --- */
function handleLogin(e) {
    e.preventDefault();
    const nim = document.getElementById('nim').value;
    const password = document.getElementById('password').value;

    if (nim === '2310511042' && password !== '') {
        tampilkanNotif('Login berhasil! Mengalihkan ke Home...');
        setTimeout(() => {
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('app-view').style.display = 'flex';
            
            // Inisialisasi Data
            renderSeats();
            renderHistory('Semua');
        }, 1000);
    } else {
        tampilkanNotif('NIM/email atau password salah.', 'error');
    }
}

function logout() {
    tampilkanNotif('Berhasil Logout. Mengalihkan...');
    setTimeout(() => {
        document.getElementById('app-view').style.display = 'none';
        document.getElementById('login-view').style.display = 'flex';
        document.getElementById('password').value = '';
        
        // Reset seluruh data sementara
        selectedSeats = [];
        selectedDuration = 1;
        switchTab('dashboard', document.getElementById('nav-home'));
    }, 800);
}

/* --- NAVIGASI TAB UTAMA --- */
function switchTab(tabId, elementId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById('tab-' + tabId).style.display = 'block';
    
    // Update highlight di menu kiri
    document.querySelectorAll('.menu-nav a').forEach(a => a.classList.remove('active'));
    
    // Beri penanda menu mana yang sedang aktif
    if (typeof elementId === 'string') {
        document.getElementById(elementId).classList.add('active');
    } else if (elementId) {
        elementId.classList.add('active');
    }

    // Jika tab adalah riwayat, render ulang agar selalu fresh
    if (tabId === 'riwayat') {
        renderHistory('Semua');
        // Reset tab aktif riwayat kembali ke 'Semua'
        const tabBtns = document.querySelectorAll('.table-controls .tab-btn');
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabBtns[0].classList.add('active');
    }
}

/* --- KLAIM STEP 1: RENDER GRID & PILIH KURSI --- */
function renderSeats() {
    const grid = document.getElementById('seatGrid');
    grid.innerHTML = ''; 
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    rows.forEach(row => {
        for (let i = 1; i <= 8; i++) {
            const seatId = `${row}0${i}`;
            // Simulasi kursi yang sudah terisi (sesuai layout pdf)
            const isOccupied = ['A05', 'A06', 'B05', 'C02', 'E08', 'F03'].includes(seatId);
            
            const btn = document.createElement('button');
            btn.innerText = seatId;
            btn.classList.add('seat', isOccupied ? 'occupied' : 'available');
            btn.id = `seat-${seatId}`;
            
            if (!isOccupied) {
                btn.onclick = () => toggleSeat(seatId, btn);
            } else {
                btn.onclick = () => tampilkanNotif(`Kursi ${seatId} sedang digunakan pengunjung lain.`, 'error');
            }
            grid.appendChild(btn);
        }
    });
}

function toggleSeat(seatId, btnElement) {
    const index = selectedSeats.indexOf(seatId);
    if (index > -1) {
        selectedSeats.splice(index, 1);
        btnElement.classList.remove('selected');
        btnElement.classList.add('available');
    } else {
        if (selectedSeats.length < 2) {
            selectedSeats.push(seatId);
            btnElement.classList.remove('available');
            btnElement.classList.add('selected');
        } else {
            tampilkanNotif('Maksimal 2 kursi untuk satu kali pemesanan.', 'error');
        }
    }
    updateActionBar();
}

function updateActionBar() {
    const btnLanjut = document.getElementById('btn-lanjut');
    const btnClear = document.getElementById('btn-clear');
    const countText = document.getElementById('selected-count');
    const seatsText = document.getElementById('selected-seats');

    if (selectedSeats.length > 0) {
        countText.innerText = `${selectedSeats.length} kursi dipilih`;
        seatsText.innerText = `Lantai 1: ${selectedSeats.sort().join(', ')}`;
        btnLanjut.disabled = false;
        btnClear.style.display = 'block';
    } else {
        countText.innerText = `0 kursi dipilih`;
        seatsText.innerText = `Lantai 1: -`;
        btnLanjut.disabled = true;
        btnClear.style.display = 'none';
    }
}

function clearSelection() {
    selectedSeats.forEach(id => {
        const btn = document.getElementById(`seat-${id}`);
        if(btn) {
            btn.classList.remove('selected');
            btn.classList.add('available');
        }
    });
    selectedSeats = [];
    updateActionBar();
}

/* --- KLAIM STEP 2: KONFIRMASI & DURASI --- */
function lanjutKonfirmasi() {
    document.getElementById('conf-seats').innerText = selectedSeats.sort().join(', ');
    switchTab('klaim-step2', 'nav-denah');
}

function pilihDurasi(jam, btnElement) {
    selectedDuration = jam;
    document.querySelectorAll('.btn-durasi').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

function prosesKlaim() {
    const kursiStr = selectedSeats.sort().join(', ');
    const waktuMulai = 10; // Jam statis untuk simulasi
    const waktuSelesai = waktuMulai + selectedDuration;
    
    // Tampilkan di Modal
    document.getElementById('modal-seats').innerText = kursiStr;
    document.getElementById('modal-time').innerText = `${waktuMulai}.00 - ${waktuSelesai}.00 WIB`;
    document.getElementById('success-modal').style.display = 'flex';

    // Buat data riwayat baru
    const dataBaru = {
        id: `KLM-201026-${Math.floor(Math.random() * 100) + 10}`,
        kursi: kursiStr,
        tanggal: '20 Okt 2026',
        waktu: `${waktuMulai}.00–${waktuSelesai}.00 WIB`,
        durasi: `${selectedDuration} jam`,
        status: 'Aktif'
    };
    
    // Masukkan ke urutan paling atas
    riwayatKlaim.unshift(dataBaru);
}

/* --- MODAL SUKSES KE RIWAYAT --- */
function tutupModalSukses() {
    document.getElementById('success-modal').style.display = 'none';
    
    // Matikan kursi yang sudah diklaim agar jadi occupied
    selectedSeats.forEach(id => {
        const btn = document.getElementById(`seat-${id}`);
        if(btn) {
            btn.classList.remove('selected');
            btn.classList.add('occupied');
            btn.onclick = () => tampilkanNotif(`Kursi ${id} sedang Anda gunakan!`, 'error');
        }
    });
    
    // Bersihkan sesi
    selectedSeats = [];
    selectedDuration = 1;
    updateActionBar();
    
    // Lempar ke Halaman Riwayat
    switchTab('riwayat', 'nav-riwayat');
}

/* --- TABEL RIWAYAT --- */
function gantiTabRiwayat(filterStat, btnElement) {
    document.querySelectorAll('.table-controls .tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    renderHistory(filterStat);
}

function renderHistory(filterStatus = 'Semua') {
    const tbody = document.getElementById('history-tbody');
    tbody.innerHTML = '';
    
    // Hitung jumlah data untuk badge di tombol
    let countSemua = riwayatKlaim.length;
    let countAktif = riwayatKlaim.filter(k => k.status === 'Aktif').length;
    let countSelesai = riwayatKlaim.filter(k => k.status === 'Selesai').length;
    
    document.getElementById('count-semua').innerText = `(${countSemua})`;
    document.getElementById('count-aktif').innerText = `(${countAktif})`;
    document.getElementById('count-selesai').innerText = `(${countSelesai})`;

    // Tampilkan Banner Aktif di atas jika ada kursi yang aktif
    const banner = document.getElementById('active-banner');
    if (countAktif > 0) {
        const aktifData = riwayatKlaim.find(k => k.status === 'Aktif');
        document.getElementById('banner-title').innerText = `Kursimu aktif sampai ${aktifData.waktu.split('–')[1]}`;
        document.getElementById('banner-desc').innerText = `${aktifData.kursi} • Lantai 1 • ${aktifData.tanggal}`;
        document.getElementById('banner-right').innerText = `• ${aktifData.kursi.split(',').length} kursi • ${aktifData.durasi}`;
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }

    // Filter Data Tabel
    let dataRender = riwayatKlaim;
    if (filterStatus !== 'Semua') {
        dataRender = riwayatKlaim.filter(item => item.status === filterStatus);
    }
    
    document.getElementById('pagination-info').innerText = `Menampilkan 1–${dataRender.length} dari ${dataRender.length} klaim`;

    if (dataRender.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#9ca3af; padding:32px;">Tidak ada riwayat ${filterStatus} ditemukan.</td></tr>`;
        return;
    }

    dataRender.forEach(item => {
        const isAktif = item.status === 'Aktif';
        const colorClass = isAktif ? 'aktif' : 'selesai';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="td-kursi"><h4>${item.kursi}</h4><p>${item.id}</p></td>
            <td class="td-text">Lantai 1</td>
            <td class="td-text">${item.tanggal}</td>
            <td class="td-text">${item.waktu}</td>
            <td class="td-text">${item.durasi}</td>
            <td><span class="badge-status ${colorClass}">${item.status}</span></td>
            <td><span class="btn-detail" onclick="tampilkanNotif('Menampilkan lembar detail untuk ${item.id}')">Detail &gt;</span></td>
        `;
        tbody.appendChild(tr);
    });
}