const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\kunal\\.gemini\\antigravity\\brain\\1a78815d-d4a2-4027-b983-3aa77e3c3fba';
const destDir = 'd:\\Internship\\hpl\\public\\carousel';

console.log('Script started');
console.log('Checking source directory:', srcDir);
console.log('Source directory exists:', fs.existsSync(srcDir));

if (fs.existsSync(srcDir)) {
  const allFiles = fs.readdirSync(srcDir);
  console.log('Files in source:', allFiles.join(', '));
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created destination directory');
}

const files = [
  { src: 'carousel_warehouse_1775212224950.png', dest: 'warehouse.png' },
  { src: 'carousel_delivery_1775212243614.png', dest: 'delivery.png' },
  { src: 'carousel_lab_1775212262296.png', dest: 'lab.png' },
  { src: 'carousel_medicine_1775212292894.png', dest: 'medicine.png' },
  { src: 'carousel_logistics_1775212309626.png', dest: 'logistics.png' },
  { src: 'carousel_cold_chain_1775212327302.png', dest: 'cold-chain.png' },
  { src: 'carousel_worker_1775212353601.png', dest: 'worker.png' },
  { src: 'carousel_pharmacy_1775212371318.png', dest: 'pharmacy.png' },
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (!fs.existsSync(srcPath)) {
    console.error('MISSING SOURCE:', srcPath);
    return;
  }
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.dest}`);
  } catch (err) {
    console.error(`FAILED ${f.dest}:`, err.message);
  }
});
console.log('Script finished');
