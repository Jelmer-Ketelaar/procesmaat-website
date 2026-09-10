"use client";

import { useState } from "react";

const scenarios = [
  {
    name: "Klantaanvragen", inputLabel: "Nieuwe e-mail", input: "Kunnen jullie een offerte maken voor het onderhoud van onze drie locaties? Graag starten in oktober.",
    action: "AI haalt de vraag uit de tekst", fields: [["Type aanvraag", "Onderhoudsofferte"], ["Omvang", "3 locaties"], ["Gewenste start", "Oktober"]],
    check: "Adresgegevens ontbreken. Eerst aanvullen.", output: "Conceptantwoord + taak in je CRM", result: "Je collega begint met een complete voorbereiding, in plaats van een lege pagina.",
  },
  {
    name: "Documenten", inputLabel: "Ontvangen document", input: "Factuur INV-2041 · Voorbeeldleverancier · Project Renovatie · Totaal € 1.210,00 inclusief btw.",
    action: "AI leest de relevante gegevens", fields: [["Document", "Factuur INV-2041"], ["Project", "Renovatie"], ["Totaal", "€ 1.210,00"]],
    check: "Controle op dubbel factuurnummer en bedrag.", output: "Boekingsvoorstel voor je administratie", result: "Gegevens staan klaar. Een medewerker controleert het voorstel vóór verwerking.",
  },
  {
    name: "Interne kennis", inputLabel: "Vraag van een collega", input: "Welke stappen doorlopen we wanneer een klant de planning van een lopend project wil wijzigen?",
    action: "AI zoekt in goedgekeurde werkinstructies", fields: [["Onderwerp", "Planning wijzigen"], ["Bron", "Interne werkinstructie"], ["Volgende stap", "Projectleider laten beoordelen"]],
    check: "Geen passende bron? Door naar een collega.", output: "Antwoord met bronverwijzing", result: "Een bruikbaar startpunt op basis van je eigen kennis, met een duidelijke route bij twijfel.",
  },
] as const;

export function AutomationDemo() {
  const [selected, setSelected] = useState(0);
  const scenario = scenarios[selected];

  return (
    <div className="automation-demo" aria-label="Interactief voorbeeld van AI-automatisering">
      <div className="demo-topline"><span>PROCESMAAT / IN DE PRAKTIJK</span><span className="demo-badge">Voorbeeld</span></div>
      <div className="demo-selectors" role="group" aria-label="Kies een voorbeeldproces">
        {scenarios.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
      <div className="demo-content" aria-live="polite" aria-atomic="true">
        <div className="demo-input"><span className="demo-label">01 / {scenario.inputLabel}</span><p>{scenario.input}</p></div>
        <div className="demo-connector" aria-hidden="true">↓</div>
        <div className="demo-engine"><div className="demo-engine-heading"><span className="demo-ai" aria-hidden="true">AI</span><h2>{scenario.action}</h2></div>
          <dl>{scenario.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p className="demo-check"><span aria-hidden="true">✓</span>{scenario.check}</p>
        </div>
        <div className="demo-connector" aria-hidden="true">↓</div>
        <div className="demo-output"><span className="demo-label">03 / Klaar voor je team</span><strong>{scenario.output}</strong><p>{scenario.result}</p></div>
      </div>
      <p className="demo-footnote">Illustratie met fictieve gegevens. Geen live AI of gekoppelde systemen.</p>
    </div>
  );
}
