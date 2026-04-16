const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'var(--gold)';
        ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
        ring.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--dusty-rose)';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.opacity = '0.6';
      });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .project-card, .step').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(2rem)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // WhatsApp Integration
    document.getElementById('whatsapp-submit').addEventListener('click', () => {
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const project = document.getElementById('contact-project').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !message) {
        alert("Por favor, completa al menos tu nombre y el mensaje.");
        return;
      }

      const text = `¡Hola Rocio! 👋 Mi nombre es ${name}. 
📧 Email: ${email}
🎯 Proyecto: ${project}
📝 Mensaje: ${message}`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/5492257307874?text=${encodedText}`;

      window.open(whatsappUrl, '_blank');
    });