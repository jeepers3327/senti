import { request } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `POST`) {
    await request
      .post(`/presentations`, req.body, {
        headers: { cookie: req.headers.cookie },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        throw error;
      });
    res.status(200).end();
  }
}
