import { db } from '@/lib/db';

export default async function handleClientRequest(
  req: {
    method: string;
    body: any;
    query: { id: string };
  },
  res: {
    status: any;
    json: (arg0: { message: string; [key: string]: any }) => void;
  }
) {
  const { id } = req.query;

  // Handle DELETE request
  if (req.method === 'DELETE') {
    try {
      const deletedClientId = await db.client.delete({
        where: { id },
      });

      res
        .status(200)
        .json({ message: 'Client deleted successfully', deletedClientId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting client' });
    }
  }
  // Handle PUT request for updating client data
  else if (req.method === 'PUT') {
    const { name, address, email, phoneNumber } = req.body;

    try {
      const updatedClient = await db.client.update({
        where: { id },
        data: {
          name,
          address,
          email,
          phoneNumber,
        },
      });

      res
        .status(200)
        .json({ message: 'Client updated successfully', updatedClient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating client' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
