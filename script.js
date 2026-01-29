document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    const hoverElements = document.querySelectorAll('a, button, .service-card, .blog-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for the blur effect
        setTimeout(() => {
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        }, 50);
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });

    // --- Scroll Animations (Fade in Up) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Once visible, stop observing
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        document.querySelectorAll('.parallax').forEach(el => {
            const speed = el.getAttribute('data-speed');
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Navbar blur effect
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Modal System for Blog ---
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const blogCards = document.querySelectorAll('.blog-card');

    // Blog Content Data (Simulated)
    const blogContent = {
        "1": "<h2>Butik Nədir? Fərdiliyin Gücü</h2><p>Butik mədəniyyəti, kütləvi istehsalın təktonluğundan qaçmaq və özəl hiss etməkdir. Elina Butik-də hər bir parça bir hekayə danışır. Biz inanırıq ki, geyim sadəcə bədəni örtmək üçün deyil, ruhu ifadə etmək üçündür. Hər bir tikişdə, hər bir parçada sənətkarlıq və sevgi var.</p><p>Müasir dünyada hər şeyin surəti çıxarılır, lakin sizin stiliniz təkrarolunmazdır.</p>",
        "2": "<h2>Qarderob Detoksu: Az Amma Öz</h2><p>Şıklıq çox geyimə sahib olmaq deyil, bir-birini tamamlayan keyfiyyətli parçaları seçməkdir. Kapsul qarderobun sirlərini bizimlə kəşf edin. Lazımsız parçalardan azad olun, sadəcə sizi xoşbəxt edən və sizə yaraşan geyimləri saxlayın.</p><p>Minimalizm, darıxdırıcı olmaq demək deyil; əksine, hər seçiminizin şüurlu və dəyərli olması deməkdir.</p>"
    };

    blogCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const currentLang = document.getElementById('language-select').value;
            modalBody.innerHTML = blogContentData[currentLang][id];
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modalContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on click outside
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Contact Form Animation ---
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const lang = document.getElementById('language-select').value;
        const originalText = translations[lang]['btn_send'];

        btn.textContent = translations[lang]['btn_sending'];
        btn.style.opacity = '0.7';

        // Simulate sending and redirect
        setTimeout(() => {
            btn.textContent = translations[lang]['btn_sent'];
            btn.style.background = '#FFB800';
            btn.style.color = '#000';

            setTimeout(() => {
                window.open('https://instagram.com/_elina_butik_', '_blank');
                // Reset form
                form.reset();
                btn.textContent = originalText;
                btn.style.background = 'transparent';
                btn.style.color = '#fff';
                btn.style.opacity = '1';
                // Trigger re-update to ensure correct language text persists
                updateLanguage(lang);
            }, 1000);
        }, 1500);
    });

    // --- Language Switcher Logic ---
    const translations = {
        az: {
            nav_home: "Ana Səhifə",
            nav_collection: "Kolleksiya",
            nav_about: "Haqqımızda",
            nav_blog: "Bloq",
            nav_contact: "Əlaqə",
            hero_title_1: "Stilin Atəşiylə",
            hero_title_2: "Tanış Olun.",
            hero_desc: "Elina Butik ilə sadəcə geyinməyin; ruhunuzu, tərzinizi və enerjinizi əks etdirən ikonik parçalarla fərq yaradın. Dizaynın ən isti halı buradadır.",
            hero_cta: "Kolleksiyanı Kəşf Et",
            services_title: "Kolleksiyanız",
            services_design_title: "Xüsusi Dizayn",
            services_design_desc: "Kütləvi istehsalın xaricində, yalnız sizə aid olan və şəxsiyyətinizi tamamlayan sənət əsərləri.",
            services_style_title: "Stil Məsləhətçiliyi",
            services_style_desc: "Doğru kombin, güclü imic. Stilistlərimizlə bədən tipinizə və xarakterinizə ən uyğun görünüşü yaradın.",
            services_accessories_title: "Aksesuarlar",
            services_accessories_desc: "Şıklığınızı sənət əsərinə çevirəcək seçilmiş aksesuar kolleksiyası.",
            about_title: "Elinanın İlham Yolu",
            about_desc: "Dəb bir dildir; Elina Butik isə bu dilin ən şık cümləsidir. Biz hər bir qadının daxilindəki o unikal işığı üzə çıxarmaq üçün yola çıxdıq. Atəş kimi isti, diqqətçəkən və qarşısıalınmaz bir zəriflik vəd edirik.",
            blog_title: "Elina Journal",
            blog_cat_1: "Trendlər",
            blog_post_1_title: "Butik Nədir? Fərdiliyin Gücü",
            blog_cat_2: "Məsləhətlər",
            blog_post_2_title: "Qarderob Detoksu: Az Amma Öz",
            read_more: "Oxumağa davam et →",
            contact_title: "Bizimlə Əlaqə",
            contact_desc: "Sualınız var? Stilistlərimiz sizi gözləyir.",
            placeholder_name: "Adınız",
            placeholder_msg: "Mesajınız...",
            btn_send: "Göndər",
            btn_sending: "Göndərilir...",
            btn_sent: "Mesajınız Getdi! ✨"
        },
        tr: {
            nav_home: "Ana Sayfa",
            nav_collection: "Koleksiyon",
            nav_about: "Hakkımızda",
            nav_blog: "Blog",
            nav_contact: "İletişim",
            hero_title_1: "Stilin Ateşiyle",
            hero_title_2: "Tanışın.",
            hero_desc: "Elina Butik ile sadece giyinmeyin; ruhunuzu, tarzınızı ve enerjinizi yansıtan ikonik parçalarla fark yaratın. Tasarımın en sıcak hali burada.",
            hero_cta: "Koleksiyonu Keşfet",
            services_title: "Koleksiyonunuz",
            services_design_title: "Özel Tasarım",
            services_design_desc: "Seri üretimin dışında, sadece size ait olan ve kişiliğinizi tamamlayan sanat eserleri.",
            services_style_title: "Stil Danışmanlığı",
            services_style_desc: "Doğru kombin, güçlü imaj. Stilistlerimizle vücut tipinize ve karakterinize en uygun görünümü yaratın.",
            services_accessories_title: "Aksesuarlar",
            services_accessories_desc: "Şıklığınızı sanat eserine dönüştürecek seçkin aksesuar koleksiyonu.",
            about_title: "Elina'nın İlham Yolu",
            about_desc: "Moda bir dildir; Elina Butik ise bu dilin en şık cümlesidir. Biz her kadının içindeki o eşsiz ışığı ortaya çıkarmak için yola çıktık. Ateş gibi sıcak, dikkat çekici ve karşı konulmaz bir zarafet vadediyoruz.",
            blog_title: "Elina Journal",
            blog_cat_1: "Trendler",
            blog_post_1_title: "Butik Nedir? Bireyselliğin Gücü",
            blog_cat_2: "Tavsiyeler",
            blog_post_2_title: "Gardırop Detoksu: Az Ama Öz",
            read_more: "Okumaya devam et →",
            contact_title: "Bizimle İletişime Geçin",
            contact_desc: "Sorunuz mu var? Stilistlerimiz sizi bekliyor.",
            placeholder_name: "Adınız",
            placeholder_msg: "Mesajınız...",
            btn_send: "Gönder",
            btn_sending: "Gönderiliyor...",
            btn_sent: "Mesajınız Gitti! ✨"
        },
        en: {
            nav_home: "Home",
            nav_collection: "Collection",
            nav_about: "About Us",
            nav_blog: "Blog",
            nav_contact: "Contact",
            hero_title_1: "Meet the Fire",
            hero_title_2: "of Style.",
            hero_desc: "Don't just dress with Elina Boutique; make a difference with iconic pieces that reflect your soul, style, and energy. The hottest form of design is here.",
            hero_cta: "Discover Collection",
            services_title: "Your Collection",
            services_design_title: "Custom Design",
            services_design_desc: "Beyond mass production, art pieces that belong only to you and complete your personality.",
            services_style_title: "Style Consultancy",
            services_style_desc: "Right outfit, strong image. Create the look that best suits your body type and character with our stylists.",
            services_accessories_title: "Accessories",
            services_accessories_desc: "A selected accessory collection that will turn your elegance into a work of art.",
            about_title: "Elina's Inspiration Path",
            about_desc: "Fashion is a language; Elina Boutique is the most stylish sentence of this language. We set out to reveal that unique light inside every woman. We promise an elegance as hot as fire, striking and irresistible.",
            blog_title: "Elina Journal",
            blog_cat_1: "Trends",
            blog_post_1_title: "What is Boutique? Power of Individuality",
            blog_cat_2: "Tips",
            blog_post_2_title: "Wardrobe Detox: Less is More",
            read_more: "Read More →",
            contact_title: "Contact Us",
            contact_desc: "Have a question? Our stylists are waiting for you.",
            placeholder_name: "Your Name",
            placeholder_msg: "Your Message...",
            btn_send: "Send",
            btn_sending: "Sending...",
            btn_sent: "Message Sent! ✨"
        }
    };

    const blogContentData = {
        az: {
            1: "<h2>Butik Nədir? Fərdiliyin Gücü</h2><p>Butik mədəniyyəti, kütləvi istehsalın təktonluğundan qaçmaq və özəl hiss etməkdir. Elina Butik-də hər bir parça bir hekayə danışır. Biz inanırıq ki, geyim sadəcə bədəni örtmək üçün deyil, ruhu ifadə etmək üçündür. Hər bir tikişdə, hər bir parçada sənətkarlıq və sevgi var.</p><p>Müasir dünyada hər şeyin surəti çıxarılır, lakin sizin stiliniz təkrarolunmazdır.</p>",
            2: "<h2>Qarderob Detoksu: Az Amma Öz</h2><p>Şıklıq çox geyimə sahib olmaq deyil, bir-birini tamamlayan keyfiyyətli parçaları seçməkdir. Kapsul qarderobun sirlərini bizimlə kəşf edin. Lazımsız parçalardan azad olun, sadəcə sizi xoşbəxt edən və sizə yaraşan geyimləri saxlayın.</p><p>Minimalizm, darıxdırıcı olmaq demək deyil; əksine, hər seçiminizin şüurlu və dəyərli olması deməkdir.</p>"
        },
        tr: {
            1: "<h2>Butik Nedir? Bireyselliğin Gücü</h2><p>Butik kültürü, seri üretimin tekdüzeliğinden kaçmak ve özel hissetmektir. Elina Butik'te her parça bir hikaye anlatır. Giyimin sadece bedeni örtmek için değil, ruhu ifade etmek için olduğuna inanıyoruz. Her dikişte, her parçada sanatçılık ve sevgi var.</p><p>Modern dünyada her şeyin kopyası çıkarılıyor, ancak sizin stiliniz tekrarlanamaz.</p>",
            2: "<h2>Gardırop Detoksu: Az Ama Öz</h2><p>Şıklık çok kıyafete sahip olmak değil, birbirini tamamlayan kaliteli parçaları seçmektir. Kapsül gardırobun sırlarını bizimle keşfedin. Gereksiz parçalardan kurtulun, sadece sizi mutlu eden ve size yakışan kıyafetleri saklayın.</p><p>Minimalizm, sıkıcı olmak demek değildir; aksine, her seçiminizin bilinçli ve değerli olması demektir.</p>"
        },
        en: {
            1: "<h2>What is Boutique? Power of Individuality</h2><p>Boutique culture is about escaping the monotony of mass production and feeling special. At Elina Boutique, every piece tells a story. We believe clothing is not just to cover the body, but to express the soul. There is craftsmanship and love in every stitch, every piece.</p><p>In the modern world, everything is copied, but your style is unique.</p>",
            2: "<h2>Wardrobe Detox: Less is More</h2><p>Elegance is not about owning many clothes, but selecting quality pieces that complement each other. Discover the secrets of a capsule wardrobe with us. Get rid of unnecessary pieces, keep only the clothes that make you happy and suit you.</p><p>Minimalism doesn't mean being boring; on the contrary, it means every choice is conscious and valuable.</p>"
        }
    };

    const langSelect = document.getElementById('language-select');

    function updateLanguage(lang) {
        // Update all standard text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Save preference
        localStorage.setItem('elina_lang', lang);
    }

    // Initialize Language
    const savedLang = localStorage.getItem('elina_lang') || 'az';
    langSelect.value = savedLang;
    updateLanguage(savedLang);

    // Event Listener
    langSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // --- Reveal Animation Trigger (for simple load) ---
    // The CSS animation runs automatically, but we ensure the page is loaded
    window.onload = function () {
        document.body.classList.add('loaded');
    };

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.textAlign = 'center';
                navLinks.style.gap = '2rem';
                navLinks.style.borderTop = '1px solid #333';
            }
        });
    }
});
