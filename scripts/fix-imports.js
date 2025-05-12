
#!/usr/bin/env node

/**
 * This script fixes common import issues in the codebase
 */

const fs = require('fs');
const path = require('path');

// Find all TypeScript files
function findTsFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }

  try {
    const files = fs.readdirSync(dir);
    const result = [];
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          result.push(...findTsFiles(filePath));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          result.push(filePath);
        }
      } catch (err) {
        console.warn(`Error processing ${filePath}: ${err.message}`);
      }
    }
    
    return result;
  } catch (err) {
    console.warn(`Error reading directory ${dir}: ${err.message}`);
    return [];
  }
}

// Update imports in a file
function updateImports(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace direct lucide-react imports with our polyfill
    const updatedContent = content.replace(
      /from ['"]lucide-react['"]/g, 
      "from '@/utils/icon-polyfill'"
    );
    
    // Only write if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated imports in ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    return false;
  }
}

// Main execution
console.log('🔍 Finding TypeScript files...');
try {
  const srcDir = path.resolve(__dirname, '../src');
  console.log(`Looking for TypeScript files in: ${srcDir}`);
  const files = findTsFiles(srcDir);
  console.log(`📁 Found ${files.length} TypeScript files`);

  let updatedCount = 0;
  for (const file of files) {
    if (updateImports(file)) {
      updatedCount++;
    }
  }

  console.log(`\n✨ Done! Updated imports in ${updatedCount} files`);
} catch (err) {
  console.error('❌ Error during import fixing process:', err);
}
