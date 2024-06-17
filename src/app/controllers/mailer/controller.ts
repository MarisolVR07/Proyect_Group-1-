

export async function sendEmail(to:string, subject: string, text: string)  {
    console.log(to, subject, text)
    try {
      const response = await fetch('/api/v6/mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({to, subject, text}),
      });

      if (response.ok) {
        const data = await response.json();
         console.log(data.message || 'Email sent successfully');
      } else {
        const errorData = await response.json();
        console.log(`Failed to send email: ${errorData.error}`);
      }
    } catch (error) {
        console.log(`Failed to send email: ${error.message}`);
    }
  };