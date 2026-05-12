export default function Terms() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-3xl">
        <p className="text-muted-foreground mb-4">
          Last updated: {new Date().getFullYear()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing and using NexaCore's services, you agree to be bound by these Terms of Service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services Description</h2>
        <p className="text-muted-foreground mb-4">
          NexaCore provides web development, mobile application development, software engineering, 
          UI/UX design, IT consulting, and maintenance services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4">
          All content, code, and designs created by NexaCore remain our intellectual property 
          until full payment is received and project delivery is complete.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-muted-foreground">
          NexaCore shall not be liable for any indirect, incidental, or consequential damages 
          arising from the use of our services.
        </p>
      </div>
    </div>
  );
}