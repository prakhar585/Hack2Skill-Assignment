import { generateLargeDataset } from "./dataGenerator";

const products = generateLargeDataset();
const totalProducts = products.length;
const totalRevenue = products.reduce((acc, curr)=>{
    return acc + curr.price;
},0)

console.log(totalRevenue);
let lowItems = 0;
const lowStockItems = products.map((item)=>{
    if(item.stock <= 10){
        lowItems += 1;
    }
})

console.log(lowItems);

export  {products, totalProducts, totalRevenue, lowItems} 