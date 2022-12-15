import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import connectMongo from '../../utils/connectMongo'
import Products from '../../models/Products'

/* Allows you to view pet card info and delete pet card*/
const ProductPage = ({ product }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const productID = router.query.id

    try {
      await fetch(`/api/product/${productID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  return (
    <div key={product._id}>
      <div className="card">
        <img src={product.image_url} />
        <h5 className="pet-name">{product.name}</h5>
        <div className="main-content">
          <p className="pet-name">{product.name}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${product._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await connectMongo()

  const product = await Products.findById(params.id).lean()
  product._id = product._id.toString()

  return { props: { product } }
}

export default ProductPage
