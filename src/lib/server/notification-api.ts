import notificationapi from 'notificationapi-node-server-sdk';
import { config } from '../config';

notificationapi.init(
  config.NOTIFICATION_API_CLIENT_ID, // Client ID
  config.NOTIFICATION_API_CLIENT_SECRET // Client Secret
)

export const sendNotificaition = async (subject: string, template: string, to: string, id: string) => {
  notificationapi.send({
    type: 'watergroove_notification',
    to: {
      id,
      email: to
    },
    email: {
      subject,
      html: template
    }
  })
    .then(res => console.log(res.data))

}