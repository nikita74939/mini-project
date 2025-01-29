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
    fallingStarInterval = setInterval(() => {
        createFallingStar();
    }, 100); // Buat bintang baru setiap 100ms
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

document.getElementById('btn-start').addEventListener('click', function(){
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('create').style.display = 'flex';

    clearInterval(fallingStarInterval);
    makeStars();
});

document.getElementById('btn-create').addEventListener('click', function(){
    document.getElementById('create').style.display = 'none';
    document.getElementById('result').style.display = 'flex';

});

let connectedPoints = [];
let canvas; // Declare canvas globally
let draggingStar = null; // To keep track of the star being dragged


function makeStars() {
    const container = document.getElementById('grid-container');
    const starSize = 10; // Ukuran bintang
    const offset = 40; // Offset untuk menggeser bintang

    for (let i = 1; i <= 49; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.id = 'star' + i;
        star.dataset.index = i; // Store index for connection

        // Mengatur posisi bintang dalam grid
        const col = (i - 1) % 7; // Kolom
        const row = Math.floor((i - 1) / 7); // Baris

        // Menghitung posisi bintang dengan offset acak
        const randomX = Math.random() * offset - offset / 2; // Offset horizontal
        const randomY = Math.random() * offset - offset / 2; // Offset vertikal

        // Mengatur posisi bintang dengan jarak antar bintang
        star.style.left = `${col * (starSize + 80) + randomX}px`; // Mengatur posisi horizontal
        star.style.top = `${row * (starSize + 35) + randomY}px`; // Mengatur posisi vertikal

        // Add event listeners for drag and drop
        star.addEventListener('mousedown', startDrag);
        star.addEventListener('mouseup', endDrag);
        star.addEventListener('mousemove', drag);
        container.appendChild(star);
    }

    // Create canvas after stars are created
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);
}

function startDrag(event) {
    draggingStar = event.target; // Set the star being dragged
    draggingStar.style.background = '#ffcc00'; // Change color to indicate it's being dragged
}

function endDrag(event) {
    if (draggingStar) {
        const dropStar = event.target; // The star where it is dropped
        const dropIndex = dropStar.dataset.index;

        if (dropStar !== draggingStar) {
            // Connect the stars if they are different
            connectedPoints.push(draggingStar.dataset.index);
            connectedPoints.push(dropIndex);
            drawLines();
        }

        draggingStar.style.background = '#ffffff'; // Reset color
        draggingStar = null; // Reset dragging star
    }
}

function drag(event) {
    if (draggingStar) {
        // Optionally, you can implement visual feedback while dragging
        // For example, you can change the position of the star being dragged
    }
}

function drawLines() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines

    for (let i = 0; i < connectedPoints.length - 1; i++) {
        const startIndex = connectedPoints[i];
        const endIndex = connectedPoints[i + 1];

        const startStar = document.getElementById('star' + startIndex);
        const endStar = document.getElementById('star' + endIndex);

        const startX = startStar.offsetLeft + startStar.offsetWidth / 2;
        const startY = startStar.offsetTop + startStar.offsetHeight / 2;
        const endX = endStar.offsetLeft + endStar.offsetWidth / 2;
        const endY = endStar.offsetTop + endStar.offsetHeight / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#ffcc00'; 
        ctx.lineWidth = 2; 
        ctx.stroke();
        ctx.closePath();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-clear').addEventListener('click', function(){
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connectedPoints = [];
    });
});