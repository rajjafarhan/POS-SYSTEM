import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./faq.css";

const filteredFaqs = [
 

    {
      question: "What products do you offer at MS Enterprise?",
      answer:
        " We offer a wide range of sanitary and ceramics products, including faucets, sinks, toilets, bathtubs, tiles, and much more. Explore our extensive catalog to find the perfect items for your home or project.",
    },
    {
      question: "Are your products of high quality?",
      answer:
        "Yes, at MS Enterprise, we prioritize quality. We source products from reputable manufacturers known for their durability and reliability. Our commitment to quality ensures that you receive products that stand the test of time.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we offer delivery services for all our products. We have a dedicated delivery team that ensures your products are delivered to your doorstep in a timely and efficient manner. ",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        " We accept various payment methods, including credit/debit cards, cash, and digital payment platforms. You can choose the option that best suits your preferences.",
    },
    {
      question: "  Can I return or exchange a product if I'm not satisfied?",
      answer:
        " Yes, we have a return and exchange policy. If you're not satisfied with a product, please contact our customer support, and we'll guide you through the return or exchange process.",
    },
    {
      question:
        "Is there a warranty for your products?",
      answer:
        "Many of our products come with warranties. The duration and terms of warranties may vary depending on the product. Please check the product details or contact our team for warranty information.",
    },
    {
      question: "How can I get in touch with MS Enterprise for inquiries and support?",
      answer:
        "You can contact us through our website, by phone, or by visiting our physical store. Our team is here to assist you with any questions or concerns",
    },
  ];


const FaqSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered FAQs based on the search term
  const filteredFaqsList = filteredFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container ">
        <div className="my-3">
          <input
            type="text"
            className="form-control p-2 glow-input  "
            placeholder="Search FAQs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="accordion my-1" id="accordionExample">
          {filteredFaqsList.map((faq, index) => (
            <div className="accordion-item  faqbox" key={index}>
              <h2 className="accordion-header ">
                <button
                  className="accordion-button faqheaderbutton collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                  style={{height:"3rem"}}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqSection;
