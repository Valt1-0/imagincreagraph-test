import connectMongo from '../../../utils/connectMongo'
import Products from '../../../models/Products'

export default async function handler(req, res) {
  const { method } = req

  await connectMongo()

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const products = await Products.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
