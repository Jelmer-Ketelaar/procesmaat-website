"use client";

import { useState } from "react";
import { TrackedLink } from "./tracked-link";

const questions = [
  { title: "Welk werk komt steeds terug?", options: ["Gegevens overtypen", "Controleren en goedkeuren", "Rapportages maken", "Klanten opvolgen"] },
  { title: "Waar werk je mee?", options: ["Spreadsheets en e-mail", "CRM en boekhouding", "Webshop en administratie", "Andere systemen"] },
  { title: "Hoe vaak gebeurt dit?", options: ["Dagelijks", "Wekelijks", "Maandelijks of minder"] },
  { title: "Hoeveel tijd kost het je team per week?", options: ["Minder dan 2 uur", "2–5 uur", "Meer dan 5 uur", "Weet ik nog niet"] },
  { title: "Zijn de stappen meestal hetzelfde?", options: ["Ja, met vaste regels", "Deels, met uitzonderingen", "Nee, steeds anders"] },
] as const;

export function QuickScan() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const complete = questions.every((_, index) => answers[index] !== undefined);
  const irregular = answers[4] === 2;
  const occasional = answers[2] === 2 || answers[3] === 0;
  const title = irregular ? "Breng eerst de beslissingen in kaart." : occasional ? "Begin klein en kijk wat het oplevert." : "Dit proces is het onderzoeken waard.";
  const explanation = irregular
    ? "Als elke situatie anders is, helpt het om eerst vaste stappen en beslismomenten te vinden. Misschien kan de voorbereiding automatisch, terwijl een medewerker blijft beslissen."
    : occasional
      ? "Bij weinig herhaling of beperkte tijdsinzet kan een betere inrichting van je huidige software al genoeg zijn. Zet de verwachte tijdwinst af tegen de kosten van bouwen én onderhoud."
      : "Terugkerend werk met herkenbare stappen biedt aanknopingspunten. We onderzoeken welke gegevens beschikbaar zijn, wat gekoppeld kan worden en welke controles nodig blijven.";

  return (
    <section className="quick-scan-section section-rule" id="quickscan" aria-labelledby="quick-scan-title">
      <div className="quick-scan-intro">
        <p className="eyebrow"><span /> Ontdek je eerste aanknopingspunt</p>
        <h2 id="quick-scan-title">Waar kan het <em>eenvoudiger?</em></h2>
        <p>Vijf korte vragen over jouw werk. Je ziet direct een eerste richting, zonder je e-mailadres achter te laten.</p>
        <p className="quick-scan-note">Je antwoorden blijven op deze pagina en worden niet verstuurd.</p>
      </div>
      <div className="quick-scan-questions">
        {questions.map((question, index) => (
          <fieldset className="choice-field" key={question.title}>
            <legend><span className="question-number">0{index + 1}</span> {question.title}</legend>
            <div className="choice-options">
              {question.options.map((option, optionIndex) => (
                <label className="choice-option" key={option}>
                  <input type="radio" name={`quickscan-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((previous) => ({ ...previous, [index]: optionIndex }))} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="quick-scan-result" aria-live="polite" aria-atomic="true">
          {complete ? <>
            <p className="eyebrow"><span /> Jouw eerste richting</p>
            <h3>{title}</h3>
            <p>{explanation}</p>
            <p>Beschrijf bij je aanvraag een voorbeeld van <strong>{questions[0].options[answers[0]].toLowerCase()}</strong> in {questions[1].options[answers[1]].toLowerCase()}. Zo kunnen we je gericht per e-mail adviseren.</p>
            <p className="quick-scan-note">Dit is een eerste denkrichting op basis van je antwoorden, geen technische beoordeling of berekende besparing.</p>
            <TrackedLink className="button" href="#scan" event="cta_click" location="quick_scan_result">Ontvang advies over mijn proces <span aria-hidden="true">↗</span></TrackedLink>
          </> : <p>{Object.keys(answers).length} van de 5 vragen ingevuld. Beantwoord ze allemaal om je eerste richting te zien.</p>}
        </div>
      </div>
    </section>
  );
}
