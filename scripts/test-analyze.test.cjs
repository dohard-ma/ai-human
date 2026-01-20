// @ts-nocheck
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
// 使用 node-fetch 2.x 版本
const nodeFetch = require('node-fetch').default;

const TEST_IMAGES_DIR = path.join(__dirname, '../test-images');
const API_URL = 'http://localhost:3000/api/analyze';

/**
 * 测试图片解析
 * @param {string} imagePath 图片路径
 */
async function testImageAnalysis(imagePath) {
  try {
    const formData = new FormData();
    const imageStream = fs.createReadStream(imagePath);
    formData.append('image', imageStream);

    const response = await nodeFetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(`测试结果 - ${path.basename(imagePath)}:`);
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`测试失败 - ${path.basename(imagePath)}:`, error);
    return null;
  }
}

async function runTests() {
  // 确保测试图片目录存在
  if (!fs.existsSync(TEST_IMAGES_DIR)) {
    fs.mkdirSync(TEST_IMAGES_DIR, { recursive: true });
    console.log(`创建测试图片目录: ${TEST_IMAGES_DIR}`);
    console.log('请在该目录下放入测试图片');
    return;
  }

  const imageFiles = fs
    .readdirSync(TEST_IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log('没有找到测试图片，请在 test-images 目录下放入图片');
    return;
  }

  console.log(`找到 ${imageFiles.length} 个测试图片`);

  for (const imageFile of imageFiles) {
    const imagePath = path.join(TEST_IMAGES_DIR, imageFile);
    await testImageAnalysis(imagePath);
    console.log('-------------------');
  }
}

runTests().catch(console.error);
