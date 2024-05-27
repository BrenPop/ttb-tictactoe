const { test, expect } = require('@playwright/test');

test.describe('Tic Tac Toe Game', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('Initial game state', async ({ page }) => {
        const cells = await page.$$('.cell');
        for (let cell of cells) {
            expect(await cell.getAttribute('class')).toBe('cell');
        }
        expect(await page.isVisible('#resetButton')).toBe(true);
    });

    test('Gameplay: alternate turns and check classes', async ({ page }) => {
        const cells = await page.$$('.cell');
        await cells[0].click();
        expect(await cells[0].getAttribute('class')).toContain('x');
        
        await cells[1].click();
        expect(await cells[1].getAttribute('class')).toContain('o');
        
        await cells[2].click();
        expect(await cells[2].getAttribute('class')).toContain('x');
    });

    test('Win condition', async ({ page }) => {
        const cells = await page.$$('.cell');
        await cells[0].click();
        await cells[1].click();
        await cells[3].click();
        await cells[4].click();
        await cells[6].click();

        expect(await page.isVisible('.winning-message.show')).toBe(true);
        expect(await page.textContent('#winningMessageText')).toBe("X's Wins!");
    });

    test('Draw condition', async ({ page }) => {
        const cells = await page.$$('.cell');
        await cells[0].click(); // X
        await cells[1].click(); // O
        await cells[2].click(); // X
        await cells[4].click(); // O
        await cells[3].click(); // X
        await cells[5].click(); // O
        await cells[7].click(); // X
        await cells[6].click(); // O
        await cells[8].click(); // X

        expect(await page.isVisible('.winning-message.show')).toBe(true);
        expect(await page.textContent('#winningMessageText')).toBe("Draw!");
    });

    test('Reset game', async ({ page }) => {
        const cells = await page.$$('.cell');
        await cells[0].click();
        expect(await cells[0].getAttribute('class')).toContain('x');

        await page.click('#resetButton');
        for (let cell of cells) {
            expect(await cell.getAttribute('class')).toBe('cell');
        }
        expect(await page.isVisible('.winning-message.show')).toBe(false);
    });

});
