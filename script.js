document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelectorAll('.nav__list a');
  const form = document.querySelector('.contact-form');
  const successMessage = document.querySelector('.contact-form__success');
  const header = document.querySelector('.header');

  // Animated counter for hero stats
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + '%';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '%';
      }
    };

    updateCounter();
  };

  // Initialize counter animation when hero stat is visible
  const heroStat = document.querySelector('.hero__stat[data-target]');
  if (heroStat) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(heroStat);
  }

  // Interactive hero cards
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Flip cards for services
  const serviceCards = document.querySelectorAll('.card--interactive');
  serviceCards.forEach((card) => {
    const toggleBtn = card.querySelectorAll('.card__toggle');
    toggleBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('card--flipped');
      });
    });
  });

  // Progress bars for about section
  const progressBars = document.querySelectorAll('.about-point__progress-bar');
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          setTimeout(() => {
            entry.target.style.width = progress + '%';
          }, 200);
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  progressBars.forEach((bar) => progressObserver.observe(bar));

  // Testimonial carousel (mobile only)
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');
  let currentTestimonial = 0;
  let autoRotateInterval;

  // Only initialize carousel on mobile
  const isMobile = window.innerWidth < 769;

  if (isMobile && testimonialsTrack && testimonials.length > 0) {
    const updateTestimonial = (index) => {
      testimonials.forEach((t, i) => {
        t.classList.toggle('testimonial--active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('testimonials__dot--active', i === index);
      });
      if (testimonialsTrack) {
        testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
      }
      currentTestimonial = index;
    };

    const nextTestimonial = () => {
      const next = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(next);
    };

    const prevTestimonial = () => {
      const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(prev);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoRotate();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoRotate();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateTestimonial(index);
        resetAutoRotate();
      });
    });

    const startAutoRotate = () => {
      autoRotateInterval = setInterval(nextTestimonial, 5000);
    };

    const resetAutoRotate = () => {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    };

    // Start auto-rotation when testimonials section is visible
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
      const testimonialsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAutoRotate();
            } else {
              clearInterval(autoRotateInterval);
            }
          });
        },
        { threshold: 0.3 }
      );
      testimonialsObserver.observe(testimonialsSection);
    }

    // Initialize first testimonial
    updateTestimonial(0);
  } else {
    // On desktop, show all testimonials
    testimonials.forEach((t) => {
      t.classList.add('testimonial--active');
    });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollThreshold = 100; // Hide header only after scrolling past this point

    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      const isScrolled = currentScrollY > 10;
      
      // Toggle scrolled state for styling
      header.classList.toggle('header--scrolled', isScrolled);

      // Only process hide/show if scroll difference is significant (avoid jitter)
      if (scrollDifference > 5) {
        if (currentScrollY > scrollThreshold) {
          // Only hide/show after scrolling past threshold
          if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down - hide header
            header.classList.remove('header--visible');
            header.classList.add('header--hidden');
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show header
            header.classList.remove('header--hidden');
            header.classList.add('header--visible');
          }
        } else {
          // Near top of page - always show header
          header.classList.remove('header--hidden');
          header.classList.add('header--visible');
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleHeaderScroll);
        ticking = true;
      }
    };

    // Initialize header state
    handleHeaderScroll();
    header.classList.add('header--visible');
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const revealTargets = document.querySelectorAll(
    '.hero__content, .hero__panel, .card, .about-point, .about-card, .testimonial, .contact__content, .contact-form'
  );

  if (revealTargets.length) {
    revealTargets.forEach((el, index) => {
      el.classList.add('reveal');

      const delayClass =
        index % 3 === 1 ? 'reveal--delay-1' : index % 3 === 2 ? 'reveal--delay-2' : '';
      if (delayClass) {
        el.classList.add(delayClass);
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: '0px 0px -60px 0px',
        }
      );

      revealTargets.forEach((el) => observer.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add('reveal--visible'));
    }
  }

  // Enhanced form validation
  if (form) {
    const formGroups = form.querySelectorAll('.contact-form__group');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Real-time validation
    const validateField = (input) => {
      const group = input.closest('.contact-form__group');
      const errorSpan = group.querySelector('.contact-form__error');
      let isValid = true;
      let errorMessage = '';

      // Remove previous states
      group.classList.remove('contact-form__group--error', 'contact-form__group--success');

      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      } else if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }

      if (isValid && input.value.trim()) {
        group.classList.add('contact-form__group--success');
        if (errorSpan) errorSpan.textContent = '';
      } else if (!isValid) {
        group.classList.add('contact-form__group--error');
        if (errorSpan) errorSpan.textContent = errorMessage;
      }

      return isValid;
    };

    // Add validation on blur and input
    formGroups.forEach((group) => {
      const input = group.querySelector('input, textarea, select');
      if (input) {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (group.classList.contains('contact-form__group--error')) {
            validateField(input);
          }
        });
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      let isFormValid = true;
      formGroups.forEach((group) => {
        const input = group.querySelector('input[required], textarea[required]');
        if (input && !validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        const firstError = form.querySelector('.contact-form__group--error input, .contact-form__group--error textarea');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;
      }

      // Collect form data
      const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        company: form.querySelector('#company').value.trim(),
        services: form.querySelector('#services').value,
        message: form.querySelector('#message').value.trim()
      };

      try {
        // Send email
        await sendEmail(formData);

        // Show success message
        if (successMessage) {
          successMessage.innerHTML = `
            <div class="contact-form__success-icon">✓</div>
            <p>Thank you! Your message has been sent to descomcommunications@gmail.com. We'll get back to you soon!</p>
          `;
          successMessage.hidden = false;
          form.reset();
          formGroups.forEach((group) => {
            group.classList.remove('contact-form__group--error', 'contact-form__group--success');
          });
        }

        // Reset button state
        if (submitBtn) {
          submitBtn.classList.remove('btn--loading');
          submitBtn.disabled = false;
        }

        // Hide success message after 8 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.hidden = true;
          }
        }, 8000);
      } catch (error) {
        console.error('Error sending email:', error);
        
        // Show error message
        if (successMessage) {
          successMessage.innerHTML = `
            <div class="contact-form__success-icon" style="background: #ef4444;">✕</div>
            <p>Failed to send message: ${error.message || 'Unknown error'}.<br>
            Please try again or contact us directly at <a href="mailto:descomcommunications@gmail.com?subject=Contact Form&body=Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0ACompany: ${encodeURIComponent(formData.company)}%0AServices: ${encodeURIComponent(formData.services)}%0AMessage: ${encodeURIComponent(formData.message)}" style="color: #60a5fa; text-decoration: underline;">descomcommunications@gmail.com</a></p>
          `;
          successMessage.hidden = false;
        }

        // Reset button state
        if (submitBtn) {
          submitBtn.classList.remove('btn--loading');
          submitBtn.disabled = false;
        }

        // Hide error message after 12 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.innerHTML = `
              <div class="contact-form__success-icon">✓</div>
              <p>Thank you! Your information has been recorded.</p>
            `;
            successMessage.hidden = true;
          }
        }, 12000);
      }
    });

    // Function to send email to descomcommunications@gmail.com using FormSubmit.co
    async function sendEmail(formData) {
      const formAction = form.getAttribute('action');
      
      // Use FormSubmit.co (works immediately, no signup required)
      if (formAction && formAction.includes('formsubmit.co')) {
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('name', formData.name);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('company', formData.company || 'Not provided');
          formDataToSend.append('services', formData.services);
          formDataToSend.append('message', formData.message);
          formDataToSend.append('_replyto', formData.email);
          formDataToSend.append('_subject', `Contact Form Submission from ${formData.name}`);
          formDataToSend.append('_captcha', 'false'); // Disable captcha for easier use
          formDataToSend.append('_template', 'table'); // Nice formatted email template

          const response = await fetch(formAction, {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json'
            }
          });

          // FormSubmit.co returns HTML on success, so we check status
          if (!response.ok) {
            throw new Error('Failed to send email');
          }

          return { success: true, message: 'Email sent successfully' };
        } catch (error) {
          console.error('FormSubmit error:', error);
          throw new Error('Failed to send email. Please try again.');
        }
      }

      // Fallback: Try Formspree if configured
      if (formAction && formAction.includes('formspree.io') && !formAction.includes('YOUR_FORM_ID')) {
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('name', formData.name);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('company', formData.company || 'Not provided');
          formDataToSend.append('services', formData.services);
          formDataToSend.append('message', formData.message);
          formDataToSend.append('_replyto', formData.email);
          formDataToSend.append('_subject', `Contact Form Submission from ${formData.name}`);

          const response = await fetch(formAction, {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json'
            }
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to send email via Formspree');
          }

          return result;
        } catch (error) {
          console.error('Formspree error:', error);
          throw error;
        }
      }

      // Fallback: Use mailto
      const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not provided'}\n` +
        `Interested in: ${formData.services}\n\n` +
        `Message:\n${formData.message}`
      );
      
      window.open(`mailto:descomcommunications@gmail.com?subject=${subject}&body=${body}`, '_blank');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: 'Email client opened' };
    }
  }
});

