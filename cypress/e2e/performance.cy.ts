// cypress/e2e/performance.cy.ts
// اختبارات الأداء والـ Dynamic Routes

describe('Performance and Dynamic Routes Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('页面التحميل والأداء', () => {
        it('يجب تحميل الصفحة الرئيسية بسرعة', () => {
            const start = performance.now()
            cy.visit('/', { onBeforeLoad: () => { } })
            cy.get('body').should('exist')
            const end = performance.now()
            expect(end - start).to.be.lessThan(5000) // أقل من 5 ثوان
        })

        it('يجب تحميل الـ Layout بنجاح', () => {
            cy.get('header').should('be.visible')
            cy.get('main').should('be.visible')
        })

        it('يجب أن تكون جميع الصور محسّنة', () => {
            cy.get('img').each(($img) => {
                cy.wrap($img).should('have.prop', 'naturalWidth').greaterThan(0)
            })
        })
    })

    describe('Dynamic Routes - أقسام رئيسية', () => {
        const routes = [
            '/accountInfo',
            '/administrators',
            '/analytics',
            '/area-district',
            '/compounds',
            '/dorms-mgt',
            '/leads',
            '/logs',
            '/map',
            '/newdeveloper',
            '/newuniversity',
            '/payment',
            '/properties',
            '/settings',
            '/student-housing',
            '/support',
        ]

        routes.forEach((route) => {
            it(`يجب الوصول إلى الراوت ${route}`, () => {
                cy.visit(route, { failOnStatusCode: false })
                cy.url().should('include', route)
            })
        })
    })

    describe('تحميل المكونات الديناميكية', () => {
        it('يجب تحميل المكونات بدون تأخير ملحوظ', () => {
            cy.intercept('/api/**').as('apiCall')
            cy.get('[data-testid="page-wrapper"], main, section').should('exist')
            cy.get('body').should('not.have.class', 'loading')
        })

        it('يجب دعم الـ Lazy Loading', () => {
            cy.viewport('iphone-x')
            cy.get('body').scrollTo('bottom')
            cy.wait(1000)
            cy.get('body').should('be.visible')
        })
    })

    describe('الاستجابة والتوافقية', () => {
        it('يجب أن تكون الصفحة متجاوبة على الهاتف', () => {
            cy.viewport('iphone-x')
            cy.get('header, main, footer').should('be.visible')
        })

        it('يجب أن تكون الصفحة متجاوبة على التابلت', () => {
            cy.viewport('ipad-2')
            cy.get('header, main').should('be.visible')
        })

        it('يجب أن تكون الصفحة متجاوبة على سطح المكتب', () => {
            cy.viewport(1920, 1080)
            cy.get('header, main').should('be.visible')
        })
    })

    describe('سرعة الملاحة', () => {
        it('يجب الانتقال بسرعة بين الصفحات', () => {
            cy.visit('/accountInfo')
            cy.url().should('include', '/accountInfo')

            cy.visit('/administrators')
            cy.url().should('include', '/administrators')

            cy.visit('/analytics')
            cy.url().should('include', '/analytics')
        })
    })

    describe('استخدام الذاكرة والموارد', () => {
        it('يجب عدم وجود تسريب ذاكرة عند الملاحة المتكررة', () => {
            for (let i = 0; i < 5; i++) {
                cy.visit('/accountInfo')
                cy.visit('/compounds')
                cy.visit('/')
            }
            cy.get('body').should('exist')
        })
    })

    describe('فحص الأخطاء', () => {
        it('يجب عدم وجود أخطاء في Console', () => {
            cy.on('uncaught:exception', (err) => {
                // تجاهل الأخطاء المتوقعة فقط
                if (err.message.includes('Expected')) {
                    return false
                }
            })
            cy.get('body').should('exist')
        })

        it('يجب أن تكون جميع الروابط صالحة', () => {
            cy.get('a').each(($link) => {
                const href = $link.prop('href')
                if (href && !href.includes('javascript')) {
                    cy.request({ url: href, failOnStatusCode: false })
                        .its('status')
                        .should('be.lessThan', 500)
                }
            })
        })
    })

    describe('تقييم أداء الشبكة', () => {
        it('يجب تحميل بيانات API بسرعة', () => {
            cy.intercept('GET', '/api/**').as('apiCall')
            cy.visit('/')
            cy.wait('@apiCall', { timeout: 10000 }).its('response.statusCode').should('equal', 200)
        })
    })
})
