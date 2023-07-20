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
    const deletedInvoiceId = await db.invoice.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: 'Invoice deleted successfully', deletedInvoiceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting invoice' });
  }
}
