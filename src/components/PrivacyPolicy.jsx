import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: October 06, 2024</p>

            <p className="mb-4">
                This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information
                when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Interpretation and Definitions</h2>
            <h3 className="text-xl font-semibold mb-2">Interpretation</h3>
            <p className="mb-4">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The
                following definitions shall have the same meaning regardless of whether they appear in singular or plural.
            </p>

            <h3 className="text-xl font-semibold mb-2">Definitions</h3>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">
                    <strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.
                </li>
                <li className="mb-2">
                    <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party.
                </li>
                <li className="mb-2">
                    <strong>Company</strong> (referred to as either "the Company", "We", "Us", or "Our" in this Agreement) refers to Sarathi.
                </li>
                <li className="mb-2">
                    <strong>Cookies</strong> are small files placed on Your computer, mobile device, or any other device by a website.
                </li>
                <li className="mb-2">
                    <strong>Country</strong> refers to: Maharashtra, India.
                </li>
                <li className="mb-2">
                    <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.
                </li>
                <li className="mb-2">
                    <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.
                </li>
                <li className="mb-2">
                    <strong>Service</strong> refers to the Website.
                </li>
                <li className="mb-2">
                    <strong>Website</strong> refers to Sarathi, accessible from{' '}
                    <a
                        href="https://sarathi-omega.vercel.app/"
                        target="_blank"
                        className="text-blue-500 underline"
                    >
                        https://sarathi-omega.vercel.app/
                    </a>.
                </li>
                <li className="mb-2">
                    <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on
                    behalf of which such individual is accessing or using the Service.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Collecting and Using Your Personal Data</h2>
            <h3 className="text-xl font-semibold mb-2">Types of Data Collected</h3>

            <h4 className="text-lg font-semibold mb-2">Personal Data</h4>
            <p className="mb-4">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used
                to contact or identify You. Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">Email address</li>
                <li className="mb-2">First name and last name</li>
                <li className="mb-2">Usage Data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Usage of Google Calendar API Scopes</h3>
            <p className="mb-4">
                SARATHI integrates with the Google Calendar API to help users manage and organize mentorship sessions. We request the following
                permissions to provide a seamless user experience:
            </p>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2"><strong>View and Sync Events</strong>: We access your Google Calendar to display and sync events between SARATHI and your Google account, ensuring that all mentorship-related meetings are accurately reflected on both platforms.</li>
                <li className="mb-2"><strong>Create and Edit Events</strong>: SARATHI allows users to create, edit, and delete mentorship-related events directly within the platform, updating your Google Calendar in real time.</li>
                <li className="mb-2"><strong>Manage Calendar Sharing</strong>: Users can manage sharing permissions for mentorship calendars, facilitating collaboration and scheduling between mentors and mentees.</li>
                <li className="mb-2"><strong>View Calendar Properties</strong>: We access calendar titles and descriptions to help users organize their mentorship sessions efficiently.</li>
            </ul>

            <p className="mb-4">
                These permissions are necessary to ensure SARATHI's full functionality and to provide an efficient user experience in managing mentorship activities.
                More limited scopes, such as read-only access, would restrict users from organizing and managing events effectively.
            </p>

            <h3 className="text-xl font-semibold mb-2">How We Use Your Data</h3>
            <p className="mb-4">
                SARATHI uses the data we collect for various purposes:
            </p>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-2">To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li className="mb-2">To manage Your Account and provide features like event synchronization, calendar sharing, and event editing.</li>
                <li className="mb-2">To contact You by email or notifications regarding updates related to mentorship activities.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, You can contact us:
            </p>
            <ul className="list-disc list-inside">
                <li className="mb-2">By email: <a href="mailto:sarathi062023@gmail.com" className="text-blue-500 underline">sarathi062023@gmail.com</a></li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
