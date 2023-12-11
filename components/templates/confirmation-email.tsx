import { InvoiceEmailProps } from '@/lib/interfaces/interfaces';

export const ConfirmationEmail: React.FC<Readonly<InvoiceEmailProps>> = ({
  userName,
  userEmail,
  clientName,
  clientEmail,
  clientAddress,
  clientPhoneNumber,
  invoiceId,
  invoiceDue,
  paymentStatus,
  items,
  subTotal,
  salesTax,
  total,
}) => {
  return (
    <div>
      <section>
        <h3>Hello {clientName},</h3>
        <p>Here is your payment confirmation.</p>
      </section>

      <section style={{ width: '80%', margin: '0 auto' }}>
        <p style={{ fontWeight: 700 }}>From</p>
        <address>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td
                style={{
                  width: '52%',
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {userName}
              </td>
              <td
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {userEmail}
              </td>
            </tr>
          </table>
        </address>

        <p style={{ fontWeight: 700, marginTop: '24px' }}>Billed To</p>
        <address>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {clientName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {clientAddress}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {clientEmail}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                }}
              >
                {clientPhoneNumber}
              </td>
            </tr>
          </table>
        </address>

        <p style={{ fontWeight: 700, marginTop: '24px' }}>Invoice Details</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td
              style={{
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
              }}
            >
              Invoice Id: <span style={{ fontWeight: 700 }}>{invoiceId}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
              }}
            >
              Date due: <span style={{ fontWeight: 700 }}>{invoiceDue}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
              }}
            >
              Payment Status:{' '}
              <span style={{ fontWeight: 700 }}>
                {paymentStatus === 'PAID' ? 'Paid' : 'Not Paid'}
              </span>
            </td>
          </tr>
        </table>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '24px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: '52%',
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                Item Name
              </th>
              <th
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: '1px solid rgb(193, 199, 213)',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    width: '52%',
                    border: '1px solid rgb(193, 199, 213)',
                    padding: '10px',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    border: '1px solid rgb(193, 199, 213)',
                    padding: '10px',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.price}
                </td>
                <td
                  style={{
                    border: '1px solid rgb(193, 199, 213)',
                    padding: '10px',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <tr>
            <td
              style={{
                width: '74.8%',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              Subtotal:
            </td>
            <td
              style={{
                textAlign: 'right',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              ${subTotal}
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: '74.8%',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              Tax:
            </td>
            <td
              style={{
                textAlign: 'right',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              ${salesTax}
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: '74.8%',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              Total:
            </td>
            <td
              style={{
                textAlign: 'right',
                border: '1px solid rgb(193, 199, 213)',
                padding: '10px',
                fontWeight: 700,
              }}
            >
              ${total}
            </td>
          </tr>
        </table>
      </section>
    </div>
  );
};
