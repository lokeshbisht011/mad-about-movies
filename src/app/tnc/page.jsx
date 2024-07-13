import React from 'react'

export async function generateMetadata() {
  return {
    title: "Terms And Conditions",
  };
}

const page = () => {
  return (
    <div className="p-5 max-w-2xl mx-auto border-2 border-gray-300 rounded-md mt-5 text-text">
      <h1 className="text-3xl font-bold mb-4 text-center">Terms and Conditions</h1>
      <p className="mb-4 text-center">Last updated: 19-06-2024</p>
      <p className="mb-4">
        Welcome to Mad About Movies. These terms and conditions outline the rules and regulations for the use of our website.
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Mad About Movies if you do not agree to take all of the terms and conditions stated on this page.
      </p>
      <h2 className="text-2xl font-semibold mb-3">License</h2>
      <p className="mb-4">
        Unless otherwise stated, Mad About Movies and/or its licensors own the intellectual property rights for all material on Mad About Movies. All intellectual property rights are reserved. You may access this from Mad About Movies for your own personal use subjected to restrictions set in these terms and conditions.
      </p>
      <h2 className="text-2xl font-semibold mb-3">User Comments</h2>
      <p className="mb-4">
        This Agreement shall begin on the date hereof. Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website. Mad About Movies does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Mad About Movies, its agents, and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Content Liability</h2>
      <p className="mb-4">
        We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Your Privacy</h2>
      <p className="mb-4">
        Please read Privacy Policy
      </p>
      <h2 className="text-2xl font-semibold mb-3">Reservation of Rights</h2>
      <p className="mb-4">
        We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Removal of links from our website</h2>
      <p className="mb-4">
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
      </p>
    </div>
  )
}

export default page
