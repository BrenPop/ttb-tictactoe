import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

const dom = new JSDOM(html, {
  resources: 'usable',
  runScripts: 'dangerously',
});

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
