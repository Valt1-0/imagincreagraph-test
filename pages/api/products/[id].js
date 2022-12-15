import connectMongo from "../../../utils/connectMongo"
import Products from "../../../models/Products"

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await connectMongo()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const product = await Products.findById(id)
        if (!product) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const product = await Products.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!product) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedProduct = await Products.deleteOne({ _id: id })
        if (!deletedProduct) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
