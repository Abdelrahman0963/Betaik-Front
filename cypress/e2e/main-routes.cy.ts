// cypress/e2e/main-routes.cy.ts
// اختبارات الراوتات الرئيسية والمكونات الحساسة

describe('اختبارات الراوتات الرئيسية', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(1000)
    })

    describe('صفحات النظام الأساسية', () => {
        it('يجب تحميل صفحة معلومات الحساب', () => {
            cy.visit('/accountInfo', { timeout: 10000 })
            cy.url().should('include', '/accountInfo')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة المسؤولين', () => {
            cy.visit('/administrators', { timeout: 10000 })
            cy.url().should('include', '/administrators')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة التحليلات', () => {
            cy.visit('/analytics', { timeout: 10000 })
            cy.url().should('include', '/analytics')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة المناطق والأحياء', () => {
            cy.visit('/area-district', { timeout: 10000 })
            cy.url().should('include', '/area-district')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة المجمعات', () => {
            cy.visit('/compounds', { timeout: 10000 })
            cy.url().should('include', '/compounds')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة إدارة الفندق', () => {
            cy.visit('/dorms-mgt', { timeout: 10000 })
            cy.url().should('include', '/dorms-mgt')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة العملاء المحتملين', () => {
            cy.visit('/leads', { timeout: 10000 })
            cy.url().should('include', '/leads')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة السجلات', () => {
            cy.visit('/logs', { timeout: 10000 })
            cy.url().should('include', '/logs')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الخريطة', () => {
            cy.visit('/map', { timeout: 10000 })
            cy.url().should('include', '/map')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة المطورين الجدد', () => {
            cy.visit('/newdeveloper', { timeout: 10000 })
            cy.url().should('include', '/newdeveloper')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الجامعات الجديدة', () => {
            cy.visit('/newuniversity', { timeout: 10000 })
            cy.url().should('include', '/newuniversity')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الدفع', () => {
            cy.visit('/payment', { timeout: 10000 })
            cy.url().should('include', '/payment')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الممتلكات', () => {
            cy.visit('/properties', { timeout: 10000 })
            cy.url().should('include', '/properties')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الإعدادات', () => {
            cy.visit('/settings', { timeout: 10000 })
            cy.url().should('include', '/settings')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الإسكان الطلابي', () => {
            cy.visit('/student-housing', { timeout: 10000 })
            cy.url().should('include', '/student-housing')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة الدعم', () => {
            cy.visit('/support', { timeout: 10000 })
            cy.url().should('include', '/support')
            cy.get('body').should('be.visible')
        })
    })

    describe('صفحات المصادقة', () => {
        it('يجب تحميل صفحة تسجيل الدخول', () => {
            cy.visit('/login', { timeout: 10000 })
            cy.url().should('include', '/login')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة نسيان كلمة المرور', () => {
            cy.visit('/login/forgit-password', { timeout: 10000 })
            cy.url().should('include', '/forgit-password')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة إعادة تعيين كلمة المرور', () => {
            cy.visit('/login/resetpassword', { timeout: 10000 })
            cy.url().should('include', '/resetpassword')
            cy.get('body').should('be.visible')
        })

        it('يجب تحميل صفحة كلمة مرور جديدة', () => {
            cy.visit('/newpassword', { timeout: 10000 })
            cy.url().should('include', '/newpassword')
            cy.get('body').should('be.visible')
        })
    })

    describe('التنقل بين الصفحات', () => {
        it('يجب الانتقال بسلاسة بين عدة صفحات', () => {
            cy.visit('/accountInfo')
            cy.wait(500)

            cy.visit('/compounds')
            cy.wait(500)

            cy.visit('/analytics')
            cy.wait(500)

            cy.visit('/student-housing')
            cy.wait(500)

            cy.get('body').should('be.visible')
        })
    })

    describe('فحص الـ SEO والمعايير', () => {
        it('يجب أن تحتوي الصفحة على Title', () => {
            cy.title().should('not.be.empty')
        })

        it('يجب أن تحتوي الصفحة على Meta Tags', () => {
            cy.get('meta[charset]').should('exist')
            cy.get('meta[name="viewport"]').should('exist')
        })

        it('يجب أن تحتوي الصفحة على Structure الصحيحة', () => {
            cy.get('header, main, footer').should('exist')
        })
    })

    describe('معايير الأداء', () => {
        it('يجب أن تكون أوقات التفاعل سريعة', () => {
            const metrics = []
            cy.window().then((win) => {
                if (win.performance && win.performance.timing) {
                    const timing = win.performance.timing
                    const loadTime = timing.loadEventEnd - timing.navigationStart
                    metrics.push(loadTime)
                    expect(loadTime).to.be.lessThan(8000)
                }
            })
        })
    })
})
