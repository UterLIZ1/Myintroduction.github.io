# UterLIZ payment records + chat file sharing

## Payment system (gateway not connected yet)

This version records payment requests and customer references in Firestore. It does **not** collect, hold, or transfer real money. Do not tell customers that a payment is accepted until a real payment method is configured and the money is actually received.

### Workflow
1. Admin opens an order chat and selects **REQUEST PAYMENT**.
2. Admin enters an amount and a milestone/revision description. Each request creates a separate payment card, so the same order can have multiple requests.
3. Customer sees the amount and request details. While collection is disabled, the card clearly says not to send money without a verified payment method.
4. After a real payment method is available, the customer can submit a transaction reference. The request becomes **submitted**.
5. Admin checks the actual incoming payment, then chooses **VERIFY PAYMENT** or **REJECT REFERENCE**.
6. Only admin can mark a request verified. A reference or screenshot alone is not proof of payment.

### Payment statuses
- `pending`: request created; no payment confirmed.
- `submitted`: customer supplied a reference; admin review required.
- `paid`: admin verified the actual receipt.
- `rejected`: admin did not verify the reference.

Project access must remain locked until the admin verifies payment and separately provides the promised access. The website's payment records are not a wallet or stored-value balance.

## Firebase setup
1. In Firebase Console → Firestore Database → Rules, publish the included `firestore.rules`.
2. In Firebase Console → Storage → Rules, publish the included `storage.rules` if file sharing is enabled.
3. Upload the files in this folder to the root of your GitHub Pages repository and commit them.
4. Sign in using the configured admin email `utkarshgamer.ug@gmail.com` to create payment requests and review references.

## Chat file sharing
Both the customer and admin can share images and documents up to 10 MB in the order chat. Supported formats include images, PDF, ZIP, TXT, DOC and DOCX. Storage rules restrict access to the order's customer and configured admin.

## Later payment gateway integration
When an eligible verified merchant account is available, connect the provider through a secure server-side integration and verified webhooks. Never put secret gateway keys in `app.js`, and never mark a payment paid based only on a browser redirect, screenshot, or customer-entered reference.
