// // console.log(search_query.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))

// import { NextApiRequest, NextApiResponse } from 'next'
// import { Db } from 'mongodb'
// import { withMongo } from '@/lib/mongodb'
// import { DataProps, ResponseData } from '@/lib/db-types'
// import { initialPaginate, paginate } from '@/utility/paginate/paginate'
// import { DisplayData } from '@/lib/types'

// import { data } from '@/assets/data'

// export type ReponseProps = {
//   out: DisplayData[]
//   paginate: {
//     total: number
//     perPage: number
//     currentPage: number
//   }
// }

// const handler = async (req, res) => {
//   const { query, method } = req

//   switch (method) {
//     case 'GET':
//       try {
//         // const ayahs = await withMongo(async (db: Db) => {
//         //   const collection = db.collection<DataProps>('qurans')
//         //   return await collection.find().toArray()
//         // })
//         const out = data.map((ayah) => ({
//           ...ayah,
//           content_latinized: ayah.content
//             .normalize('NFD')
//             .replace(/[\u0300-\u036f]/g, ''),
//         }))

//         // const insert = await withMongo(async (db: Db) => {
//         //   const collection = db.collection<any>('quranaz')
//         //   await collection.insertMany(out)
//         // })
//         // console.log(data)

//         return res.json({
//           out,
//         })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }
// export default handler
