
import React from 'react';
import { useParams } from 'react-router-dom';

const LegalPage = () => {
    const { activeSection } = useParams();

    const renderContent = () => {
        switch (activeSection) {
            case 'terms':
                return <TermsAndConditions />;
            case 'privacy':
                return <PrivacyPolicy />;
            case 'cookie':
                return <CookiePolicy />;
            default:
                return <TermsAndConditions />;
        }
    };
    const TermsAndConditions = () => {
        return (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-gray-800">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Terms and Conditions of KKarmx
                </h2>
                <p className="text-sm text-gray-500 text-center"><strong>Last updated:</strong> {new Date().getFullYear()}</p>
    
                {[
                    ["1. Introduction", "Welcome to Kkarmx. By accessing and using our website, you agree to be bound by these Terms and Conditions."],
                    ["2. Website Usage", "This website is intended solely for personal, non-commercial use by individual consumers."],
                    ["3. Products and Pricing", "All products are subject to availability, and prices are subject to change without prior notice."],
                    ["4. Purchases and Payments", "By making a purchase, you confirm that you are legally authorized to use the selected payment method."],
                    ["5. Returns and Refunds", "Returns are accepted within 30 days of receipt, provided items are in original condition."],
                    ["6. Intellectual Property", "All content, trademarks, and designs on this site are the exclusive property of Kkarmx and may not be used without permission."],
                    ["7. Limitation of Liability", "Kkarmx shall not be liable for any indirect, incidental, or consequential damages arising from site usage."],
                    ["8. Modifications", "We reserve the right to modify these Terms at any time. Continued use of the site implies acceptance of changes."],
                    ["9. Governing Law", "These Terms are governed by and construed in accordance with the laws of Italy."],
                ].map(([title, content], idx) => (
                    <div key={idx} className="border-t pt-4">
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-base">{content}</p>
                    </div>
                ))}
            </div>
        );
    };
    

    const PrivacyPolicy = () => {
        return (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-gray-800">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Privacy Policy of KKarmx
                </h2>
                <p className="text-sm text-gray-500 text-center"><strong>Last updated:</strong> {new Date().getFullYear()}</p>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                    <p>We collect personal information such as your name, address, email, and payment details when you interact with our website.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">2. Use of Information</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>To process transactions and deliver orders</li>
                        <li>To improve our products and services</li>
                        <li>To send marketing communications (with your consent)</li>
                        <li>To prevent fraud and enhance security</li>
                    </ul>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">3. Information Sharing</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>With trusted service providers</li>
                        <li>With legal authorities when required by law</li>
                    </ul>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">4. Cookies and Similar Technologies</h3>
                    <p>We use cookies to enhance your experience. You may adjust your browser settings to manage cookie preferences.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">5. Data Security</h3>
                    <p>We implement technical and organizational measures to protect your personal information.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">6. Your Rights</h3>
                    <p>You have the right to access, correct, or delete your data. To exercise these rights, contact us.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">7. Policy Changes</h3>
                    <p>We will notify you of any material changes to this privacy policy.</p>
                </div>
            </div>
        );
    };
    

    const CookiePolicy = () => {
        return (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-gray-800">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Cookie Policy of KKarmx
                </h2>
                <p className="text-sm text-gray-500 text-center"><strong>Last updated:</strong> {new Date().getFullYear()}</p>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">1. What Are Cookies?</h3>
                    <p>Cookies are small text files stored on your device that help us remember information about your visit.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">2. Types of Cookies We Use</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Essential:</strong> Necessary for basic site functionality</li>
                        <li><strong>Performance:</strong> Help us understand how visitors interact with the site</li>
                        <li><strong>Functionality:</strong> Remember your preferences and settings</li>
                        <li><strong>Marketing:</strong> Deliver relevant advertisements</li>
                    </ul>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">3. Managing Cookies</h3>
                    <p>You can manage cookies through your browser settings. Disabling cookies may affect your site experience.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">4. Third-Party Cookies</h3>
                    <p>We may use third-party tools such as Google Analytics, which may place their own cookies on your device.</p>
                </div>
    
                <div className="border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2">5. Updates to This Policy</h3>
                    <p>We may update this policy from time to time to reflect changes in our practices or applicable laws.</p>
                </div>
            </div>
        );
    };
    


    return (
        <div className="legal-page">
            <h2 className="text-4xl font-bold text-center my-4">KKarmx - Área Legal</h2>

            <div className="legal-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default LegalPage;