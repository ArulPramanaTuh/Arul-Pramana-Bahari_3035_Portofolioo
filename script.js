// Reveal animasi untuk .skills-border saat scroll
document.addEventListener('DOMContentLoaded', () => {
    const skillsBorder = document.querySelector('.skills-border');
    if (skillsBorder) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsBorder.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        observer.observe(skillsBorder);
    }
});
// Lingkaran kursor custom
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor-circle');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
// Animasi partikel background
// 1. Tunggu sampai DOM siap
// 2. Ambil elemen canvas
// 3. Dapatkan context 2D
// 4. Set ukuran canvas sesuai layar
// 5. Buat array partikel dengan posisi, radius, dan kecepatan acak
// 6. Fungsi drawParticles menggambar dan menggerakkan partikel
// 7. Efek glow, gradient, dan pantulan tepi
// 8. Loop animasi dengan requestAnimationFrame

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-bg'); // 2
    if (canvas) {
        const ctx = canvas.getContext('2d'); // 3
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w; // 4
        canvas.height = h; // 4

        const particles = [];
        const particleCount = 80; // 5
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w, // posisi X acak
                y: Math.random() * h, // posisi Y acak
                r: Math.random() * 2 + 1, // radius acak
                dx: (Math.random() - 0.5) * 1.2, // kecepatan X acak
                dy: (Math.random() - 0.5) * 1.2, // kecepatan Y acak
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h); // bersihkan canvas
            for (let i = 0; i < particleCount; i++) {
                let p = particles[i];
                ctx.save();
                ctx.shadowColor = '#00fff7'; // efek glow biru
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); // gambar lingkaran partikel
                // Gradient warna partikel
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
                grad.addColorStop(0, '#00fff7');
                grad.addColorStop(0.5, '#6a00f7');
                grad.addColorStop(1, '#1a1a40');
                ctx.fillStyle = grad;
                ctx.fill(); // isi lingkaran dengan gradient
                ctx.restore();
                // Update posisi partikel
                p.x += p.dx;
                p.y += p.dy;
                // Pantulkan partikel jika kena tepi layar
                if (p.x < 0 || p.x > w) p.dx *= -1;
                if (p.y < 0 || p.y > h) p.dy *= -1;
            }
            requestAnimationFrame(drawParticles); // loop animasi
        }
        drawParticles(); // mulai animasi

        window.addEventListener('resize', () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        });
    }
});