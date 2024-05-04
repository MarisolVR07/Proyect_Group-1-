
import cron from 'node-cron';

import { Resend } from 'resend';

const resend = new Resend('re_WsUkpKZH_45L2TSnaL2TngZZaBRSkxaJs');

function send() {resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'joksanmj.777@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});

}

cron.schedule('* * * * *', () => {
  send();
});
