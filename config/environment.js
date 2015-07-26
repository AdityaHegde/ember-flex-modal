'use strict';

module.exports = function(environment/* , appConfig */) {
  environment.contentSecurityPolicy = {
    "style-src" : "'self' 'unsafe-inline'",
  };
  return {};
};
