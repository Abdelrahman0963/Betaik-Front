/// <reference types="cypress" />

// ============================================================
// TypeScript declarations
// ============================================================
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Sets auth cookies to simulate a logged-in session.
       * @param role - e.g. "superadmin", "subadmin"
       */
      loginBypass(role?: string): Chainable<void>;
      
      /**
       * أمر مخصص للانتظار حتى يتم تحميل الصفحة بالكامل
       */
      waitForPageLoad(): Chainable<void>;
      
      /**
       * أمر للتحقق من سرعة التحميل
       */
      checkLoadTime(maxTime: number): Chainable<void>;
      
      /**
       * أمر للتحقق من عدم وجود أخطاء في الكونسول
       */
      checkNoConsoleErrors(): Chainable<void>;
      
      /**
       * أمر للتحقق من توفر عنصر معين
       */
      checkElementPresence(selector: string): Chainable<void>;
      
      /**
       * أمر لقياس أداء العملية
       */
      measurePerformance(label: string): Chainable<void>;
    }
  }
}

// ============================================================
// Custom Commands
// ============================================================

/**
 * loginBypass: Sets auth cookies to simulate a logged-in session
 * without hitting the real API. Used in beforeEach for protected routes.
 */
Cypress.Commands.add("loginBypass", (role = "superadmin") => {
  const user = JSON.stringify({ role });
  cy.setCookie("token", "fake-test-token-12345");
  cy.setCookie("refreshToken", "fake-refresh-token-12345");
  cy.setCookie("user", user);
});

// ============================================================
// أوامر تحسينات الأداء
// ============================================================

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().then((win) => {
    if (win.performance && win.performance.timing) {
      cy.log('✓ Page loaded successfully')
    }
  })
})

Cypress.Commands.add('checkLoadTime', (maxTime: number) => {
  const startTime = Date.now()
  cy.visit('/', { onBeforeLoad: () => { } }).then(() => {
    const endTime = Date.now()
    const loadTime = endTime - startTime
    cy.log(`⏱️ Page load time: ${loadTime}ms`)
    expect(loadTime).to.be.lessThan(maxTime)
  })
})

Cypress.Commands.add('checkNoConsoleErrors', () => {
  const errors: string[] = []
  cy.on('window:before:load', (win) => {
    cy.stub(win.console, 'error').callsFake((msg) => {
      errors.push(msg)
    })
  })
  cy.then(() => {
    if (errors.length === 0) {
      cy.log('✓ No console errors found')
    } else {
      cy.log(`⚠️ Found ${errors.length} console errors`)
    }
  })
})

Cypress.Commands.add('checkElementPresence', (selector: string) => {
  cy.get(selector).should('exist').and('be.visible')
})

Cypress.Commands.add('measurePerformance', (label: string) => {
  cy.window().then((win) => {
    if (win.performance && win.performance.timing) {
      const timing = win.performance.timing
      const metrics = {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      }
      cy.log(`📊 Performance [${label}]: ${metrics.loadTime}ms`)
    }
  })
})

// ============================================================
// معالجة الأخطاء
// ============================================================

// تجاهل الأخطاء المتوقعة
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Expected') || err.message.includes('Network')) {
    return false
  }
})

export {};
