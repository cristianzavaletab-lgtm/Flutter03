const { Pool } = require('pg');
const regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1', 'sa-east-1', 'ca-central-1'];
async function test() {
  for (const region of regions) {
    const connStr = `postgresql://postgres.zcgcwtbjkvznduwmsakc:60253405Cz%40@aws-0-${region}.pooler.supabase.com:6543/postgres`;
    const pool = new Pool({ connectionString: connStr, connectionTimeoutMillis: 3000 });
    try {
      await pool.query('SELECT 1');
      console.log('SUCCESS REGION:', region);
      pool.end();
      return;
    } catch (e) {
      console.log(region, e.message);
      pool.end();
    }
  }
}
test();
