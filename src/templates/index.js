const contactForm = require('./contact_form');

const templates = {
  contact_form: contactForm,
};

function renderTemplate(name, data) {
  const fn = templates[name];
  if (!fn) throw new Error(`Unknown template: ${name}`);
  return fn(data);
}

module.exports = { renderTemplate };
