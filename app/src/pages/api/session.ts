import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { request } from '@/utils';

const API_ENDPOINT = process.env.API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `POST`) {
    let token = ``;
    try {
      await request
        .post(`${API_ENDPOINT}/session`, req.body)
        .then((response) => {
          // eslint-disable-next-line no-underscore-dangle
          token = cookie.parse(response.headers[`set-cookie`][0])._senti_key;
          return response.data;
        })
        .then((response) => {
          res.setHeader(
            `Set-Cookie`,
            cookie.serialize(`_senti_key`, token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== `development`,
              sameSite: `lax`,
              maxAge: 2592000,
              path: `/`,
            }),
          );

          res.json(response);
        });

      res.status(200).end();
    } catch (error) {
      res.status(403).json({});
    }
  } else if (req.method === `DELETE`) {
    request.delete(`${API_ENDPOINT}/session`);
    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`_senti_key`, ``, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== `development`,
        maxAge: 0,
        path: `/`,
      }),
    );
    res.status(204).end();
  }
}
