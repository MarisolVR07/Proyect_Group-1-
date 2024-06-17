
import React from "react";
import CardsSectionDashBoard from "./CardsSectionDashboard";

const Dashboard = () => {
  return (
    <div className="items-center justify-center font-poppins drop-shadow-xl my-auto">
      <CardsSectionDashBoard />
      <div className="flex flex-col items-center justify-center font-poppins drop-shadow-xl my-auto w-full mb-14">
  
      <div className="mt-5 w-full px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64">
              <h2 className="text-xl font-semibold">Getting Started with Self-Assessments</h2>
              <p>Begin by selecting the Self-Assessment tab. Choose the appropriate form and complete it at your pace. Submit when ready!</p>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64">
              <h2 className="text-xl font-semibold">Understanding Department Roles</h2>
              <p>Each department has specific roles that are critical for the streamlined operations of your organization.</p>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64">
              <h2 className="text-xl font-semibold">Tips for Effective Self-Assessments</h2>
              <p>Ensure that all questions are answered honestly to receive the most accurate feedback and action points.</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64">
              <h2 className="text-xl font-semibold">How to Review Assessments</h2>
              <p>Post-submission, your assessments will be reviewed. You can track the review status and results in the Dashboard.</p>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64">
              <h2 className="text-xl font-semibold">Department Collaboration</h2>
              <p>Collaboration between departments is key. Utilize our tools to enhance communication and project management.</p>
            </div>

            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-64 ">
              <h2 className="text-xl font-semibold">About Our Company</h2>
              <p>  Our mission is to empower organizations through cutting-edge software solutions. Learn more about our commitment to driving efficiency and innovation in the workplace, helping you achieve operational excellence </p>     </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;