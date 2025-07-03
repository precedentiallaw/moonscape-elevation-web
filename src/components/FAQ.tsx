
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What are the benefits of investing in Dubai real estate?",
      answer: "Dubai offers 0% income tax, high rental yields (6-10%), strong capital appreciation, and is a global hub with excellent connectivity. The emirate provides a stable political environment and world-class infrastructure."
    },
    {
      question: "Can foreign nationals buy property in Dubai?",
      answer: "Yes, foreign nationals can purchase freehold properties in designated areas of Dubai. This includes most prime locations and new developments, giving investors full ownership rights."
    },
    {
      question: "What is the typical ROI for Dubai properties?",
      answer: "Dubai properties typically offer rental yields of 6-10% annually, with potential for capital appreciation. Returns vary by location, property type, and market conditions."
    },
    {
      question: "What additional costs should I consider when buying?",
      answer: "Additional costs include Dubai Land Department fees (4% for non-UAE nationals, 2% for UAE nationals), real estate agent commission (typically 2%), mortgage registration fees if applicable, and annual service charges."
    },
    {
      question: "How does the buying process work for international investors?",
      answer: "The process involves property selection, reservation with initial deposit, obtaining a No Objection Certificate (if required), finalizing financing, completing due diligence, and transferring ownership at the Dubai Land Department."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-moonscape-charcoal mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-moonscape-platinum text-lg max-w-2xl mx-auto">
            Get answers to common questions about investing in Dubai's premium real estate market
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-moonscape-light-gray"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-moonscape-charcoal font-medium text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-moonscape-platinum leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
