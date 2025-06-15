const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy ไปยัง service A (port 8080)
  app.use(
    '/api/serviceA',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api/serviceA': '', // ลบ prefix /api/serviceA ก่อนส่งไปยัง backend
      },
    })
  );

  // Proxy ไปยัง service B (port 8081)
  app.use(
    '/api/serviceB',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: {
        '^/api/serviceB': '', // ลบ prefix /api/serviceB ก่อนส่งไปยัง backend
      },
    })
  );
};