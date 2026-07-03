(function () {
    const STORAGE_KEY = 'site-theme';
    const root = document.documentElement;
    const body = document.body;

    const themeStyles = `
        .theme-toggle {
            position: fixed;
            left: 1rem;
            bottom: 1rem;
            z-index: 2000;
            border: 1px solid var(--color-border);
            background: var(--color-surface);
            color: var(--color-text);
            border-radius: 999px;
            width: 2.75rem;
            height: 2.75rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            cursor: pointer;
            box-shadow: var(--shadow);
            transition: width 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
            font-size: 1.1rem;
            overflow: hidden;
            white-space: nowrap;
            padding: 0;
            line-height: 1;
            box-sizing: border-box;
        }

        .theme-toggle:hover {
            width: 8rem;
            justify-content: center;
            transform: translateY(-1px);
            padding: 0 0.8rem;
        }

        .theme-toggle .theme-icon,
        .theme-toggle .theme-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .theme-toggle .theme-icon {
            font-size: 1.1rem;
            line-height: 1;
        }

        .theme-toggle .theme-label {
            width: 0;
            overflow: hidden;
            opacity: 0;
            font-size: 0.9rem;
            transition: width 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease;
            margin-left: 0;
        }

        .theme-toggle:hover .theme-label {
            width: 3.25rem;
            opacity: 1;
            margin-left: 0.25rem;
        }

        @media (max-width: 600px) {
            .theme-toggle {
                left: 0.75rem;
                bottom: 0.75rem;
                width: 2.5rem;
                height: 2.5rem;
                font-size: 1rem;
            }

            .theme-toggle:hover {
                width: 7.25rem;
            }

            .theme-toggle:hover .theme-label {
                width: 3rem;
            }
        }
    `;

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.setAttribute('data-theme', theme);
        root.style.setProperty('--color-primary', isDark ? '#60A5FA' : '#2563EB');
        root.style.setProperty('--color-secondary', isDark ? '#22D3EE' : '#06B6D4');
        root.style.setProperty('--color-accent', isDark ? '#A78BFA' : '#8B5CF6');
        root.style.setProperty('--color-background', isDark ? '#020617' : '#FFFFFF');
        root.style.setProperty('--color-surface', isDark ? '#111827' : '#F8FAFC');
        root.style.setProperty('--color-text', isDark ? '#F8FAFC' : '#0F172A');
        root.style.setProperty('--color-border', isDark ? '#334155' : '#CBD5E1');
        root.style.setProperty('--color-success', isDark ? '#34D399' : '#10B981');
        root.style.setProperty('--shadow', isDark ? '0 8px 24px rgba(0, 0, 0, 0.35)' : '0 8px 24px rgba(15, 23, 42, 0.08)');
        root.style.setProperty('--color-text-secondary', isDark ? '#94A3B8' : '#475569');

        if (body) {
            body.setAttribute('data-theme', theme);
        }

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-pressed', String(isDark));
            const icon = toggle.querySelector('.theme-icon');
            const label = toggle.querySelector('.theme-label');

            if (icon) {
                icon.textContent = isDark ? '☀️' : '🌙';
            }

            if (label) {
                label.textContent = isDark ? 'Light' : 'Dark';
            }
        }
    }

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || '';
        } catch (error) {
            return '';
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.warn('Theme could not be saved:', error);
        }
    }

    function createToggle() {
        if (document.getElementById('theme-toggle')) {
            return;
        }

        const style = document.createElement('style');
        style.textContent = themeStyles;
        document.head.appendChild(style);

        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.type = 'button';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle color theme');
        button.innerHTML = '<span class="theme-icon">🌙</span><span class="theme-label">Dark</span>';
        button.addEventListener('click', () => {
            const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            saveTheme(nextTheme);
            applyTheme(nextTheme);
        });

        document.documentElement.appendChild(button);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = getStoredTheme();
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || preferredTheme;

        createToggle();
        applyTheme(initialTheme);
    });
})();

// global.js
// Small helpers used across vendor pages

// Replace broken images with a placeholder
export function enableImageFallback(placeholderPath = "/images/placeholder.png") {
  // run once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => _attach());
  } else {
    _attach();
  }

  function _attach() {
    // attach error handler to existing and future images
    const observer = new MutationObserver(() => {
      document.querySelectorAll("img").forEach(_ensureHandler);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll("img").forEach(_ensureHandler);

    function _ensureHandler(img) {
      if (img.__fallbackAttached) return;
      img.addEventListener("error", () => {
        if (img.src !== placeholderPath) {
          img.src = placeholderPath;
        }
      });
      img.__fallbackAttached = true;
    }
  }
}

// small convenience to add loaded class with animation timing used in your pages
export function markLoaded() {
  requestAnimationFrame(() => document.body.classList.add("loaded"));
}

// auto-run fallback with default placeholder path
enableImageFallback();
