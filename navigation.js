// ============================================================
// SWITZEA NAVIGATION COMPONENT
// Fælles navigation bar for alle apps
// ============================================================

import { handleLogout } from './shared-utils.js';

/**
 * Initialize navigation bar
 * Call this function when page loads
 */
export function initNavigation() {
    // Make logout globally available
    window.handleLogout = handleLogout;
    
    console.log('✅ Navigation initialized');
}

/**
 * Get navigation HTML
 * @returns {string} Navigation HTML
 */
export function getNavigationHTML() {
    return `
    <!-- SWITZEA Navigation Bar -->
    <div class="switzea-nav-bar">
        <div class="nav-content">
            <button onclick="window.location.href='dashboard.html'" class="nav-back-btn">
                ← Tilbage til Dashboard
            </button>
            <div class="nav-app-links">
                <a href="projektplanner.html">📊 Projektplanner</a>
                <a href="referat.html">📝 Referat</a>
                <a href="kundestatus.html">👥 Kundestatus</a>
            </div>
            <button onclick="handleLogout()" class="nav-logout-btn">
                🚪 Log ud
            </button>
        </div>
    </div>
    `;
}

/**
 * Get navigation CSS
 * @returns {string} Navigation CSS
 */
export function getNavigationCSS() {
    return `
    /* SWITZEA Navigation Bar */
    .switzea-nav-bar {
        background: linear-gradient(135deg, #2C5F7D 0%, #3A7CA5 100%);
        color: white;
        padding: 12px 20px;
        box-shadow: 0 2px 8px rgba(44,95,125,0.2);
        position: sticky;
        top: 0;
        z-index: 999;
    }

    .nav-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .nav-back-btn, .nav-logout-btn {
        background: #8B7355;
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
    }

    .nav-back-btn:hover, .nav-logout-btn:hover {
        background: #6B5845;
        transform: translateY(-1px);
    }

    .nav-app-links {
        display: flex;
        gap: 12px;
    }

    .nav-app-links a {
        color: white;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        transition: background 0.2s;
    }

    .nav-app-links a:hover {
        background: rgba(139, 115, 85, 0.3);
    }

    @media (max-width: 768px) {
        .nav-content {
            flex-direction: column;
            gap: 8px;
        }
        .nav-app-links {
            order: -1;
        }
    }
    `;
}