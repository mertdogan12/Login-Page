const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/authServer/",
    createProxyMiddleware({
      target: "http://192.168.178.27:5000/",
      changeOrigin: true,
    })
  );
};
