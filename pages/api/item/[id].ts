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
    const deletedItemId = await db.item.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: 'Item deleted successfully', deletedItemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
}
