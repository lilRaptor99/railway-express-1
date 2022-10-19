import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TicketPayment({ route, navigation }) {
  const { ticketData, totalPrice } = route.params;
  console.log('Received ticket data', ticketData);

  const ticketPaymentRefCode = 'TICKET_PAYMENT_' + Math.random();
  const html = /* HTML */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Directpay|OneTimePayment</title>
      </head>

      <body>
        <div id="card_container"></div>
        <div id="success"></div>
        <div id="errors"></div>
        <script src="https://cdn.directpay.lk/dev/v1/directpayCardPayment.js?v=1"></script>
        <script>
          DirectPayCardPayment.init({
            container: 'card_container', //<div id="card_container"></div>
            merchantId: 'RR15074', //your merchant_id
            amount: '${totalPrice.toString()}',
            refCode: '${ticketPaymentRefCode}', //unique referance code form merchant
            currency: 'LKR',
            type: 'ONE_TIME_PAYMENT',
            customerEmail: 'abc@mail.com',
            customerMobile: '+94712345674',
            description: 'Ticket', //product or service description
            debug: true,
            responseCallback: responseCallback,
            errorCallback: errorCallback,
            logo: 'https://test.com/directpay_logo.png',
            apiKey:
              'e4bf2a1b078c6f54007edfd696b9fd06f308adf5a810f2e0466b0bc7b1051e41',
          });

          //response callback.
          function responseCallback(result) {
            document.querySelector('body').innerHTML = 'Success';
            // alert(JSON.stringify(result));
            window.ReactNativeWebView.postMessage('SUCCESS');
          }

          //error callback
          function errorCallback(result) {
            document.querySelector('body').innerHTML = 'Error';
            // alert(JSON.stringify(result));
            window.ReactNativeWebView.postMessage('ERROR');
          }
        </script>
      </body>
    </html>
  `;

  return (
    <>
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html }}
          onMessage={(event) => {
            navigation.replace('DownloadTicket', {
              paymentStatus: event.nativeEvent.data,
              ticketData,
            });
          }}
        />
      </View>
    </>
  );
}
