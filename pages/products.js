import Link from "next/link";
import Image from 'next/image'
import connectMongo from "../utils/connectMongo";
import Products from "../models/Products";
const Product = ({ products }) => (

  <div className="bg-white">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8">
        {products.map((product) => (
          <a key={product.id} href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <Image src={product.image_url} alt={product.image_alt} className="h-full w-full object-cover object-center group-hover:opacity-75" width={700} height={700}></Image>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">{product.name}</h3>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {product.description}
            </div>
            <br />
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${product._id}/edit`}>
                <button className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                  Edit
                </button>
              </Link>
              <Link href="/[id]" as={`/${product._id}`}>
                <button className="text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                  View
                </button>
              </Link>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>

);

/* Retrieves product(s) data from mongodb database 
export async function getServerSideProps() {
  await connectMongo()

  /* find all the data in our database
  const result = await Products.find({})
  const products = result.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })

  return { props: { products: products } }
}*/

/* Retrieves product(s) data from mongodb database */
export async function getStaticProps() {
  await connectMongo();

  /* find all the data in our database */
  const result = await Products.find({});
  const products = result.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    return product;
  });

  return { props: { products: products } };
}

export default Product;
