export default function Privacy() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-3xl">
        <p className="text-muted-foreground mb-4">
          Last updated: {new Date().getFullYear()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We collect information you provide directly to us, such as when you fill out our contact form, 
          including your name, email address, and message content.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-muted-foreground mb-4">
          We use the information we collect to respond to your inquiries, provide our services, 
          and communicate with you about our products and services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Protection</h2>
        <p className="text-muted-foreground mb-4">
          We implement appropriate security measures to protect your personal information. 
          Your data is stored securely and is never sold to third parties.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:nexacore@gmail.com" className="text-accent hover:underline">
            nexacore@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}