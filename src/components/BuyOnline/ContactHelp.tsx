import React from 'react';

const ContactHelp = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between rounded-md bg-gray-50 p-4 md:p-6">
          <div className="flex items-center">
            <div className="mr-4 h-12 w-12 rounded-full bg-blue-100 p-2">
              <img
                src="https://ext.same-assets.com/1229505073/1925427810.png"
                alt="Support Icon"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base font-medium md:text-lg">Need help choosing the right plan?</h3>
              <p className="text-sm text-gray-600">Leave your contact details and we'll get back to you shortly.</p>
            </div>
          </div>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Request a call back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactHelp;
