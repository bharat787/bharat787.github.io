import { useEffect } from 'react';
import './glanceMail.css';

export default function GlanceMailPrivacy() {
  useEffect(() => {
    document.body.classList.add('page-glance-mail');
    return () => document.body.classList.remove('page-glance-mail');
  }, []);

  return (
    <div className="glance-mail-root">
      <div className="container">
        <h1>Privacy Policy for GlanceMail</h1>
        <p>
          Welcome to GlanceMail, the iOS app that simplifies email management using advanced LLMs. This privacy policy
          outlines how we collect, use, and protect your information.
        </p>

        <h2>Information Collection and Use</h2>
        <p>For the operation of GlanceMail, we collect various types of information:</p>

        <h3>Information You Provide</h3>
        <ul>
          <li>
            <strong>Email Data via Gmail API:</strong> When you use GlanceMail, you authorize it to access your Gmail
            account to fetch and send emails on your behalf. We do not store your emails or use them for any other
            purpose.
          </li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>
            <strong>App Analytics and Crash Reports:</strong> We collect data on how you use GlanceMail, including
            performance data and crash reports, to improve app functionality and user experience.
          </li>
          <li>
            <strong>Push Notifications:</strong> If you opt-in, we may send you push notifications. We collect and store
            device tokens to send these notifications.
          </li>
        </ul>

        <h2>Use of Collected Information</h2>
        <p>
          The information we collect helps us enhance and optimize your user experience, improve app stability, and
          communicate important app-related notices.
        </p>

        <h2>Sharing of Information</h2>
        <p>
          Information may be shared with technology service providers like Groq and Google to enable specific app
          functionalities. We may also disclose your information if required by law.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information, including
          encryption and secure communication protocols.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          This Privacy Policy may be updated periodically. We will notify you of any changes by posting the new policy
          on this page and updating the effective date.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have questions or concerns about our Privacy Policy, please contact us at{' '}
          <a href="mailto:support@bharat-gupta.com">support@bharat-gupta.com</a>
        </p>
      </div>

      <footer>
        <p>&copy; 2024 GlanceMail. All rights reserved.</p>
      </footer>
    </div>
  );
}
