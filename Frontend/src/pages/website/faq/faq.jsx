import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./faq.css";

const filteredFaqs = [
 

    {
      question: "What is the purpose of IdeaVault?",
      answer:
        " IdeaVault aims to provide a platform for users to share their business ideas and connect with potential investors or partners.",
    },
    {
      question: "Who can use IdeaVault?",
      answer:
        "IdeaVault is designed for two primary user types: investors and idea posters. Investors are individuals or organizations looking to fund or collaborate on innovative business ideas, while idea posters are users who share their business plans seeking financial assistance or partnerships.",
    },
    {
      question: "How can I share my business idea on IdeaVault?",
      answer:
        "To share your business idea on IdeaVault, you can fill out a form providing details such as your business idea summary, funding amount required, business plan, revenue model, contact information, and legal status. Once submitted, your idea will be visible to interested investors.",
    },
    {
      question: "Can investors provide feedback on posted ideas?",
      answer:
        " Yes, investors can provide feedback on the posted ideas. IdeaVault encourages collaboration and interaction between users, and the platform includes a commenting system that allows users to provide feedback, suggestions, and insights to help refine the ideas further.",
    },
    {
      question: " Is there a ranking system for posted ideas on IdeaVault?",
      answer:
        "Yes, IdeaVault includes a ranking system where users can upvote or downvote posted ideas. The most popular and trending ideas will be showcased on a promotional section, increasing their visibility to potential investors and partners..",
    },
    {
      question:
        "How can I ensure the confidentiality of my business idea when sharing it on IdeaVault?",
      answer:
        "IdeaVault prioritizes the confidentiality of your business ideas. When sharing your idea, you have the option to include a non-disclosure agreement (NDA) that potential investors must agree to before accessing detailed information. This helps protect your intellectual property and ensures that investors respect the confidentiality of your idea",
    },
    {
      question: "Can I edit or update my posted business idea on IdeaVault?",
      answer:
        "Yes, you can edit or update your posted business idea on IdeaVault. As the idea poster, you have the flexibility to refine and improve your business plan based on feedback received from investors or other users. Simply access your posted idea and make the necessary updates to reflect any changes or enhancements.",
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
