// app/api/getRoutes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';

const directionsClient = mbxDirections({ accessToken: process.env.MAPBOX_ACCESS_TOKEN! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { coordinates } = req.body;

    try {
      const routes: { [key: string]: any } = {};

      for (const day in coordinates) {
        const dayCoordinates = coordinates[day];
        const response = await directionsClient.getDirections({
          profile: 'driving',
          waypoints: dayCoordinates.map((coord: number[]) => ({ coordinates: coord })),
          geometries: 'geojson',
        }).send();

        const route = response.body.routes[0].geometry;
        routes[day] = route;
      }

      res.status(200).json({ routes });
    } catch (error) {
      console.error('Error getting routes:', error);
      res.status(500).json({ error: 'Failed to get routes' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}