import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';
import { beforeEach, describe, expect, it } from 'vitest';

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

describe('Tic Tac Toe Game', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {
      resources: 'usable',
      runScripts: 'dangerously',
    });
    document = dom.window.document;
  });

  it('should have an empty board initially', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      expect(cell.className).toBe('cell');
    });
    const resetButton = document.getElementById('resetButton');
    expect(resetButton).toBeTruthy();
  });

  it('should alternate turns and check classes', () => {
    const cells = document.querySelectorAll('.cell');
    cells[0].click();
    expect(cells[0].classList.contains('x')).toBe(true);

    cells[1].click();
    expect(cells[1].classList.contains('o')).toBe(true);

    cells[2].click();
    expect(cells[2].classList.contains('x')).toBe(true);
  });

  it('should detect a win condition', () => {
    const cells = document.querySelectorAll('.cell');
    cells[0].click(); // X
    cells[1].click(); // O
    cells[3].click(); // X
    cells[4].click(); // O
    cells[6].click(); // X

    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageText = document.getElementById('winningMessageText');
    expect(winningMessageElement.classList.contains('show')).toBe(true);
    expect(winningMessageText.textContent).toBe("X's Wins!");
  });

  it('should detect a draw condition', () => {
    const cells = document.querySelectorAll('.cell');
    cells[0].click(); // X
    cells[1].click(); // O
    cells[2].click(); // X
    cells[4].click(); // O
    cells[3].click(); // X
    cells[5].click(); // O
    cells[7].click(); // X
    cells[6].click(); // O
    cells[8].click(); // X

    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageText = document.getElementById('winningMessageText');
    expect(winningMessageElement.classList.contains('show')).toBe(true);
    expect(winningMessageText.textContent).toBe("Draw!");
  });

  it('should reset the game board', () => {
    const cells = document.querySelectorAll('.cell');
    cells[0].click();
    expect(cells[0].classList.contains('x')).toBe(true);

    const resetButton = document.getElementById('resetButton');
    resetButton.click();
    
    cells.forEach((cell) => {
      expect(cell.className).toBe('cell');
    });

    const winningMessageElement = document.getElementById('winningMessage');
    expect(winningMessageElement.classList.contains('show')).toBe(false);
  });
});
