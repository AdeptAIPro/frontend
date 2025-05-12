import { useState } from "react";
import EnterpriseSection from "./EnterpriseSection";
import PricingFaq from "./PricingFaq";
import FinalCTA from "./FinalCTA";
import ComparisonTable from "./ComparisonTable";
import PricingHeader from "./PricingHeader";



const plans = {
  monthly: [
    {
      name: "Free Tier",
      price: "$0",
      description: "Best for individuals exploring AI automation",
      usage: "Limited",
      apiCalls: "100/month",
      features: [
        { label: "Limited AI workflows & automations", available: true },
        { label: "Access to basic Agentic AI models", available: true },
        { label: "Community support", available: true },
        { label: "Basic documentation", available: true },
        { label: "Team collaboration", available: false },
        { label: "Custom integrations", available: false },
        { label: "Priority access", available: false }
      ],
      button: { text: "Start Free", url: "/login" }
    },
    {
      name: "Pro Plan",
      price: "$49",
      description: "Best for startups & small businesses",
      usage: "50 workflows/month",
      apiCalls: "5,000/month",
      features: [
        { label: "50 AI workflows/month", available: true },
        { label: "5,000 API calls/month", available: true },
        { label: "Standard integrations (Zapier, Slack, Notion)", available: true },
        { label: "Email support", available: true },
        { label: "Advanced analytics", available: true },
        { label: "Team collaboration", available: false },
        { label: "API access for custom integrations", available: false }
      ],
      button: {
        text: "Get Started",
        url: "https://buy.stripe.com/test_28o7tMcZ1avra1qdQQ"
      }
    },
    {
      name: "Business Plan",
      price: "$199",
      description: "Best for growing teams & mid-sized companies",
      usage: "Unlimited",
      apiCalls: "50,000/month",
      features: [
        { label: "Unlimited AI workflows", available: true },
        { label: "50,000 API calls/month", available: true },
        { label: "Advanced automation & analytics", available: true },
        { label: "Priority support", available: true },
        { label: "Team collaboration", available: true },
        { label: "API access for custom integrations", available: true },
        { label: "Dedicated onboarding", available: true }
      ],
      button: {
        text: "Choose Business",
        url: "https://buy.stripe.com/test_7sIeWegbdgTP2yY9AC"
      },
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Best for large organizations with high-scale AI needs",
      usage: "Unlimited",
      apiCalls: "Unlimited",
      features: [
        { label: "Fully customizable AI solutions", available: true },
        { label: "Unlimited API calls & workflows", available: true },
        { label: "Dedicated account manager & SLAs", available: true },
        { label: "On-premise or private cloud deployment", available: true },
        { label: "White-label options", available: true },
        { label: "AI customization options", available: true },
        { label: "Custom integrations", available: true }
      ],
      button: {
        text: "Contact Sales",
        url: "https://buy.stripe.com/test_3cseWe3or0UR6Pe001"
      }
    }
  ],
  yearly:[
    {
      name: "Pro Plan",
      price: "$490",
      description: "Best for startups & small businesses",
      usage: "50 workflows/month",
      apiCalls: "5,000/month",
      features: [
        { label: "50 AI workflows/month", available: true },
        { label: "5,000 API calls/month", available: true },
        { label: "Standard integrations (Zapier, Slack, Notion)", available: true },
        { label: "Email support", available: true },
        { label: "Advanced analytics", available: true },
        { label: "Team collaboration", available: false },
        { label: "API access for custom integrations", available: false }
      ],
      button: {
        text: "Get Started",
        url: "https://buy.stripe.com/test_28oaFY2kn4730qQdQT"
      }
    },
    {
      name: "Business Plan",
      price: "$1,990",
      description: "Best for growing teams & mid-sized companies",
      usage: "Unlimited",
      apiCalls: "50,000/month",
      features: [
        { label: "Unlimited AI workflows", available: true },
        { label: "50,000 API calls/month", available: true },
        { label: "Advanced automation & analytics", available: true },
        { label: "Priority support", available: true },
        { label: "Team collaboration", available: true },
        { label: "API access for custom integrations", available: true },
        { label: "Dedicated onboarding", available: true }
      ],
      button: {
        text: "Choose Business",
        url: "https://buy.stripe.com/test_7sI8xQbUX1YVgpO9AE"
      },
      popular: true
    },
     {
      name: "Enterprise",
      price: "Custom",
      description: "Best for large organizations with high-scale AI needs",
      usage: "Unlimited",
      yearlyDiscount: "Save X% annually",
      apiCalls: "Unlimited",
      features: [
        { label: "Fully customizable AI solutions", available: true },
        { label: "Unlimited API calls & workflows", available: true },
        { label: "Dedicated account manager & SLAs", available: true },
        { label: "On-premise or private cloud deployment", available: true },
        { label: "White-label options", available: true },
        { label: "AI customization options", available: true },
        { label: "Custom integrations", available: true }
      ],
      button: {
        text: "Contact Sales",
        url: "https://buy.stripe.com/test_28o01ke35avr0qQ8wB"
      }
    }, 
  ]
  
};

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
  <>  
    <PricingHeader/>
    <div className="py-16 px-4 sm:px-8 align-right max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">Pricing Plans</h2>

      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-l-full border ${
            billing === "monthly" ? "bg-purple-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-r-full border ${
            billing === "yearly" ? "bg-purple-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setBilling("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="grid md:grid-cols-4 align-right gap-8">
        {plans[billing].map((plan, i) => (
          <div
            key={i}
            className={`border rounded-2xl p-6 shadow-md ${
              plan.popular ? "border-purple-600" : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="text-sm text-white bg-purple-600 px-2 py-1 rounded-full w-fit mb-2">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-gray-500 mb-4">{plan.description}</p>
            <div><strong>Usage Limit:</strong> {plan.yearlyDiscount}</div>
            <div className="text-3xl font-bold mb-4">
  {plan.price} {plan.name !== "Enterprise" && <span>/mo</span>}
</div>

            
            <div className="text-sm mb-4">
  <div><strong>Usage Limit:</strong> {plan.usage}</div>
  <div><strong>API Calls:</strong> {plan.apiCalls}</div>
  

</div>
<ul className="mb-6 space-y-2">
  {plan.features.map((f, j) => (
    <li key={j} className={`text-sm ${f.available ? "text-gray-700" : "text-gray-400 line-through"}`}>
      {f.available ? "✅" : "❌"} {f.label}
    </li>
  ))}
</ul>
            <a
              href={plan.button.url}
              className="block text-center bg-purple-600 text-white py-2 rounded-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {plan.button.text}
            </a>
          </div>
        ))}
      </div>
      <ComparisonTable/><EnterpriseSection/>
      <PricingFaq/>
      <FinalCTA/>
    </div>
    </>

  );
}
