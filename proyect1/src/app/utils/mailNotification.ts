import {
  getParameter,
  updateParameter,
} from "../controllers/rc_parameters/controller";
import { getUsersByRole } from "../controllers/rc_users/controller";
import { sendEmail } from "../controllers/mailer/controller";
import { AppliedSelfAssessment, User } from "../types/entities";
import {
  getAppliedSelfAssessmentsByStatus,
  saveAppliedSelfassessment,
  updateAppliedSelfassessment,
} from "../controllers/rc_appliedselfassessment/controller";

export function scheduleJob() {
  const oneDayInMilliseconds = 60 * 1000;

  const intervalId = setInterval(() => {
    // sendNotification();
   // desactivateAssessment();
  }, oneDayInMilliseconds);

  return () => clearInterval(intervalId);
}

async function sendNotification() {
  const parameters = await getParameter(1);
  if (!("error" in parameters)) {
    if (isOneDayAway(parameters.PRM_DeactivationDate)) {
      const users = await getUsersByRole("admin");
      console.log(users)
      if (!("error" in users)) {
        users
          .map((u) =>
            sendEmail(
              u.USR_Email,
              "REMINDER",
              "The application is going to be desactivated in 1 day, please verify all the pending assessment"
            )
          );
      }
    }
  }
  console.log(parameters);
}

async function desactivateAssessment() {
  const parameters = await getParameter(1);
  const currentDate = new Date();
  if (!("error" in parameters)) {
    const targetDate = new Date(parameters.PRM_DeactivationDate);
    console.log(targetDate.getDate(), currentDate.getDate());
    if (currentDate.getDate() !== targetDate.getDate()) {
      console.log("entró");
    } else {
      console.log("no entró");
      const assessments = await getAppliedSelfAssessmentsByStatus("A");
      if (!("error" in assessments)) {
        assessments.map(async (a) => {
          const assessment: AppliedSelfAssessment = {
            ASA_Id: a.ASA_Id,
            ASA_Status: "I",
          };
          const response = await updateAppliedSelfassessment(assessment);
          console.log(response);
        });
      }
    }
  }
}

function isOneDayAway(targetDate: string): boolean {
  const currentDate = new Date();
  const target = new Date(targetDate);
  console.log(target);
  currentDate.setHours(0, 0, 0, 0);

  target.setHours(0, 0, 0, 0);

  const differenceInMillis = target.getTime() - currentDate.getTime();

  const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);

  return differenceInDays === 1;
}
