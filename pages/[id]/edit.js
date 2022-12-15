import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditProduct = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!product) return <p>Loading...</p>

  const productForm = {
    name: product.name,
    image_url: product.image_url,
    image_alt: product.image_alt,
    description: product.description,
  }

  return <Form formId="edit-product-form" productForm={productForm} forNewProduct={false} />
}

export default EditProduct
