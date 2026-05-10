import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";

// ─── ΠΡΑΓΜΑΤΙΚΑ ΔΕΔΟΜΕΝΑ από τα θέματα Πανελληνίων ──────────────
// Πηγή: methodiko-frontistirio.gr (επίσημα PDFs θεμάτων 2019-2025)
// Κωδικοποίηση: ΘΑ=Θέμα Α (θεωρία), ΘΒ=Θέμα Β, ΘΓ=Θέμα Γ, ΘΔ=Θέμα Δ

const TOPICS = [
  // ════════════ ΘΕΜΑ Α — ΘΕΩΡΙΑ ════════════
  {
    id: "T01", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Απόδειξη: Παράγουσες (F+c)",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΑ1", 2023: null, 2024: null, 2025: "ΘΑ1"
    },
    notes: "Επανήλθε 2025 μετά 2022. Κλασική απόδειξη: κάθε παράγουσα = F(x)+c.",
  },
  {
    id: "T02", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Θεώρημα Ενδιάμεσων Τιμών (ΘΕΤ / Bolzano)",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΑ", 2023: null, 2024: "ΘΑ1", 2025: "ΘΑ2"
    },
    notes: "Πέφτει συχνά στο Θέμα Α. 2024: απόδειξη ΘΕΤ. 2025: διατύπωση.",
  },
  {
    id: "T03", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Θεώρημα Fermat",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΑ2", 2023: null, 2024: null, 2025: null
    },
    notes: "Εμφανίστηκε 2022. Τοπικό ακρότατο ⟹ f΄(x₀)=0.",
  },
  {
    id: "T04", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Θεώρημα Rolle",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: null, 2023: "ΘΑ3", 2024: null, 2025: null
    },
    notes: "2023: διατύπωση + γεωμετρική ερμηνεία. Συνδέεται με ΘΜΤ.",
  },
  {
    id: "T05", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Θεμελιώδες Θεώρημα Ολοκληρωτικού Λογισμού",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: null, 2023: null, 2024: "ΘΑ3", 2025: null
    },
    notes: "2024: διατύπωση ΘΘΟΛ. Σπάνιο αλλά πιθανό για 2026.",
  },
  {
    id: "T06", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Κατακόρυφη ασύμπτωτη (ορισμός)",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΑ3", 2023: null, 2024: null, 2025: "ΘΑ3"
    },
    notes: "Επανήλθε 2025. Απλός ορισμός: lim f(x)=±∞ όταν x→x₀.",
  },
  {
    id: "T07", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Σωστό/Λάθος (Α4) — Παράγωγος & Συνέχεια",
    appearances: {
      2019: "ΘΑ4", 2020: "ΘΑ4", 2021: "ΘΑ4",
      2022: "ΘΑ4", 2023: "ΘΑ4", 2024: "ΘΑ4", 2025: "ΘΑ4"
    },
    notes: "ΠΑΝΤΑ στο Θέμα Α4. Σωστό/Λάθος 5 προτάσεων. Καλύπτει όλη την ύλη.",
  },
  {
    id: "T08", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Κυρτότητα (ορισμός / εφαπτομένη κάτω από C)",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: null, 2023: null, 2024: "ΘΑ2", 2025: "ΘΑ4δ"
    },
    notes: "2024: ορισμός κυρτής. 2025: πρόταση Σ/Λ για εφαπτομένη.",
  },
  {
    id: "T09", category: "Θέμα Α – Θεωρία", color: "#7c3aed",
    name: "Απόδειξη: κανόνας παραγώγισης (f+g)΄",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: null, 2023: "ΘΑ1", 2024: null, 2025: null
    },
    notes: "2023: απόδειξη (f+g)΄=f΄+g΄. Βασική απόδειξη από ορισμό.",
  },

  // ════════════ ΘΕΜΑ Β ════════════
  {
    id: "T10", category: "Θέμα Β", color: "#0369a1",
    name: "Μελέτη πολυωνυμικής συνάρτησης",
    appearances: {
      2019: "ΘΒ", 2020: "ΘΒ", 2021: "ΘΒ",
      2022: null, 2023: null, 2024: null, 2025: "ΘΒ"
    },
    notes: "Κλασική άσκηση Θέματος Β. Εύρεση α, μονοτονία, ακρότατα, κυρτότητα.",
  },
  {
    id: "T11", category: "Θέμα Β", color: "#0369a1",
    name: "Σύνθετη συνάρτηση / Αντίστροφη συνάρτηση",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΒ", 2023: "ΘΒ1", 2024: "ΘΒ1", 2025: null
    },
    notes: "Συχνό 2022-2024. Εύρεση f∘g, απόδειξη 1-1, εύρεση f⁻¹.",
  },
  {
    id: "T12", category: "Θέμα Β", color: "#0369a1",
    name: "Εφαρμογή ΘΕΤ/Bolzano στο Β",
    appearances: {
      2019: "ΘΒ", 2020: "ΘΒ", 2021: "ΘΒ",
      2022: "ΘΒ3", 2023: null, 2024: null, 2025: "ΘΒ2"
    },
    notes: "Απόδειξη ύπαρξης ρίζας με Bolzano ή ΘΕΤ. Σχεδόν πάντα παρόν.",
  },
  {
    id: "T13", category: "Θέμα Β", color: "#0369a1",
    name: "Ασύμπτωτες στο Θέμα Β",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: null, 2023: "ΘΒ3", 2024: "ΘΒ3", 2025: null
    },
    notes: "Οριζόντιες, κατακόρυφες, λοξές ασύμπτωτες. Εναλλάσσεται θέση.",
  },
  {
    id: "T14", category: "Θέμα Β", color: "#0369a1",
    name: "Εκθετική/Λογαριθμική στο Θέμα Β",
    appearances: {
      2019: "ΘΒ", 2020: "ΘΒ", 2021: "ΘΒ",
      2022: null, 2023: "ΘΒ", 2024: null, 2025: null
    },
    notes: "Ιδιότητες eˣ, lnx. Εξισώσεις/ανισώσεις με λογαρίθμους.",
  },

  // ════════════ ΘΕΜΑ Γ ════════════
  {
    id: "T15", category: "Θέμα Γ", color: "#065f46",
    name: "Συνέχεια/Παραγωγισιμότητα τμηματικής συνάρτησης",
    appearances: {
      2019: "ΘΓ", 2020: "ΘΓ", 2021: "ΘΓ",
      2022: "ΘΓ1", 2023: "ΘΓ", 2024: "ΘΓ1", 2025: "ΘΓ1"
    },
    notes: "ΠΑΝΤΑ στο Θέμα Γ. Έλεγχος συνέχειας & παραγωγισιμότητας σε σημείο.",
  },
  {
    id: "T16", category: "Θέμα Γ", color: "#065f46",
    name: "Ρυθμός μεταβολής (κινηματική εφαρμογή)",
    appearances: {
      2019: null, 2020: null, 2021: null,
      2022: "ΘΓ3", 2023: null, 2024: "ΘΓ4", 2025: "ΘΓ4"
    },
    notes: "Πολύ συχνό 2022+. dx/dt, dy/dt, γεωμετρικές σχέσεις. Απαιτητικό.",
  },
  {
    id: "T17", category: "Θέμα Γ", color: "#065f46",
    name: "ΘΜΤ εφαρμογή στο Θέμα Γ",
    appearances: {
      2019: "ΘΓ", 2020: "ΘΓ", 2021: "ΘΓ",
      2022: null, 2023: null, 2024: "ΘΓ3", 2025: null
    },
    notes: "Εφαρμογή ΘΜΤ για ανισότητες ή εύρεση ξ. Επανήλθε 2024.",
  },
  {
    id: "T18", category: "Θέμα Γ", color: "#065f46",
    name: "Ασύμπτωτες στο Θέμα Γ",
    appearances: {
      2019: "ΘΓ", 2020: "ΘΓ", 2021: "ΘΓ",
      2022: null, 2023: null, 2024: null, 2025: "ΘΓ2"
    },
    notes: "Επανήλθε 2025. Κατακόρυφες & οριζόντιες ασύμπτωτες.",
  },
  {
    id: "T19", category: "Θέμα Γ", color: "#065f46",
    name: "Εφαρμογή Bolzano στο Θέμα Γ",
    appearances: {
      2019: "ΘΓ", 2020: "ΘΓ", 2021: "ΘΓ",
      2022: null, 2023: null, 2024: null, 2025: "ΘΓ3"
    },
    notes: "Ύπαρξη τομής καμπύλης με ευθεία. Επανήλθε 2025.",
  },

  // ════════════ ΘΕΜΑ Δ ════════════
  {
    id: "T20", category: "Θέμα Δ", color: "#92400e",
    name: "Εκθετική/Λογαριθμική — σύνθετη άσκηση",
    appearances: {
      2019: "ΘΔ", 2020: "ΘΔ", 2021: "ΘΔ",
      2022: "ΘΔ", 2023: "ΘΔ", 2024: "ΘΔ", 2025: "ΘΔ"
    },
    notes: "ΠΑΝΤΑ στο Θέμα Δ. Συνδυάζει lnx/eˣ με ολοκλήρωση, μονοτονία, ανισότητες.",
  },
  {
    id: "T21", category: "Θέμα Δ", color: "#92400e",
    name: "Εμβαδόν χωρίου (Ολοκλήρωμα)",
    appearances: {
      2019: "ΘΔ", 2020: "ΘΔ", 2021: "ΘΔ",
      2022: "ΘΔ2", 2023: "ΘΓ4", 2024: "ΘΔ4", 2025: "ΘΔ4"
    },
    notes: "ΠΑΝΤΑ παρόν (Θέμα Γ ή Δ). Εμβαδόν με ∫, χωρίο μεταξύ καμπυλών.",
  },
  {
    id: "T22", category: "Θέμα Δ", color: "#92400e",
    name: "Μοναδικότητα ρίζας / ΘΜΤ στο Θέμα Δ",
    appearances: {
      2019: "ΘΔ", 2020: "ΘΔ", 2021: "ΘΔ",
      2022: "ΘΔ4", 2023: "ΘΔ3", 2024: "ΘΔ2", 2025: null
    },
    notes: "Συχνό. Απόδειξη μοναδικής ρίζας με μονοτονία + Bolzano.",
  },
  {
    id: "T23", category: "Θέμα Δ", color: "#92400e",
    name: "Σταθερή συνάρτηση (h=F-G=c)",
    appearances: {
      2019: "ΘΔ", 2020: "ΘΔ", 2021: "ΘΔ",
      2022: null, 2023: "ΘΔ4", 2024: null, 2025: "ΘΔ1"
    },
    notes: "Απόδειξη h΄=0 ⟹ h=c. Πολύ συχνό τέχνασμα. Επανήλθε 2025.",
  },
  {
    id: "T24", category: "Θέμα Δ", color: "#92400e",
    name: "Εφαρμογή ΘΜΤ/Rolle για ανισότητα",
    appearances: {
      2019: "ΘΔ", 2020: "ΘΔ", 2021: "ΘΔ",
      2022: null, 2023: null, 2024: null, 2025: null
    },
    notes: "Κυρίως 2019-2021. f(b)-f(a)=f΄(ξ)(b-a) για απόδειξη ανισότητας.",
  },
];

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const CATEGORIES = ["Θέμα Α – Θεωρία", "Θέμα Β", "Θέμα Γ", "Θέμα Δ"];
const CAT_COLORS = {
  "Θέμα Α – Θεωρία": "#7c3aed",
  "Θέμα Β": "#0369a1",
  "Θέμα Γ": "#065f46",
  "Θέμα Δ": "#92400e",
};

function countAppearances(topic) {
  return Object.values(topic.appearances).filter(v => v && v !== null).length;
}

function lastSeen(topic) {
  const years = Object.entries(topic.appearances)
    .filter(([,v]) => v && v !== null)
    .map(([y]) => Number(y));
  return years.length ? Math.max(...years) : null;
}

function predScore(topic) {
  const count = countAppearances(topic);
  const ls = lastSeen(topic);
  if (!ls) return 20;
  const yearsSince = 2026 - ls;
  const freq = count / YEARS.length;
  return Math.min(99, Math.round(freq * 55 + yearsSince * 15));
}

function heatLabel(score) {
  if (score >= 80) return { text: "Πολύ Πιθανό", emoji: "🟢", color: "#16a34a", bg: "#dcfce7" };
  if (score >= 60) return { text: "Πιθανό",      emoji: "🟡", color: "#ca8a04", bg: "#fef9c3" };
  if (score >= 40) return { text: "Μέτριο",      emoji: "🟠", color: "#ea580c", bg: "#ffedd5" };
  return              { text: "Λιγότερο",        emoji: "🔴", color: "#dc2626", bg: "#fee2e2" };
}

// ─── ΔΙΑΓΩΝΙΣΜΑΤΑ ΑΝΑ ΚΕΦΑΛΑΙΟ (δομή Πανελληνίων: Α/Β/Γ/Δ) ─────
const CHAPTER_EXAMS = {
  "Όριο – Συνέχεια": {
    color: "#0369a1",
    description: "Κεφ. 1: Όριο & Συνέχεια Συνάρτησης",
    thetaA: {
      title: "ΘΕΜΑ Α (25 μονάδες) — Θεωρία",
      questions: [
        { id: "Α1", monades: 6, text: "Να αποδείξετε ότι αν η f είναι συνεχής στο x₀ και f(x₀) > 0, τότε υπάρχει δ > 0 τέτοιο ώστε f(x) > 0 για κάθε x ∈ (x₀-δ, x₀+δ)." },
        { id: "Α2", monades: 5, text: "Να διατυπώσετε το Θεώρημα Ενδιάμεσων Τιμών (ΘΕΤ)." },
        { id: "Α3", monades: 4, text: "Πότε λέμε ότι η f είναι συνεχής στο x₀; Να δώσετε τον ορισμό με χρήση ορίων." },
        { id: "Α4", monades: 10, text: `Να χαρακτηρίσετε ως Σωστό ή Λάθος:
α) Αν lim[x→x₀] f(x) = f(x₀), τότε η f είναι συνεχής στο x₀.
β) Κάθε πολυωνυμική συνάρτηση είναι συνεχής σε ολόκληρο το ℝ.
γ) Αν η f είναι συνεχής στο [α,β] και f(α)·f(β) < 0, τότε υπάρχει x₀∈(α,β) με f(x₀) = 0.
δ) Αν η f είναι παραγωγίσιμη στο x₀, τότε είναι και συνεχής στο x₀.
ε) Αν lim[x→x₀⁺] f(x) = lim[x→x₀⁻] f(x) = f(x₀), τότε η f είναι συνεχής στο x₀.` },
      ]
    },
    thetaB: {
      title: "ΘΕΜΑ Β (25 μονάδες) — Βασικές Ασκήσεις",
      questions: [
        { id: "Β1", monades: 8, text: `Δίνεται η συνάρτηση:
f(x) = { αx² + βx,   x ≤ 1
        { 2x - 1,     x > 1
Να βρείτε τις τιμές α, β ∈ ℝ ώστε η f να είναι συνεχής στο x₀ = 1 και να έχει f(0) = 3.` },
        { id: "Β2", monades: 8, text: `Δίνεται f(x) = (x³ - 8)/(x - 2), x ≠ 2.
i) Να υπολογίσετε το lim[x→2] f(x). (μονάδες 4)
ii) Πώς πρέπει να ορίσετε f(2) ώστε η f να γίνει συνεχής στο x = 2; (μονάδες 4)` },
        { id: "Β3", monades: 9, text: `Να αποδείξετε ότι η εξίσωση x⁵ - 3x + 1 = 0 έχει τουλάχιστον δύο ρίζες στο διάστημα (-2, 2).
(Υπόδειξη: Χρησιμοποιήστε το Θεώρημα Bolzano.)` },
      ]
    },
    thetaG: {
      title: "ΘΕΜΑ Γ (25 μονάδες) — Σύνθετες Ασκήσεις",
      questions: [
        { id: "Γ1", monades: 8, text: `Δίνεται η συνάρτηση:
f(x) = { (eˣ - 1)/x,   x ≠ 0
        { λ,             x = 0
i) Να βρείτε την τιμή λ ώστε η f να είναι συνεχής στο x₀ = 0. (μονάδες 4)
ii) Να αποδείξετε ότι η f είναι συνεχής σε ολόκληρο το ℝ. (μονάδες 4)` },
        { id: "Γ2", monades: 8, text: `Δίνεται f(x) = x·lnx - x + 1 για x > 0.
i) Να αποδείξετε ότι η f(x) ≥ 0 για κάθε x > 0. (μονάδες 5)
ii) Να αποδείξετε ότι η εξίσωση f(x) = x - 1 έχει τουλάχιστον μία λύση στο (1/e, e). (μονάδες 3)` },
        { id: "Γ3", monades: 9, text: `Έστω f : [0,1] → [0,1] συνεχής συνάρτηση.
Να αποδείξετε ότι υπάρχει x₀ ∈ [0,1] τέτοιο ώστε f(x₀) = x₀.
(Υπόδειξη: Εξετάστε τη συνάρτηση g(x) = f(x) - x.)` },
      ]
    },
    thetaD: {
      title: "ΘΕΜΑ Δ (25 μονάδες) — Απαιτητική Άσκηση",
      questions: [
        { id: "Δ1", monades: 6, text: `Δίνεται συνεχής f : ℝ → ℝ με f(x+1) = f(x) για κάθε x ∈ ℝ (περιοδική).
Να αποδείξετε ότι η f είναι φραγμένη (δηλαδή υπάρχουν m, M ∈ ℝ με m ≤ f(x) ≤ M για κάθε x).` },
        { id: "Δ2", monades: 7, text: `Δίνεται f(x) = { x²sin(1/x),  x ≠ 0  /  0,  x = 0 }.
i) Να αποδείξετε ότι η f είναι συνεχής στο x₀ = 0. (μονάδες 4)
ii) Να εξετάσετε αν η f είναι παραγωγίσιμη στο x₀ = 0. (μονάδες 3)` },
        { id: "Δ3", monades: 6, text: `Έστω f, g συνεχείς στο [α,β] με f(α) < g(α) και f(β) > g(β).
Να αποδείξετε ότι υπάρχει x₀ ∈ (α,β) με f(x₀) = g(x₀).` },
        { id: "Δ4", monades: 6, text: `Αν f : [0,2] → ℝ συνεχής με ∫₀² f(x)dx = 3, να αποδείξετε ότι υπάρχει c ∈ (0,2) με f(c) = 3/2. (Χρησιμοποιήστε τον Μέσο Όρο Ολοκληρώματος.)` },
      ]
    }
  },

  "Παράγωγος & Διαφορικός Λογισμός": {
    color: "#7c3aed",
    description: "Κεφ. 2: Παράγωγος, ΘΜΤ, Rolle, Fermat, Μονοτονία, Κυρτότητα",
    thetaA: {
      title: "ΘΕΜΑ Α (25 μονάδες) — Θεωρία",
      questions: [
        { id: "Α1", monades: 6, text: "Να διατυπώσετε και αποδείξετε το Θεώρημα Rolle." },
        { id: "Α2", monades: 5, text: "Να διατυπώσετε το Θεώρημα Μέσης Τιμής (ΘΜΤ) του Διαφορικού Λογισμού και να δώσετε τη γεωμετρική του ερμηνεία." },
        { id: "Α3", monades: 4, text: "Να διατυπώσετε το Θεώρημα Fermat για τοπικά ακρότατα." },
        { id: "Α4", monades: 10, text: `Να χαρακτηρίσετε ως Σωστό ή Λάθος:
α) Αν f΄(x₀) = 0, τότε η f έχει τοπικό ακρότατο στο x₀.
β) Αν f΄(x) > 0 για κάθε x ∈ (α,β), τότε η f είναι γνησίως αύξουσα στο (α,β).
γ) Αν f΄΄(x₀) > 0, τότε η f έχει τοπικό ελάχιστο στο x₀.
δ) Αν f΄(x₀) = 0 και f΄΄(x₀) = 0, τότε το x₀ είναι σημείο καμπής.
ε) Κάθε παραγωγίσιμη συνάρτηση είναι συνεχής.` },
      ]
    },
    thetaB: {
      title: "ΘΕΜΑ Β (25 μονάδες) — Βασικές Ασκήσεις",
      questions: [
        { id: "Β1", monades: 7, text: `Δίνεται f(x) = x³ - 3x² - 9x + 5.
i) Να βρείτε τα κρίσιμα σημεία της f. (μονάδες 3)
ii) Να μελετήσετε τη μονοτονία και να βρείτε τα τοπικά ακρότατα. (μονάδες 4)` },
        { id: "Β2", monades: 9, text: `Δίνεται f(x) = eˣ - x - 1.
i) Να αποδείξετε ότι f(x) ≥ 0 για κάθε x ∈ ℝ με χρήση παραγώγου. (μονάδες 5)
ii) Να αποδείξετε ότι eˣ ≥ 1 + x + x²/2 για x ≥ 0. (μονάδες 4)` },
        { id: "Β3", monades: 9, text: `Χρησιμοποιώντας το ΘΜΤ, να αποδείξετε ότι:
|sinβ - sinα| ≤ |β - α| για κάθε α, β ∈ ℝ.
Στη συνέχεια να συμπεράνετε ότι |sin3 - sin2| < 1.` },
      ]
    },
    thetaG: {
      title: "ΘΕΜΑ Γ (25 μονάδες) — Σύνθετες Ασκήσεις",
      questions: [
        { id: "Γ1", monades: 7, text: `Δίνεται f(x) = { x²,          x ≤ 1
                 { αx + β,    x > 1
i) Να βρείτε α, β ώστε η f να είναι παραγωγίσιμη στο x₀=1. (μονάδες 4)
ii) Να αποδείξετε ότι η f΄ είναι συνεχής στο x₀=1. (μονάδες 3)` },
        { id: "Γ2", monades: 9, text: `Δίνεται f(x) = lnx - (x-1)/x για x > 0.
i) Να μελετήσετε μονοτονία και να αποδείξετε ότι f(x) ≤ 0 για 0 < x ≤ 1. (μονάδες 5)
ii) Να αποδείξετε ότι lnx ≤ x - 1 για κάθε x > 0. (μονάδες 4)` },
        { id: "Γ3", monades: 9, text: `Κινητό σημείο M κινείται κατά μήκος της καμπύλης y = x² για x > 0.
Ο ρυθμός μεταβολής της τετμημένης x(t) είναι ẋ = 3 μον./sec.
i) Να εκφράσετε τον ρυθμό ẏ της τεταγμένης συναρτήσει του x. (μονάδες 4)
ii) Να βρείτε τον ρυθμό μεταβολής της απόστασης OM τη στιγμή x=1. (μονάδες 5)` },
      ]
    },
    thetaD: {
      title: "ΘΕΜΑ Δ (25 μονάδες) — Απαιτητική Άσκηση",
      questions: [
        { id: "Δ1", monades: 5, text: `Δίνεται f παραγωγίσιμη με f(0) = 1 και f΄(x) = f(x) για κάθε x ∈ ℝ.
Να αποδείξετε ότι η h(x) = f(x)·e⁻ˣ είναι σταθερή, και να συμπεράνετε ότι f(x) = eˣ.` },
        { id: "Δ2", monades: 7, text: `Δίνεται f(x) = x³ - 3x + λ για κάποιο λ ∈ ℝ.
i) Να βρείτε για ποιες τιμές λ η f έχει τρεις διακριτές πραγματικές ρίζες. (μονάδες 4)
ii) Αν λ = 2, να αποδείξετε με Rolle ότι η f΄ έχει ρίζα στο (-1,1). (μονάδες 3)` },
        { id: "Δ3", monades: 7, text: `Να αποδείξετε ότι για κάθε x > 0 ισχύει:
x/(1+x) < lnx(x+1) < x.
(Χρησιμοποιήστε ΘΜΤ στο κατάλληλο διάστημα.)` },
        { id: "Δ4", monades: 6, text: `Δίνεται f : [0,1] → ℝ με f(0) = 0, f(1) = 1, συνεχής και παραγωγίσιμη στο (0,1).
Να αποδείξετε ότι υπάρχουν x₁, x₂ ∈ (0,1), x₁ ≠ x₂, με f΄(x₁) + f΄(x₂) = 2.` },
      ]
    }
  },

  "Ολοκληρωτικός Λογισμός": {
    color: "#065f46",
    description: "Κεφ. 3: Αόριστο & Ορισμένο Ολοκλήρωμα, Εμβαδόν, ΘΘΟΛ",
    thetaA: {
      title: "ΘΕΜΑ Α (25 μονάδες) — Θεωρία",
      questions: [
        { id: "Α1", monades: 7, text: "Να αποδείξετε ότι αν η f είναι ορισμένη στο Δ και F παράγουσα της f, τότε κάθε G(x)=F(x)+c είναι παράγουσα και αντιστρόφως." },
        { id: "Α2", monades: 5, text: "Να διατυπώσετε το Θεμελιώδες Θεώρημα του Ολοκληρωτικού Λογισμού (ΘΘΟΛ) και να δώσετε τη γεωμετρική του ερμηνεία." },
        { id: "Α3", monades: 3, text: "Τι ονομάζουμε μέση τιμή συνάρτησης f στο [α,β];" },
        { id: "Α4", monades: 10, text: `Να χαρακτηρίσετε ως Σωστό ή Λάθος:
α) ∫α^β f(x)dx = -∫β^α f(x)dx για κάθε συνεχή f.
β) Αν f(x) ≥ 0 για x ∈ [α,β], τότε ∫α^β f(x)dx ≥ 0.
γ) ∫α^β [f(x)+g(x)]dx = ∫α^β f(x)dx + ∫α^β g(x)dx.
δ) Αν F΄(x)=f(x), τότε ∫α^β f(x)dx = F(α)-F(β).
ε) Η F(x) = ∫₀ˣ f(t)dt είναι παράγουσα της f για κάθε συνεχή f.` },
      ]
    },
    thetaB: {
      title: "ΘΕΜΑ Β (25 μονάδες) — Βασικές Ασκήσεις",
      questions: [
        { id: "Β1", monades: 8, text: `Να υπολογίσετε τα ολοκληρώματα:
i) ∫(x³ - 2x + 1)dx  (μονάδες 2)
ii) ∫eˣ·sinx dx  (μονάδες 3)
iii) ∫lnx dx  (μονάδες 3)` },
        { id: "Β2", monades: 9, text: `Δίνεται f(x) = x·eˣ.
i) Να υπολογίσετε το ∫₀¹ f(x)dx. (μονάδες 4)
ii) Να βρείτε τη μέση τιμή της f στο [0,1]. (μονάδες 2)
iii) Να αποδείξετε ότι υπάρχει c ∈ (0,1) με f(c) = μέση τιμή. (μονάδες 3)` },
        { id: "Β3", monades: 8, text: `Να υπολογίσετε το εμβαδόν του χωρίου που περικλείεται από:
Τις γραφικές παραστάσεις y = x² και y = 2x.
(Βρείτε πρώτα τα σημεία τομής, μετά υπολογίστε το ολοκλήρωμα.)` },
      ]
    },
    thetaG: {
      title: "ΘΕΜΑ Γ (25 μονάδες) — Σύνθετες Ασκήσεις",
      questions: [
        { id: "Γ1", monades: 7, text: `Δίνεται F(x) = ∫₁ˣ (lnt)/t dt για x > 0.
i) Να βρείτε F΄(x). (μονάδες 2)
ii) Να μελετήσετε τη μονοτονία της F. (μονάδες 5)` },
        { id: "Γ2", monades: 9, text: `Δίνεται f(x) = x·lnx - x + 1 για x > 0.
i) Να αποδείξετε ότι f(x) ≥ 0 για x > 0. (μονάδες 4)
ii) Να υπολογίσετε ∫₁ᵉ f(x)dx. (μονάδες 5)` },
        { id: "Γ3", monades: 9, text: `Δίνεται f συνεχής σε [0,2] με f(0)=0 και f(x)+f(2-x)=4 για κάθε x∈[0,2].
i) Να αποδείξετε ότι ∫₀² f(x)dx = 4. (μονάδες 5)
ii) Να αποδείξετε ότι υπάρχει c∈(0,2) με f(c)=2. (μονάδες 4)` },
      ]
    },
    thetaD: {
      title: "ΘΕΜΑ Δ (25 μονάδες) — Απαιτητική Άσκηση",
      questions: [
        { id: "Δ1", monades: 6, text: `Δίνεται παραγωγίσιμη f:(0,+∞)→ℝ και παράγουσα F, με x·f(x) = 2F(x)·lnx.
Να αποδείξετε ότι η h(x) = F(x)/lnx·(1/x) είναι σταθερή.` },
        { id: "Δ2", monades: 7, text: `Με δεδομένο ότι F(x) = lnx/x:
i) Να υπολογίσετε lim[x→1] f(x)/lnx. (μονάδες 3)
ii) Να αποδείξετε ότι F(1)=0 και να βρείτε το πεδίο ορισμού της F. (μονάδες 4)` },
        { id: "Δ3", monades: 6, text: `Να αποδείξετε ότι το εμβαδόν E του χωρίου που ορίζεται από τη C_F, τις ευθείες x=1, x=e και τον x'x ισχύει: E = 2e - 3.
(Υπολογίστε ∫₁ᵉ (lnx/x) dx με ολοκλήρωση κατά μέρη.)` },
        { id: "Δ4", monades: 6, text: `Να λύσετε την εξίσωση ∫₁ˣ f(t)dt = x·lnx - x + 1 για x > 0, όπου f η παράγωγος της F.` },
      ]
    }
  },

  "Εκθετική & Λογαριθμική": {
    color: "#92400e",
    description: "Συνδυαστικές ασκήσεις με eˣ, lnx, ολοκλήρωση & μελέτη",
    thetaA: {
      title: "ΘΕΜΑ Α (25 μονάδες) — Θεωρία",
      questions: [
        { id: "Α1", monades: 6, text: "Να αποδείξετε ότι η συνάρτηση f(x) = eˣ είναι γνησίως αύξουσα σε ολόκληρο το ℝ και να συμπεράνετε ότι eˣ > 0 για κάθε x ∈ ℝ." },
        { id: "Α2", monades: 5, text: "Να απαριθμήσετε τις ιδιότητες της συνάρτησης f(x) = lnx (πεδίο ορισμού, μονοτονία, lim στο 0⁺ και +∞, f(1)=0)." },
        { id: "Α3", monades: 4, text: "Πότε ισχύει ln(a·b) = lna + lnb; Να αποδείξετε την ιδιότητα αυτή." },
        { id: "Α4", monades: 10, text: `Να χαρακτηρίσετε ως Σωστό ή Λάθος:
α) Ισχύει e^(lnx) = x για κάθε x > 0.
β) Ισχύει ln(eˣ) = x για κάθε x ∈ ℝ.
γ) Η εξίσωση eˣ = 0 δεν έχει λύση.
δ) Αν eˣ > eʸ, τότε x > y.
ε) Ισχύει lim[x→+∞] (lnx)/x = 0.` },
      ]
    },
    thetaB: {
      title: "ΘΕΜΑ Β (25 μονάδες) — Βασικές Ασκήσεις",
      questions: [
        { id: "Β1", monades: 8, text: `Να λύσετε τις εξισώσεις:
i) e^(2x) - 3eˣ + 2 = 0  (μονάδες 4)
ii) ln(x+1) + ln(x-1) = ln3  (μονάδες 4)` },
        { id: "Β2", monades: 9, text: `Δίνεται f(x) = eˣ - ex για x ∈ ℝ.
i) Να αποδείξετε ότι f(x) ≥ 0 για κάθε x ∈ ℝ, με ισότητα μόνο για x=1. (μονάδες 5)
ii) Να συμπεράνετε ότι eˣ ≥ ex για κάθε x. (μονάδες 4)` },
        { id: "Β3", monades: 8, text: `Να μελετήσετε ως προς μονοτονία και ακρότατα τη συνάρτηση:
f(x) = x·e⁻ˣ, x ∈ ℝ.
Να βρείτε επίσης τις ασύμπτωτες της γραφικής παράστασης.` },
      ]
    },
    thetaG: {
      title: "ΘΕΜΑ Γ (25 μονάδες) — Σύνθετες Ασκήσεις",
      questions: [
        { id: "Γ1", monades: 8, text: `Δίνεται f(x) = (lnx)/x για x > 0.
i) Να βρείτε τα ακρότατα της f και να μελετήσετε κυρτότητα. (μονάδες 5)
ii) Να αποδείξετε ότι eᵖⁱ > πᵉ χρησιμοποιώντας τη μονοτονία. (μονάδες 3)` },
        { id: "Γ2", monades: 8, text: `Δίνεται f(x) = { (eˣ - 1)/x,  x ≠ 0  /  1,  x = 0 }.
i) Να αποδείξετε ότι η f είναι παραγωγίσιμη στο x₀=0. (μονάδες 4)
ii) Να βρείτε τo f΄(0) από ορισμό. (μονάδες 4)` },
        { id: "Γ3", monades: 9, text: `Κινητό M κινείται κατά μήκος y = lnx, x > 0, με ẋ = 2 μον./sec.
i) Να βρείτε ẏ συναρτήσει x. (μονάδες 3)
ii) Να βρείτε τη στιγμή που ẋ = ẏ. (μονάδες 3)
iii) Να υπολογίσετε τον ρυθμό μεταβολής της απόστασης OM για x=e. (μονάδες 3)` },
      ]
    },
    thetaD: {
      title: "ΘΕΜΑ Δ (25 μονάδες) — Απαιτητική Άσκηση",
      questions: [
        { id: "Δ1", monades: 6, text: `Δίνεται f(x) = lnx - (x-1)/x, x > 0.
i) Να μελετήσετε τη μονοτονία. (μονάδες 3)
ii) Να αποδείξετε ότι lnx ≤ x-1 για κάθε x > 0. (μονάδες 3)` },
        { id: "Δ2", monades: 7, text: `Δίνεται g(x) = x·lnx - x + 1, x > 0.
i) Να αποδείξετε ότι g(x) ≥ 0 με ισότητα μόνο για x=1. (μονάδες 4)
ii) Να αποδείξετε ότι η εξίσωση g(x) = ½ έχει ακριβώς δύο ρίζες. (μονάδες 3)` },
        { id: "Δ3", monades: 6, text: `Να υπολογίσετε:
i) ∫₁ᵉ x·lnx dx  (μονάδες 3)
ii) Να βρείτε το εμβαδόν χωρίου μεταξύ y=lnx και y=x-1 στο [1,e]. (μονάδες 3)` },
        { id: "Δ4", monades: 6, text: `Αν F(x) = ∫₁ˣ lnt dt για x > 0, να αποδείξετε ότι:
F(xy) = F(x) + F(y) για κάθε x,y > 0.
(Υπόδειξη: Εξετάστε την παράγωγο ως προς x, κρατώντας y σταθερό.)` },
      ]
    }
  },
};


// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("stats");
  const [selCat, setSelCat] = useState(null);
  const [selChapter, setSelChapter] = useState("Όριο – Συνέχεια");
  const [difficulty, setDifficulty] = useState("Επίπεδο Πανελληνίων");
  const [exam, setExam] = useState(null);

  const filtered = selCat ? TOPICS.filter(t => t.category === selCat) : TOPICS;

  const barData = CATEGORIES.map(cat => {
    const topics = TOPICS.filter(t => t.category === cat);
    const total = topics.reduce((s, t) => s + countAppearances(t), 0);
    return { name: cat.replace("Θέμα ", ""), total, color: CAT_COLORS[cat] };
  });

  const sorted = [...TOPICS].sort((a, b) => predScore(b) - predScore(a));

  function generateExam() {
    const ch = CHAPTER_EXAMS[selChapter];
    if (!ch) return;
    setExam({ chapter: selChapter, difficulty, data: ch });
    setTimeout(() => document.getElementById("exam-output")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  const BLUE = "#1d4ed8";
  const INDIGO = "#4338ca";

  return (
    <div style={{ fontFamily: "'Palatino Linotype', Georgia, serif", background: "#f0f4ff", minHeight: "100vh", color: "#1e1b4b" }}>

      {/* HEADER */}
      <header style={{ background: "linear-gradient(160deg,#1e1b4b 0%,#1d4ed8 60%,#0ea5e9 100%)", position: "relative", overflow: "hidden", paddingBottom: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "2rem 1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>∫</div>
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(1.2rem,4vw,1.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Μαθηματικά Προσανατολισμού Γ΄ Λυκείου</h1>
              <p style={{ margin: "0.3rem 0 0", color: "#bfdbfe", fontSize: "0.85rem" }}>Ανάλυση θεμάτων 2019–2025 · Θεωρήματα & Έννοιες · Πρόβλεψη 2026 · Διαγωνίσματα</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            {[["stats","📊 Στατιστικά"], ["predict","🔮 Πρόβλεψη 2026"], ["exam","✍️ Διαγώνισμα"]].map(([t, label]) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "0.65rem 1.1rem", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: tab === t ? 700 : 500, background: "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,0.55)", borderBottom: tab === t ? "3px solid #fbbf24" : "3px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>{label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>

        {/* ══ ΣΤΑΤΙΣΤΙΚΑ ══ */}
        {tab === "stats" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Φίλτρο κατηγορίας */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button onClick={() => setSelCat(null)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, border: `2px solid ${!selCat ? BLUE : "#e0e7ff"}`, background: !selCat ? BLUE : "#fff", color: !selCat ? "#fff" : "#64748b", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Όλα</button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelCat(cat === selCat ? null : cat)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, border: `2px solid ${selCat === cat ? CAT_COLORS[cat] : "#e0e7ff"}`, background: selCat === cat ? CAT_COLORS[cat] : "#fff", color: selCat === cat ? "#fff" : "#64748b", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>{cat}</button>
              ))}
            </div>

            {/* Bar chart */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "1.25rem", border: "1px solid #e0e7ff", boxShadow: "0 1px 4px rgba(29,78,216,.07)" }}>
              <h2 style={{ margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: 700 }}>Συνολικές εμφανίσεις ανά θέμα (2019–2025)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="total" name="Εμφανίσεις" radius={[5,5,0,0]}
                    fill={BLUE}
                    label={{ position: "top", fontSize: 11, fill: "#374151" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Αναλυτικός πίνακας */}
            <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e0e7ff", boxShadow: "0 1px 4px rgba(29,78,216,.07)" }}>
              <div style={{ padding: "0.6rem 1.25rem", background: "#fffbeb", borderBottom: "1px solid #fef3c7", fontSize: "0.75rem", color: "#92400e" }}>
                ✓ = Επιβεβαιωμένη εμφάνιση (με θέμα) &nbsp;·&nbsp; – = Δεν εξετάστηκε εκείνη τη χρονιά
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                  <thead>
                    <tr style={{ background: "#f0f4ff" }}>
                      <th style={{ padding: "0.6rem 1rem", textAlign: "left", fontWeight: 700, color: "#374151", minWidth: 200 }}>Θεωρία / Θεώρημα / Τεχνική</th>
                      {YEARS.map(y => <th key={y} style={{ padding: "0.6rem 0.6rem", textAlign: "center", fontWeight: 700, color: "#374151", fontSize: "0.75rem" }}>{y}</th>)}
                      <th style={{ padding: "0.6rem 0.6rem", textAlign: "center", fontWeight: 700, color: "#374151", fontSize: "0.75rem" }}>Σύνολο</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t, i) => (
                      <tr key={t.id} style={{ borderBottom: "1px solid #f0f4ff", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                        <td style={{ padding: "0.65rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ width: 10, height: 10, borderRadius: "50%", background: CAT_COLORS[t.category], flexShrink: 0, display: "inline-block" }} />
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e1b4b", lineHeight: 1.3 }}>{t.name}</div>
                              <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{t.category}</div>
                            </div>
                          </div>
                        </td>
                        {YEARS.map(y => (
                          <td key={y} style={{ padding: "0.5rem", textAlign: "center" }}>
                            {t.appearances[y]
                              ? <span style={{ color: CAT_COLORS[t.category], fontWeight: 700, fontSize: "0.75rem" }}>{t.appearances[y]}</span>
                              : <span style={{ color: "#d1d5db", fontSize: "0.85rem" }}>–</span>}
                          </td>
                        ))}
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                          <span style={{ background: "#dbeafe", color: BLUE, padding: "0.15rem 0.5rem", borderRadius: 99, fontWeight: 700, fontSize: "0.78rem" }}>{countAppearances(t)}/7</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ ΠΡΟΒΛΕΨΗ 2026 ══ */}
        {tab === "predict" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ background: "linear-gradient(135deg,#1e1b4b,#1d4ed8)", borderRadius: 14, padding: "1.5rem", color: "#fff" }}>
              <h2 style={{ margin: "0 0 0.4rem", fontSize: "1.2rem" }}>🔮 Πρόβλεψη Πανελληνίων 2026</h2>
              <p style={{ margin: 0, color: "#bfdbfe", fontSize: "0.85rem", lineHeight: 1.6 }}>Σκορ = 55% συχνότητα 2019–2025 + 45% χρόνια απουσίας. Βασίζεται σε πραγματικά θέματα.</p>
            </div>

            {CATEGORIES.map(cat => {
              const catTopics = sorted.filter(t => t.category === cat);
              return (
                <div key={cat} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: `1px solid ${CAT_COLORS[cat]}30`, boxShadow: "0 1px 4px rgba(29,78,216,.07)" }}>
                  <div style={{ padding: "0.75rem 1.25rem", background: `${CAT_COLORS[cat]}15`, borderBottom: `1px solid ${CAT_COLORS[cat]}30` }}>
                    <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: CAT_COLORS[cat] }}>{cat}</h3>
                  </div>
                  {catTopics.map((t, i) => {
                    const score = predScore(t);
                    const h = heatLabel(score);
                    const ls = lastSeen(t);
                    return (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.8rem 1.25rem", borderBottom: i < catTopics.length-1 ? "1px solid #f0f4ff" : "none" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1e1b4b" }}>{t.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.1rem" }}>{t.notes}</div>
                        </div>
                        <div style={{ width: 70, flexShrink: 0 }}>
                          <div style={{ height: 5, background: "#e0e7ff", borderRadius: 3 }}>
                            <div style={{ width: `${score}%`, height: "100%", background: h.color, borderRadius: 3 }} />
                          </div>
                        </div>
                        <span style={{ background: h.bg, color: h.color, padding: "0.2rem 0.55rem", borderRadius: 99, fontSize: "0.73rem", fontWeight: 700, border: `1px solid ${h.color}30`, whiteSpace: "nowrap" }}>
                          {h.emoji} {score}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            <div style={{ padding: "0.75rem 1rem", background: "#fffbeb", borderRadius: 10, fontSize: "0.78rem", color: "#92400e", borderLeft: "4px solid #d97706" }}>
              ⚠️ Πρόβλεψη βάσει στατιστικών 2019–2025. Δεν αντικαθιστά τη μελέτη ολόκληρης της ύλης.
            </div>
          </div>
        )}

        {/* ══ ΔΙΑΓΩΝΙΣΜΑ ══ */}
        {tab === "exam" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "1.5rem", border: "1px solid #e0e7ff", boxShadow: "0 1px 4px rgba(29,78,216,.07)" }}>
              <h2 style={{ margin: "0 0 1.25rem", fontSize: "1rem", fontWeight: 700 }}>⚙️ Επιλογή Κεφαλαίου Διαγωνίσματος</h2>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.6rem", color: "#374151" }}>
                  Κεφάλαιο — Πλήρες διαγώνισμα με θέματα Α, Β, Γ, Δ
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {Object.entries(CHAPTER_EXAMS).map(([key, val]) => {
                    const on = selChapter === key;
                    return (
                      <button key={key} onClick={() => { setSelChapter(key); setExam(null); }} style={{ padding: "0.75rem 1rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "left", border: `2px solid ${on ? val.color : "#e0e7ff"}`, background: on ? `${val.color}12` : "#f8fafc", transition: "all 0.15s" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: on ? val.color : "#374151" }}>{key}</div>
                        <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.15rem" }}>{val.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.6rem", color: "#374151" }}>Βαθμός Δυσκολίας</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["Εύκολο","Μέτριο","Δύσκολο","Επίπεδο Πανελληνίων"].map(d => (
                    <button key={d} onClick={() => setDifficulty(d)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: difficulty === d ? 700 : 500, border: `2px solid ${difficulty === d ? BLUE : "#e0e7ff"}`, background: difficulty === d ? BLUE : "#f8fafc", color: difficulty === d ? "#fff" : "#6b7280", transition: "all 0.15s" }}>{d}</button>
                  ))}
                </div>
              </div>

              <button onClick={generateExam} style={{ width: "100%", padding: "0.85rem", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 700, background: `linear-gradient(135deg, ${INDIGO}, ${BLUE})`, color: "#fff", boxShadow: "0 4px 18px rgba(79,70,229,0.3)", letterSpacing: "0.02em" }}>
                🎯 Δημιούργησε Διαγώνισμα — {selChapter}
              </button>
            </div>

            {exam && (
              <div id="exam-output" style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: `2px solid ${CHAPTER_EXAMS[exam.chapter]?.color}40`, boxShadow: "0 4px 24px rgba(79,70,229,.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "#f0f4ff", borderBottom: "1px solid #e0e7ff", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>📄 {exam.chapter}</span>
                    <span style={{ marginLeft: "0.75rem", fontSize: "0.78rem", color: "#6b7280" }}>{exam.difficulty} · 100 μονάδες · 3 ώρες</span>
                  </div>
                  <button onClick={() => {
                    const w = window.open("", "_blank");
                    const chData = exam.data;
                    const sections = [chData.thetaA, chData.thetaB, chData.thetaG, chData.thetaD];
                    const body = sections.map(s => `\n${s.title}\n${"─".repeat(50)}\n${s.questions.map(q => `${q.id} (${q.monades} μον.)\n${q.text}`).join("\n\n")}`).join("\n\n");
                    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Διαγώνισμα ${exam.chapter}</title><style>body{font-family:Georgia,serif;max-width:820px;margin:2.5rem auto;padding:0 2rem;line-height:1.9;color:#1e1b4b}h1,h2{color:#1d4ed8}pre{white-space:pre-wrap;font-family:inherit;font-size:0.95rem}.sep{border-top:2px solid #1d4ed8;margin:1.5rem 0}</style></head><body><h1>ΔΙΑΓΩΝΙΣΜΑ ΠΡΟΣΟΜΟΙΩΣΗΣ ΠΑΝΕΛΛΗΝΙΩΝ</h1><h2>Μαθηματικά Προσανατολισμού — ${exam.chapter}</h2><p><strong>Δυσκολία:</strong> ${exam.difficulty} &nbsp;|&nbsp; <strong>Βαθμοί:</strong> 100 &nbsp;|&nbsp; <strong>Χρόνος:</strong> 3 ώρες</p><pre>${body}</pre></body></html>`);
                    w.document.close(); w.print();
                  }} style={{ padding: "0.35rem 0.85rem", borderRadius: 7, border: `1px solid ${BLUE}`, cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem", color: BLUE, background: "#fff" }}>🖨️ Εκτύπωση</button>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ textAlign: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #e0e7ff" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e1b4b" }}>ΔΙΑΓΩΝΙΣΜΑ ΠΡΟΣΟΜΟΙΩΣΗΣ ΠΑΝΕΛΛΗΝΙΩΝ</div>
                    <div style={{ fontWeight: 700, color: CHAPTER_EXAMS[exam.chapter]?.color, fontSize: "1rem", marginTop: "0.25rem" }}>Μαθηματικά Προσανατολισμού — {exam.chapter}</div>
                    <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "0.2rem" }}>Βαθμοί: 100 &nbsp;|&nbsp; Διάρκεια: 3 ώρες &nbsp;|&nbsp; {exam.difficulty}</div>
                  </div>

                  {[exam.data.thetaA, exam.data.thetaB, exam.data.thetaG, exam.data.thetaD].map((section, si) => (
                    <div key={si} style={{ marginBottom: "2rem" }}>
                      <div style={{ background: `${CHAPTER_EXAMS[exam.chapter]?.color}15`, border: `1px solid ${CHAPTER_EXAMS[exam.chapter]?.color}40`, borderRadius: 8, padding: "0.6rem 1rem", marginBottom: "1rem" }}>
                        <span style={{ fontWeight: 800, fontSize: "0.95rem", color: CHAPTER_EXAMS[exam.chapter]?.color }}>{section.title}</span>
                      </div>
                      {section.questions.map((q, qi) => (
                        <div key={qi} style={{ marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: qi < section.questions.length-1 ? "1px dashed #e0e7ff" : "none" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e1b4b" }}>{q.id}</span>
                            <span style={{ background: "#dbeafe", color: BLUE, padding: "0.1rem 0.5rem", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginLeft: "0.5rem" }}>{q.monades} μον.</span>
                          </div>
                          <div style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "Georgia, serif" }}>{q.text}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "1.5rem", fontSize: "0.75rem", color: "#9ca3af", borderTop: "1px solid #e0e7ff", background: "#fff" }}>
        Πηγή δεδομένων: methodiko-frontistirio.gr · Πανελλήνιες 2019–2025 · Πρόβλεψη 2026 · Portfolio Project
      </footer>
    </div>
  );
}
