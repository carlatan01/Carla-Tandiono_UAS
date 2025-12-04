// Memastikan DOM telah selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Logika Fade-In On Scroll (Interaktivitas)
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        threshold: 0.1 // Trigger saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hentikan pengamatan setelah elemen menjadi terlihat
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // 2. Inisialisasi Bootstrap Scrollspy (Jika menggunakan data-bs-spy di body)
    // Walaupun sudah ada di Bootstrap bundle, menginisialisasi secara eksplisit lebih aman.
    const scrollSpyEl = document.querySelector('body[data-bs-spy="scroll"]');
    if (scrollSpyEl) {
        new bootstrap.ScrollSpy(scrollSpyEl, {
            target: '#mainNav' // Target navbar
        });
    }

    // 3. Smooth Scroll (Interaktivitas yang lebih baik)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Hanya berlaku untuk link yang mengarah ke id di halaman yang sama
            if(this.getAttribute('href').length > 1 && this.hash) {
                e.preventDefault();
                document.querySelector(this.hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});