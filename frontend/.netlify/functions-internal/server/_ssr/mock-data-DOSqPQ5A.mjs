const GRADE_INFO = {
  A: { label: "Grade A — Like New", warrantyDays: 90, desc: "Minimal signs of use, fully tested, battery health >90%." },
  B: { label: "Grade B — Very Good", warrantyDays: 60, desc: "Light cosmetic wear, fully functional, battery health >80%." },
  C: { label: "Grade C — Good", warrantyDays: 30, desc: "Visible wear, fully functional, battery health >70%." }
};
const fcfa = (n) => `${n.toLocaleString("fr-FR").replace(/\u202f/g, ",")} FCFA`;
export {
  GRADE_INFO as G,
  fcfa as f
};
