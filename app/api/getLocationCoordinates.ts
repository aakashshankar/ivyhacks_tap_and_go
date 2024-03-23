// app/api/getLocationCoordinates.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_ACCESS_TOKEN! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { locations } = req.body;

    try {
      const coordinates: { [key: string]: [[number, number]] } = {};

      for (const day in locations) {
        const dayLocations = locations[day];
        const dayCoordinates = await Promise.all(
          dayLocations.map(async (location: string) => {
            const response = await geocodingClient.forwardGeocode({ query: location, limit: 1 }).send();
            const feature = response.body.features[0];
            return feature.geometry.coordinates;
          })
        );
        coordinates[day] = dayCoordinates!;
      }

      res.status(200).json({ coordinates });
    } catch (error) {
      console.error('Error getting location coordinates:', error);
      res.status(500).json({ error: 'Failed to get location coordinates' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}