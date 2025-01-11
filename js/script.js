// Fungsi untuk membuat bintang acak
function createStars(numStars, starClass) {
    const body = document.querySelector('body');

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add(starClass);

        // Set posisi acak untuk bintang
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Set ukuran acak untuk bintang
        const size = Math.random() * 2 + 0.2; // Ukuran bintang antara 0.2px hingga 2.2px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Posisi bintang
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        // Menambahkan bintang ke body
        body.appendChild(star);
    }
}

// Membuat bintang dengan kelas 'star-1'
createStars(100, 'star-1'); 

// Membuat bintang dengan kelas 'star-2'
createStars(100, 'star-2');

function createFallingStar() {
    const star = document.createElement('div');
    star.classList.add('star-fall');

    const tail = document.createElement('div');
    tail.classList.add('tail');

    // Tambahkan buntut sebagai anak dari bintang
    star.appendChild(tail);

    // Ukuran acak bintang
    const size = Math.random() * 3 + 2; // Ukuran antara 2px hingga 5px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Posisi awal acak (horizontal)
    const startX = Math.random() * 4 * window.innerWidth - 400;
    const startY = -5; // Memulai di luar layar bagian atas
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    // Kecepatan jatuh acak
    const duration = Math.random() * 3 + 2; // Durasi antara 2 hingga 5 detik
    const endX = startX + (600); // Jatuh sedikit diagonal
    const endY = window.innerHeight + 100; // Keluar layar di bagian bawah

    star.style.transition = `transform ${duration}s linear`;
    document.body.appendChild(star);

    // Mulai animasi jatuh
    requestAnimationFrame(() => {
        star.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
    });

    // Hapus bintang setelah animasi selesai
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// Membuat bintang terus-menerus
function generateStars() {
    setInterval(() => {
        createFallingStar();
    }, 100); // Buat bintang baru setiap 200ms
}

// Jalankan animasi bintang jatuh
generateStars();

const blinkingTexts = document.querySelectorAll('.blinking-text');

function blink() {
    blinkingTexts.forEach((text) => {
        const randomInterval = Math.random() * 2000 + 1000; // Interval antara 500ms hingga 1500ms
        setTimeout(() => {
            if (text.style.opacity === '0.4') {
                text.style.opacity = '1'; // Ubah opacity menjadi 1
                text.classList.remove('no-shadow'); // Tambahkan shadow
                text.classList.add('with-shadow');
            } else {
                text.style.opacity = '0.4'; // Ubah opacity menjadi 0.4
                text.classList.remove('with-shadow'); // Hapus shadow
                text.classList.add('no-shadow');
            }
        }, randomInterval);
    });
}

// Mulai efek berkedip
setInterval(blink, 500); // Ulangi setiap 500ms

