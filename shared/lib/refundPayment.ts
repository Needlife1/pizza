import axios from "axios";
import crypto from 'crypto';
import { merchantAccount, secretKey, urlWayForPay } from "../constants/wayForPay";

export async function refundPayment({
  orderReference,
  amount,
  currency = 'UAH',
  comment = 'Customer refund',
}: {
  orderReference: string;
  amount: number;
  currency?: string;
  comment?: string;
}) {
  // Подпись строится из значений в строгом порядке:
  const signatureString = [
    merchantAccount,
    orderReference,
    amount,
    currency,
  ].join(';');

  const merchantSignature = crypto
    .createHmac('md5', secretKey)
    .update(signatureString)
    .digest('hex');

  const payload = {
    transactionType: 'REFUND',
    merchantAccount,
    orderReference,
    amount,
    currency,
    comment,
    merchantSignature,
    apiVersion: 1,
  };

  try {
    const { data } = await axios.post(urlWayForPay, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    return data;
  } catch (err) {
    console.error('[Refund Error]', err);
    throw err;
  }
}
