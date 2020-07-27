const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(createProxyMiddleware("/auth/", { target: "http://localhost:5000/" }));
  app.use(createProxyMiddleware("/api/", { target: "http://localhost:5000/" }));
 // app.use(createProxyMiddleware("/comment/", { target: "http://localhost:5000/" }));
 // app.use(createProxyMiddleware("/product/", { target: "http://localhost:5000/" }));
};