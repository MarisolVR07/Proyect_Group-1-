import { getParameter } from "../controllers/rc_parameters/controller";
import { getUsers } from "../controllers/rc_users/controller";
import { sendEmail } from "../controllers/mailer/controller";
import { User } from "../types/entities";


export  function scheduleJob ()  {
  
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const intervalId =setInterval(() => {
    sendNotification()
  }, oneDayInMilliseconds);

  return () => clearInterval(intervalId); 
};


async function  sendNotification(){

    const parameters = await getParameter(1);
    if(!("error" in parameters)){
       if(isOneDayAway(parameters.PRM_DeactivationDate)){const users = await getUsers();
        if(!("error" in users)){ 

            users.filter(u => u.USR_Role = "admin").map(u => 
            
            (sendEmail(
             u.USR_Email,
             'REMINDER',
             'The application is going to be desactivated in 1 day, please verify all the pending assessment'
            )))

        }}
        
        
    }
    console.log(parameters)

}

function isOneDayAway(targetDate: string): boolean {

    const currentDate = new Date();

    const target = new Date(targetDate);
    console.log(target)
    currentDate.setHours(0, 0, 0, 0);

    target.setHours(0, 0, 0, 0);

    const differenceInMillis = target.getTime() - currentDate.getTime();

    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);

    return differenceInDays === 1;
  }