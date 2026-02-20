import { createServer } from './index';

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => {
  console.log('🚀 Smart Government Scheme Backend');
  console.log('='.repeat(50));
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📚 Schemes: http://localhost:${PORT}/api/schemes`);
  console.log('='.repeat(50));
});
