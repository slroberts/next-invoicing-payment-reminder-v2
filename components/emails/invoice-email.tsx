export interface InvoiceEmailProps {
  userId: string;
  userName: string;
  userEmail: string;
  clientId: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhoneNumber: string;
  invoiceId: string;
  invoiceDue: string;
  items: any[];
  subTotal: number;
  salesTax: number;
  total: number;
  stripeAccountId: string;
}

export const InvoiceEmail: React.FC<Readonly<InvoiceEmailProps>> = ({
  userId,
  userName,
  userEmail,
  clientId,
  clientName,
  clientEmail,
  clientAddress,
  clientPhoneNumber,
  invoiceId,
  invoiceDue,
  items,
  subTotal,
  salesTax,
  total,
  stripeAccountId,
}) => {
  return (
    <div>
      <div>
        <div>
          <h3>Hello {clientName},</h3>
          <p>You have a new invoice from {userName}.</p>
        </div>
        <div>
          <p>From</p>
          <table>
            <tr>
              <td>{userName}</td>
              <td>{userEmail}</td>
            </tr>
          </table>

          <p>Billed To</p>
          <table>
            <tr>
              <td>{clientName}</td>
            </tr>
            <tr>
              <td>{clientAddress}</td>
            </tr>
            <tr>
              <td>{clientEmail}</td>
            </tr>
            <tr>
              <td>{clientPhoneNumber}</td>
            </tr>
          </table>

          <p>Invoice Details</p>
          <table>
            <tr>
              <td>
                Invoice Id: <span>{invoiceId}</span>
              </td>
            </tr>
            <tr>
              <td>
                Date due: <span>{invoiceDue}</span>
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <tr>
              <td>Subtotal:</td>
              <td>${subTotal}</td>
            </tr>
            <tr>
              <td>Tax:</td>
              <td>${salesTax}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>${total}</td>
            </tr>
          </table>

          <a
            href={`http://localhost:3000/pay?stripeAccountId=${stripeAccountId}&userId=${userId}&clientId=${clientId}&invoiceId=${invoiceId}&total=${total}`}
          >
            Pay Invoice
          </a>
        </div>
      </div>
    </div>
  );
};
