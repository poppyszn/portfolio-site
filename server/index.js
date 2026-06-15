const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register, prefix: 'portfolio_node_' });

const pageViews = new client.Counter({
  name: 'portfolio_page_views_total',
  help: 'Total page views',
  registers: [register],
});

const sectionViews = new client.Counter({
  name: 'portfolio_section_views_total',
  help: 'Section views broken down by section name',
  labelNames: ['section'],
  registers: [register],
});

const ctaClicks = new client.Counter({
  name: 'portfolio_cta_clicks_total',
  help: 'CTA and link click events',
  labelNames: ['label'],
  registers: [register],
});

const contactForms = new client.Counter({
  name: 'portfolio_contact_form_submitted_total',
  help: 'Contact form submissions',
  registers: [register],
});

app.use(express.json({ type: ['application/json', 'text/plain'] }));

app.post('/event', (req, res) => {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.sendStatus(400); }
  }

  const { type, label, section } = body || {};

  switch (type) {
    case 'page_view':
      pageViews.inc();
      break;
    case 'section_view':
      if (section) sectionViews.labels(section).inc();
      break;
    case 'cta_click':
      if (label) ctaClicks.labels(label).inc();
      break;
    case 'contact_form':
      contactForms.inc();
      break;
    default:
      return res.sendStatus(400);
  }

  res.sendStatus(204);
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/healthz', (_req, res) => res.sendStatus(200));

app.listen(3001, '0.0.0.0', () => {
  console.log('metrics server :3001');
});
