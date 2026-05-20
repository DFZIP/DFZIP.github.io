/**
 * DFZIP 鼎富拉链 - 企业官网交互脚本
 * 功能：导航、轮播、动画、产品筛选等
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 移动端导航菜单
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ========================================
    // 滚动时导航栏样式变化
    // ========================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // Banner轮播
    // ========================================
    const bannerSlides = document.querySelector('.banner-slides');
    const bannerDots = document.querySelectorAll('.banner-dots .dot');
    const prevBtn = document.querySelector('.banner-arrow.prev');
    const nextBtn = document.querySelector('.banner-arrow.next');

    if (bannerSlides && bannerDots.length > 0) {
        let currentSlide = 0;
        const totalSlides = bannerDots.length;

        function showSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentSlide = index;
            bannerSlides.style.transform = `translateX(-${currentSlide * 100}%)`;

            bannerDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // 自动轮播
        let autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // 点击导航点
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(autoSlideInterval);
                showSlide(index);
                autoSlideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            });
        });

        // 前后箭头
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(autoSlideInterval);
                showSlide(currentSlide - 1);
                autoSlideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                clearInterval(autoSlideInterval);
                showSlide(currentSlide + 1);
                autoSlideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            });
        }
    }

    // ========================================
    // 滚动动画
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkAnimation() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    // 初始检查
    checkAnimation();

    // 滚动时检查
    window.addEventListener('scroll', checkAnimation);

    // ========================================
    // 产品分类筛选
    // ========================================
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card[data-category]');
    const caseCards = document.querySelectorAll('.case-card[data-category]');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;

            // 更新按钮状态
            categoryButtons.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('btn-solid');
                b.classList.add('btn-outline');
            });
            this.classList.add('active');
            this.classList.remove('btn-outline');
            this.classList.add('btn-solid');

            // 筛选产品卡片
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('animated'), 100);
                } else {
                    card.style.display = 'none';
                }
            });

            // 筛选案例卡片
            caseCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('animated'), 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // 联系表单处理
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company')?.value || '',
                phone: document.getElementById('phone').value,
                email: document.getElementById('email')?.value || '',
                product: document.getElementById('product')?.value || '',
                message: document.getElementById('message').value
            };

            // 模拟提交成功
            alert('感谢您的留言！我们会尽快与您联系。\n\n姓名：' + formData.name + '\n电话：' + formData.phone);

            // 重置表单
            contactForm.reset();

            // 实际项目中应发送到服务器
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
        });
    }

    // ========================================
    // 平滑滚动
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 数字动画（用于统计数据）
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-item .number');

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            let number = parseInt(text.replace(/[+%]/g, ''));

            if (stat.dataset.animated) return;

            const elementTop = stat.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 50) {
                stat.dataset.animated = 'true';
                animateNumber(stat, 0, number, hasPlus, hasPercent);
            }
        });
    }

    function animateNumber(element, start, end, hasPlus, hasPercent) {
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);

            let display = current.toString();
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';

            element.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // 初始检查数字动画
    animateNumbers();
    window.addEventListener('scroll', animateNumbers);
});