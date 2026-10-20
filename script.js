/* ==================== SELECT ELEMENTS ==================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

/* ==================== MOBILE NAVBAR ==================== */
function toggleMenu() {
    if (!menuIcon || !navbar) return;

    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

    const isOpen = navbar.classList.contains('active');

    menuIcon.setAttribute('aria-expanded', isOpen);
    menuIcon.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
    );
}

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', toggleMenu);

    // Mendukung tombol Enter dan Space pada keyboard
    menuIcon.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });
}

// Tutup menu setelah tautan navigasi dipilih
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (!menuIcon || !navbar) return;

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute(
            'aria-label',
            'Buka menu navigasi'
        );
    });
});

// Tutup menu jika layar berubah menjadi ukuran desktop
window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute(
            'aria-label',
            'Buka menu navigasi'
        );
    }
});

/* ==================== ACTIVE NAVBAR & STICKY HEADER ==================== */
function updateNavigation() {
    const scrollPosition = window.scrollY;

    // Efek sticky pada header
    if (header) {
        header.classList.toggle('sticky', scrollPosition > 100);
    }

    let currentSection = '';

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    // Aktifkan tautan yang sesuai dengan bagian halaman
    navLinks.forEach(function (link) {
        const target = link.getAttribute('href');

        link.classList.toggle(
            'active',
            target === '#' + currentSection
        );
    });

    // Tutup menu HP ketika pengguna menggulir halaman
    if (menuIcon && navbar && window.innerWidth <= 768) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute(
            'aria-label',
            'Buka menu navigasi'
        );
    }
}

window.addEventListener('scroll', updateNavigation);
window.addEventListener('load', updateNavigation);

/* ==================== SCROLL REVEAL ==================== */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 1800,
        delay: 150,
        reset: false
    });

    sr.reveal('.home-content, .heading', {
        origin: 'top'
    });

    sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', {
        origin: 'bottom'
    });

    sr.reveal('.home-content h1, .about-img', {
        origin: 'left'
    });

    sr.reveal('.home-content p, .about-content', {
        origin: 'right'
    });
}

/* ==================== TYPED JS ==================== */
const typedElement = document.querySelector('.multiple-text');

if (typedElement && typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
        strings: [
            'Frontend Developer',
            'UI/UX Designer',
            'Web Developer'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1200,
        startDelay: 300,
        loop: true
    });
}

/* ==================== READ MORE / READ LESS ==================== */
const readMoreBtn = document.querySelector('#read-more-btn');
const moreText = document.querySelector('.more-text');

if (readMoreBtn && moreText) {
    // Atur tampilan awal
    moreText.style.display = 'none';
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.setAttribute('aria-expanded', 'false');

    readMoreBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const isExpanded =
            readMoreBtn.getAttribute('aria-expanded') === 'true';

        moreText.style.display = isExpanded ? 'none' : 'inline';

        readMoreBtn.textContent = isExpanded
            ? 'Read More'
            : 'Read Less';

        readMoreBtn.setAttribute(
            'aria-expanded',
            String(!isExpanded)
        );
    });
}

/* ==================== CONTACT FORM NOTIFICATION ==================== */
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Buat latar belakang notifikasi
        const modalOverlay = document.createElement('div');

        Object.assign(modalOverlay.style, {
            position: 'fixed',
            inset: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: '9999'
        });

        // Buat kotak notifikasi
        const modalBox = document.createElement('div');

        Object.assign(modalBox.style, {
            backgroundColor: '#1f242d',
            border: '2px solid #00eeff',
            padding: '25px 20px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#ffffff',
            width: '100%',
            maxWidth: '350px',
            boxShadow: '0 0 20px rgba(0, 238, 255, 0.3)'
        });

        // Buat judul notifikasi
        const modalTitle = document.createElement('h3');

        modalTitle.textContent = 'Terima Kasih!';

        Object.assign(modalTitle.style, {
            fontSize: '22px',
            marginBottom: '12px',
            color: '#00eeff'
        });

        // Buat pesan notifikasi
        const modalText = document.createElement('p');

        modalText.textContent =
            'Formulir berhasil divalidasi. Fitur ini belum mengirim pesan ke email.';

        Object.assign(modalText.style, {
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '20px'
        });

        // Buat tombol tutup
        const modalBtn = document.createElement('button');

        modalBtn.type = 'button';
        modalBtn.textContent = 'OK';

        Object.assign(modalBtn.style, {
            backgroundColor: '#00eeff',
            color: '#1f242d',
            border: 'none',
            padding: '10px 28px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
        });

        function closeModal() {
            modalOverlay.remove();
        }

        modalBtn.addEventListener('click', function () {
            closeModal();
        });

        // Tutup ketika pengguna mengeklik area luar
        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });

        // Tutup dengan tombol Escape
        function handleEscape(event) {
            if (event.key === 'Escape') {
                closeModal();
                document.removeEventListener(
                    'keydown',
                    handleEscape
                );
            }
        }

        document.addEventListener('keydown', handleEscape);

        modalOverlay.addEventListener('click', function () {
            if (!document.body.contains(modalOverlay)) {
                document.removeEventListener(
                    'keydown',
                    handleEscape
                );
            }
        });

        // Susun notifikasi
        modalBox.appendChild(modalTitle);
        modalBox.appendChild(modalText);
        modalBox.appendChild(modalBtn);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        modalBtn.focus();
    });
}