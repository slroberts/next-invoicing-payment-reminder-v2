import { createWriteStream, readFileSync } from 'fs';
import { join } from 'path';
import PDFDocument from 'pdfkit';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
import { db } from '@/lib/db';
import ejs from 'ejs';
import { resolve } from 'path';

export default async function handler(
  req: { body: { data: any; content: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) {
  const { data, content } = req.body;

  // Create a new PDF document
  const doc = new PDFDocument();
  const filePath = join(
    process.cwd(),
    'tmp',
    `invoice-${content.invoice.id}.pdf`
  );
  const stream = doc.pipe(createWriteStream(filePath));

  // Add content to the PDF
  doc.fontSize(8);
  doc.text('From', 24, 24);
  doc.fontSize(10);
  doc
    .text(`${data.user.firstName} ${data.user.lastName}`, 24, 36)
    .text(`${data.user.email}`, 224, 36);

  doc.fontSize(8);
  doc.text('Billed To', 24, 72);
  doc.fontSize(10);
  doc.text(`${data.client.name}`, 24, 84);
  doc
    .text(`${data.client.address}`, 24, 96)
    .text(`${data.client.email}`, 224, 96)
    .text(`${data.client.phoneNumber}`, 424, 96);

  doc.fontSize(8);
  doc.text('Invoice Details', 24, 132);
  doc.fontSize(10);
  doc
    .text(`Invoice Id: ${content.invoice.id}`, 24, 144)
    .text(`Due by: ${content.invoice.due}`, 284, 144);

  doc.moveDown();
  doc.fontSize(8);
  doc
    .text('Item Name', 24, 180)
    .text('Price', 224, 180)
    .text('Hours', 424, 180);

  doc.fontSize(10);
  content.items.map((item: { price: any; hours: any; name: string }) => {
    let y = 0;
    let yPos = doc.y;
    doc
      .text(item.name, 24, (y = yPos + 8))
      .text(item.price, 224, (y = yPos + 8))
      .text(item.hours, 424, (y = yPos + 8));
  });

  doc.moveDown();
  doc
    .text('Sub Total', 24, 264)
    .text(`$${content.subTotal}`, 424, 264)
    .text('Tax (4%)', 24, 280)
    .text(`$${content.salesTax}`, 424, 280)
    .text('Total', 24, 296)
    .text(`$${content.total}`, 424, 296);

  // Finalize the PDF and close the stream
  doc.end();

  await new Promise((resolve) => stream.on('finish', resolve));

  const FROM_EMAIL = 'shomariroberts@gmail.com';

  const invoiceEmailTemplate = readFileSync(
    resolve(process.cwd(), './emails/InvoiceEmail.ejs'),
    'utf-8'
  );

  const html = ejs.render(invoiceEmailTemplate, {
    userName: `${data.user.firstName} ${data.user.lastName}`,
    userEmail: data.user.email,
    clientName: data.client.name,
    clientAddress: data.client.address,
    clientEmail: data.client.email,
    clientPhoneNumber: data.client.phoneNumber,
    invoiceId: content.invoice.id,
    invoiceDue: content.invoice.due,
    items: content.items,
    subTotal: content.subTotal,
    salesTax: content.salesTax,
    total: content.total,
  });

  const msg = {
    to: `${data.client.email}`,
    from: FROM_EMAIL,
    subject: `New Invoice - ${content.invoice.id}`,
    text: `Please find New Invoice - ${content.invoice.id} attached PDF document.`,
    html: html,
    attachments: [
      {
        content: readFileSync(filePath).toString('base64'),
        filename: `invoice-${content.invoice.id}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };

  async function updateInvoiceStatus(invoiceId: string, invoiceStatus: any) {
    await db.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: invoiceStatus,
      },
    });
  }

  try {
    // Send the email using the SendGrid API
    await sgMail.send(msg);
    await updateInvoiceStatus(content.invoice.id, 'SENT');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
