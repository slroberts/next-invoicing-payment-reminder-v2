import { db } from '@/lib/db';

export default async function handleDeleteRequest(
  req: {
    query: { id: string };
  },
  res: {
    status: any;
    json: (arg0: { message: string }) => void;
  }
) {
  const { id } = req.query;

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
