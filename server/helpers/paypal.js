const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AVBc2rAjmmeF6-IDd2c-n5AuyOm9anDaI7SPJRfMagIJrFcfo1qz_vmQLdphI7vdf9YZLcwRXDoQY-rZ",
  client_secret:
    "EFCTmUgeholOtUN-sIszfoX_C9ixamUvd8YhEXotnfQNGI99Ryg6Z5dw2CxP7HH7eAvhgBiplxUV648Q",
});

module.exports = paypal;
