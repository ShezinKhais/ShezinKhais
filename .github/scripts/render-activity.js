// Renders the contribution activity chart as two static SVGs, one per colour
// scheme, from the calendar GitHub's own GraphQL API returns.
//
// This used to be an <img> pointing at github-readme-activity-graph on Vercel.
// That deployment went to 402 Payment required / DEPLOYMENT_DISABLED, so the
// image stopped rendering for everyone and there was nothing to be done about
// it from this side. It is the second time a third-party README widget has died
// here. Drawing it in the repo means it renders for as long as the repo exists.
//
// Usage: node .github/scripts/render-activity.js calendar.json

const fs = require('fs');

const W = 760, H = 190;
const PAD = { l: 44, r: 10, t: 24, b: 26 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;
const MEAN_WINDOW = 7;

const THEMES = {
  light: { ink: '#1f2328', muted: '#57606a', rule: '#d1d9e0', accent: '#0969da' },
  dark:  { ink: '#e6edf3', muted: '#8b949e', rule: '#30363d', accent: '#58a6ff' },
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';

// A gridline reading "40" is worth more than one reading "36.4", so the top of
// the scale is rounded out to something a person would have chosen. The ladder
// is deliberately fine-grained: with only [1,2,2.5,5,10] a busiest day of 52
// rounded to 100 and threw away half the plot height.
function niceCeil(v) {
  if (v <= 5) return 5;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  for (const step of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    const candidate = step * mag;
    if (candidate >= v) return candidate;
  }
  return 10 * mag;
}

function trailingMean(values, window) {
  const out = [];
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= window) sum -= values[i - window];
    out.push(sum / Math.min(i + 1, window));
  }
  return out;
}

function render(days, total, theme) {
  const c = THEMES[theme];
  const counts = days.map(d => d.count);
  const top = niceCeil(Math.max(1, ...counts));
  const mean = trailingMean(counts, MEAN_WINDOW);

  const x = i => PAD.l + (days.length < 2 ? 0 : i * PLOT_W / (days.length - 1));
  const y = v => PAD.t + PLOT_H - Math.min(v, top) / top * PLOT_H;
  const n = (v) => Math.round(v * 10) / 10;

  const parts = [];
  const put = (s) => parts.push(s);

  // horizontal rules, at zero and at the top of the scale
  for (const v of [0, top / 2, top]) {
    put(`<line x1="${PAD.l}" y1="${n(y(v))}" x2="${n(W - PAD.r)}" y2="${n(y(v))}" `
      + `stroke="${c.rule}" stroke-width="1" />`);
    put(`<text x="${PAD.l - 8}" y="${n(y(v) + 3.5)}" text-anchor="end" `
      + `font-family="${MONO}" font-size="9" fill="${c.muted}">${Math.round(v)}</text>`);
  }

  // month boundaries, labelled where there is room for the label
  days.forEach((d, i) => {
    if (d.date.slice(8) !== '01') return;
    const px = x(i);
    if (px > W - PAD.r - 22) return;
    put(`<line x1="${n(px)}" y1="${PAD.t}" x2="${n(px)}" y2="${n(PAD.t + PLOT_H)}" `
      + `stroke="${c.rule}" stroke-width="1" opacity=".55" />`);
    put(`<text x="${n(px)}" y="${H - 9}" text-anchor="middle" font-family="${MONO}" `
      + `font-size="9" fill="${c.muted}">${MONTHS[Number(d.date.slice(5, 7)) - 1]}</text>`);
  });

  // the day-by-day figure as an area, quiet enough to read as texture
  const area = days.map((d, i) => `${n(x(i))},${n(y(d.count))}`).join(' ');
  put(`<polygon points="${n(PAD.l)},${n(y(0))} ${area} ${n(x(days.length - 1))},${n(y(0))}" `
    + `fill="${c.accent}" fill-opacity=".16" />`);
  put(`<polyline points="${area}" fill="none" stroke="${c.accent}" stroke-opacity=".42" `
    + `stroke-width="1" stroke-linejoin="round" />`);

  // and the seven-day mean over the top, which is the line you can actually read
  const trend = mean.map((v, i) => `${n(x(i))},${n(y(v))}`).join(' ');
  put(`<polyline points="${trend}" fill="none" stroke="${c.accent}" stroke-width="2" `
    + `stroke-linejoin="round" stroke-linecap="round" />`);

  put(`<text x="${PAD.l}" y="15" font-family="${MONO}" font-size="11" fill="${c.ink}">`
    + `${total} contributions in the last year</text>`);
  put(`<text x="${n(W - PAD.r)}" y="15" text-anchor="end" font-family="${MONO}" `
    + `font-size="9" fill="${c.muted}">daily, with a ${MEAN_WINDOW}-day mean</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" `
    + `viewBox="0 0 ${W} ${H}" role="img" `
    + `aria-label="${total} contributions in the last year">\n  `
    + parts.join('\n  ') + '\n</svg>\n';
}

const src = JSON.parse(fs.readFileSync(process.argv[2] || 'calendar.json', 'utf8'));
const cal = src.data.user.contributionsCollection.contributionCalendar;
const days = cal.weeks.flatMap(w => w.contributionDays)
                     .map(d => ({ date: d.date, count: d.contributionCount }));

if (days.length < 30) {
  console.error(`only ${days.length} days came back; refusing to draw a year from that`);
  process.exit(1);
}

for (const theme of ['light', 'dark']) {
  const file = `assets/activity-${theme}.svg`;
  fs.writeFileSync(file, render(days, cal.totalContributions, theme));
  console.log(`wrote ${file}`);
}
console.log(`${days.length} days, ${cal.totalContributions} contributions, `
  + `busiest day ${Math.max(...days.map(d => d.count))}`);
