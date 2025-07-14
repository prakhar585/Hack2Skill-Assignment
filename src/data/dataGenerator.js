// Efficient Mock Data Generator using Maps and Sets
// Optimized for generating 1000+ product records

export const categories = new Map([
  [0, "Electronics"],
  [1, "Clothing"],
  [2, "Books"],
  [3, "Home & Garden"],
  [4, "Sports & Outdoors"],
  [5, "Beauty & Personal Care"],
  [6, "Toys & Games"],
  [7, "Automotive"],
  [8, "Health & Wellness"],
  [9, "Food & Beverages"],
]);

const generateMockProducts = (count = 1000) => {
  // Pre-create reference data using Maps for O(1) access

  const statuses = new Map([
    [0, "Active"],
    [1, "Inactive"],
    [2, "Discontinued"],
    [3, "Out of Stock"],
  ]);

  // Product name components for efficient random generation
  const adjectives = [
    "Premium",
    "Deluxe",
    "Professional",
    "Ultra",
    "Advanced",
    "Smart",
    "Eco",
    "Compact",
    "Portable",
    "Wireless",
    "Digital",
    "Classic",
    "Modern",
    "Luxury",
    "Essential",
    "Heavy-duty",
    "Lightweight",
    "Durable",
    "Flexible",
    "Innovative",
  ];

  const baseNames = [
    "Headphones",
    "Smartphone",
    "Laptop",
    "Tablet",
    "Camera",
    "Speaker",
    "Watch",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Printer",
    "Router",
    "Charger",
    "Cable",
    "Backpack",
    "Jacket",
    "Shoes",
    "Shirt",
    "Pants",
    "Hat",
    "Sunglasses",
    "Book",
    "Magazine",
    "Notebook",
    "Pen",
    "Pencil",
    "Marker",
    "Highlighter",
    "Chair",
    "Table",
    "Lamp",
    "Pillow",
    "Blanket",
    "Towel",
    "Mug",
    "Plate",
    "Bottle",
    "Bag",
    "Box",
    "Tool",
    "Kit",
    "Set",
    "Pack",
    "Bundle",
  ];

  // Use Set for tracking unique IDs (O(1) lookup)
  const usedIds = new Set();
  const products = [];

  // Pre-calculate category and status counts for efficient modulo operations
  const categoryCount = categories.size;
  const statusCount = statuses.size;
  const adjectiveCount = adjectives.length;
  const baseNameCount = baseNames.length;

  // Generate products efficiently
  for (let i = 0; i < count; i++) {
    // Generate unique ID efficiently
    let id = i + 1;
    // do {
    //   id = Math.floor(Math.random() * 100000) + 1;
    // } while (usedIds.has(id));
    // usedIds.add(id);

    // Efficient random selections using pre-calculated counts
    const categoryIndex = Math.floor(Math.random() * categoryCount);
    const statusIndex = Math.floor(Math.random() * statusCount);
    const adjectiveIndex = Math.floor(Math.random() * adjectiveCount);
    const baseNameIndex = Math.floor(Math.random() * baseNameCount);

    // Generate realistic price based on category
    let basePrice;
    const category = categories.get(categoryIndex);
    switch (category) {
      case "Electronics":
        basePrice = Math.random() * 2000 + 50; // $50-$2050
        break;
      case "Clothing":
        basePrice = Math.random() * 200 + 20; // $20-$220
        break;
      case "Books":
        basePrice = Math.random() * 50 + 10; // $10-$60
        break;
      case "Home & Garden":
        basePrice = Math.random() * 500 + 25; // $25-$525
        break;
      default:
        basePrice = Math.random() * 300 + 15; // $15-$315
    }

    // Generate stock level with realistic distribution
    let stock;
    const stockRandom = Math.random();
    if (stockRandom < 0.1) stock = 0; // 10% out of stock
    else if (stockRandom < 0.3)
      stock = Math.floor(Math.random() * 5) + 1; // 20% low stock
    else if (stockRandom < 0.8)
      stock = Math.floor(Math.random() * 45) + 5; // 50% medium stock
    else stock = Math.floor(Math.random() * 200) + 50; // 20% high stock

    // Adjust status based on stock
    let finalStatus = statuses.get(statusIndex);
    if (stock === 0) finalStatus = "Out of Stock";

    // Create product object with optimized structure
    const product = {
      id,
      image: `https://picsum.photos/200/200?random=${id}`,
      name: `${adjectives[adjectiveIndex]} ${baseNames[baseNameIndex]}`,
      category: category,
      price: Math.round(basePrice * 100) / 100, // Round to 2 decimal places
      stock,
      status: finalStatus,
      // Additional fields for enhanced functionality
      description: `High-quality ${baseNames[
        baseNameIndex
      ].toLowerCase()} perfect for everyday use`,
      sku: `SKU-${String(id).padStart(6, "0")}`,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(product);
  }

  return products;
};

// Export different dataset sizes for testing
export const generateSmallDataset = () => generateMockProducts(50);
export const generateMediumDataset = () => generateMockProducts(250);
export const generateLargeDataset = () => generateMockProducts(1000);
export const generateXLDataset = () => generateMockProducts(2500);

export const categorySize = categories.size;
// Export the main generator function
export default generateMockProducts;

// Performance testing function
export const benchmarkDataGeneration = (count = 1000) => {
  console.time(`Generating ${count} products`);
  const products = generateMockProducts(count);
  console.timeEnd(`Generating ${count} products`);

  console.log(`✅ Generated ${products.length} products`);
  console.log(
    `📊 Memory usage: ~${Math.round(JSON.stringify(products).length / 1024)} KB`
  );
  console.log(`🔍 Sample product:`, products[0]);

  return products;
};

// Usage examples:
// const products = generateMockProducts(1000);
// const testData = generateSmallDataset();
// benchmarkDataGeneration(1000);
