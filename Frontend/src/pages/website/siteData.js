// Shared content and helpers for the public website.
import avatar1 from "../../../assets/avatar1.png";
import avatar2 from "../../../assets/avatar2.jpg";
import avatar3 from "../../../assets/avatar3.png";
import avatar4 from "../../../assets/avatar4.jpg";
import avatar5 from "../../../assets/avatar5.jpg";
import avatar6 from "../../../assets/avatar6.jpg";

export const CONTACT = {
  address: "H No. 83/1, Area 4-D, Landhi No. 6, Karachi",
  phone: "0335-8782828",
  phoneHref: "tel:+923358782828",
  email: "muhammadsoban075@gmail.com",
  facebook: "https://www.facebook.com/sobi.rider",
  // WhatsApp orders go to the business number
  whatsapp: "923712502670",
};

export const money = (n) => Number(n || 0).toLocaleString("en-US");

export const whatsappLink = (item) => {
  if (!item) return `https://wa.me/${CONTACT.whatsapp}`;
  const message = `Hello

I'm interested in this item:

Product: ${item?.label}
Category: ${item?.category}
Price: ${item?.sellingPrice} PKR

Is this still available?`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const openWhatsapp = (item) => window.open(whatsappLink(item), "_blank", "noopener");

export const REVIEWS = [
  {
    name: "Ahmed Ali",
    body: "I can't thank MS Enterprise enough for transforming my home. Their exquisite ceramics added a touch of elegance that I never thought was possible.",
    img: avatar1,
  },
  {
    name: "Muhammad Sufiyan",
    body: "My house feels like a work of art thanks to MS Enterprise's incredible range of ceramics. I highly recommend them!",
    img: avatar2,
  },
  {
    name: "Usman",
    body: "MS Enterprise has truly elevated the aesthetics of my home with their ceramics and sanitary items.",
    img: avatar3,
  },
  {
    name: "Zainab Fatima",
    body: "My family and I are amazed at the impact MS Enterprise's ceramics and sanitary items have had on our home.",
    img: avatar4,
  },
  {
    name: "Laiba Asif",
    body: "My home renovation wouldn't have been the same without MS Enterprise's ceramics and sanitary items.",
    img: avatar5,
  },
  {
    name: "Uzair Waqar",
    body: "Their sanitary items are not only beautiful but also high-performing. I'm beyond satisfied!",
    img: avatar6,
  },
];

export const FAQS = [
  {
    q: "What products do you offer at MS Enterprise?",
    a: "We offer a wide range of sanitary and ceramics products, including faucets, sinks, toilets, bathtubs and much more. Explore our catalog to find the perfect items for your home or project.",
  },
  {
    q: "Are your products of high quality?",
    a: "Yes. We source products from reputable manufacturers known for their durability and reliability, so you receive products that stand the test of time.",
  },
  {
    q: "Do you offer delivery services?",
    a: "Yes, we offer delivery for all our products. Our delivery team makes sure your order reaches your doorstep on time.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept credit/debit cards, cash and digital payment platforms. Choose the option that suits you best.",
  },
  {
    q: "Can I return or exchange a product if I'm not satisfied?",
    a: "Yes, we have a return and exchange policy. If you're not satisfied with a product that is not from China, contact us and we'll guide you through the return or exchange. Items originating from China are not eligible for return or exchange.",
  },
  {
    q: "Is there a warranty for your products?",
    a: "Many of our products come with warranties. Duration and terms vary by product, so please check the product details or contact our team.",
  },
  {
    q: "How can I get in touch with MS Enterprise?",
    a: "Call or WhatsApp us, send a message through this website, or visit our store. Our team is happy to help.",
  },
];
