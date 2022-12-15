import Form from '../components/Form'

const NewProduct = () => {
  const productForm = {
    name: '',
    image_url: '',
    description: '',
    image_alt: ''
  }

  return <Form formId="add-product-form" productForm={productForm} />
}

export default NewProduct