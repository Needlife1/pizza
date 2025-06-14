import axios from 'axios';
import crypto from 'crypto';
import { randomUUID } from 'crypto';
import { merchantAccount, merchantDomain, secretKey, urlWayForPay } from '../constants/wayForPay';

interface Product {
  name: string;
  price: number;
  count: number;
}

export async function createPayment({
  orderId,
  amount,
  email,
  phone,
  products,
  clientLastName,
}: {
  orderId: string;
  amount: number;
  email: string;
  phone: string;
  clientLastName: string;
  products: Product[];
}) {

  const orderDate = Math.floor(Date.now() / 1000);
  const orderReference = `ORDER-${orderId} - ${randomUUID()}`;

  const productNames = products.map((p) => p.name);
  const productPrices = products.map((p) => p.price);
  const productCounts = products.map((p) => p.count);

  // Формуємо рядок підпису
  const signatureSource = [
    merchantAccount,
    merchantDomain,
    orderReference,
    orderDate,
    amount,
    'UAH',
    ...productNames,
    ...productCounts.map(String),
    ...productPrices.map(String),
  ].join(';');

  const merchantSignature = crypto
    .createHmac('md5', secretKey)
    .update(signatureSource)
    .digest('hex');

  const payload = {
    transactionType: 'CREATE_INVOICE',
    merchantAccount,
    merchantDomainName: merchantDomain,
    merchantAuthType: 'SimpleSignature',
    merchantSignature,
    apiVersion: 1,
    language: 'UA',
    orderReference,
    orderDate,
    amount,
    currency: 'UAH',
    orderTimeout: 86400,
    clientFirstName: email.split('@')[0],
    clientLastName,
    clientEmail: email,
    clientPhone: phone,
    productName: productNames,
    productPrice: productPrices,
    productCount: productCounts,
    serviceUrl: `${merchantDomain}/api/wayforpay-webhook`,
  };

  const { data } = await axios.post(urlWayForPay, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (data.invoiceUrl) {
    return {
      invoiceUrl: data.invoiceUrl,
      orderReference,
    };
  }

  throw new Error('Не вдалося створити інвойс: ' + JSON.stringify(data));
}

