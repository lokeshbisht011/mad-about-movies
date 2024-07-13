import React from 'react'

export async function generateMetadata() {
  return {
    title: "Privacy Policy",
  };
}

const page = () => {
  return (
    <div className="p-5 max-w-3xl mt-5 mx-auto border-2 border-gray-300 rounded-md text-text">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="mb-4 text-center">Last updated: 19-06-2024</p>
      <p className="mb-4">
        Welcome to Mad About Movies. We are committed to protecting your personal information and your right to privacy.
        If you have any questions or concerns about our policy, or our practices with regards to your personal information,
        please contact us at [email].
      </p>
      <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
      <p className="mb-4">
        We collect personal information that you voluntarily provide to us when registering at the website, expressing an interest
        in obtaining information about us or our products and services, when participating in activities on the website or otherwise
        contacting us.
      </p>
      <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
      <p className="mb-4">
        We use personal information collected via our website for a variety of business purposes described below.
        We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter
        into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Sharing Your Information</h2>
      <p className="mb-4">
        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights,
        or to fulfill business obligations.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Cookies and Other Tracking Technologies</h2>
      <p className="mb-4">
        We may use cookies and similar tracking technologies to access or store information. Specific information about how we use
        such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Your Privacy Rights</h2>
      <p className="mb-4">
        You have rights under data protection laws in relation to your personal data. These may include the right to request access
        and obtain a copy of your personal data, to request rectification or erasure; to restrict the processing of your personal data;
        and if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing
        of your personal data.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
      <p>
        If you have questions or comments about this policy, you may email us at madaboutmovies009@gmail.com
      </p>
    </div>
  )
}

export default page;