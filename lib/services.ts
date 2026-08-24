export type ServiceSlug = "procesautomatisering" | "maatwerksoftware" | "systeemkoppelingen";

export type ServicePageContent = {
  slug: ServiceSlug;
  shortTitle: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  fitTitle: string;
  fitIntro: string;
  fitSignals: readonly string[];
  explanationTitle: string;
  explanation: readonly string[];
  deliverablesTitle: string;
  deliverables: readonly { title: string; text: string }[];
  examplesTitle: string;
  examples: readonly { title: string; text: string }[];
  faq: readonly { question: string; answer: string }[];
};

export const services: Record<ServiceSlug, ServicePageContent> = {
  procesautomatisering: {
    slug: "procesautomatisering",
    shortTitle: "Procesautomatisering",
    eyebrow: "Terugkerend werk slimmer inrichten",
    title: "Procesautomatisering voor minder handwerk en meer grip",
    metaTitle: "Procesautomatisering voor het mkb | ProcesMaat",
    metaDescription: "Laat terugkerende bedrijfsprocessen gecontroleerd automatiseren. ProcesMaat onderzoekt, bouwt en koppelt praktische oplossingen voor Nederlandse mkb-teams.",
    intro: "Procesautomatisering laat vaste handelingen, controles en overdrachten voorspelbaar verlopen. ProcesMaat helpt mkb-teams om eerst het echte proces zichtbaar te maken en daarna alleen de stappen te automatiseren die daar geschikt voor zijn.",
    fitTitle: "Wanneer is een proces geschikt voor automatisering?",
    fitIntro: "Niet ieder probleem vraagt om software. Een proces is vooral kansrijk wanneer het vaak terugkomt, duidelijke invoer en uitvoer heeft en de uitzonderingen benoemd kunnen worden.",
    fitSignals: [
      "Collega’s nemen gegevens over tussen e-mail, spreadsheets en bedrijfssystemen.",
      "Dezelfde controles, herinneringen of rapportages keren iedere week terug.",
      "Werk blijft liggen doordat een overdracht of status niet zichtbaar is.",
      "Fouten zijn lastig te herleiden en kosten extra herstelwerk.",
      "Het team kent de werkwijze, maar de stappen staan nog niet helder op papier.",
    ],
    explanationTitle: "Eerst het proces, daarna de techniek",
    explanation: [
      "Een betrouwbare automatisering begint niet bij een tool. We brengen de aanleiding, invoer, beslisregels, uitzonderingen en gewenste uitkomst in kaart. Daardoor wordt zichtbaar welke stappen eenvoudiger kunnen, welke menselijke controle nodig blijft en waar een koppeling of maatwerkoplossing daadwerkelijk helpt.",
      "De oplossing kan bestaan uit vaste softwarelogica, een koppeling tussen bestaande systemen, een overzicht voor medewerkers of een combinatie daarvan. AI is alleen een optie als ongestructureerde informatie daar aantoonbaar om vraagt; voorspelbare regels krijgen de voorkeur wanneer die beter controleerbaar zijn.",
    ],
    deliverablesTitle: "Wat een traject concreet oplevert",
    deliverables: [
      { title: "Een afgebakend proces", text: "Stappen, rollen, invoer, uitvoer en uitzonderingen worden vóór de bouw expliciet gemaakt." },
      { title: "Een werkend prototype", text: "Een vroege versie maakt aannames zichtbaar en kan met echte werksituaties worden getoetst." },
      { title: "Controle en inzicht", text: "Medewerkers kunnen volgen wat er gebeurt en afwijkende gevallen bewust beoordelen." },
      { title: "Duidelijke afspraken", text: "Beheer, onderhoud en afhankelijkheden van gekoppelde systemen worden vooraf besproken." },
    ],
    examplesTitle: "Voorbeelden van procesautomatisering",
    examples: [
      { title: "Documenten verwerken", text: "Informatie uitlezen, controleren en klaarzetten voor een volgende stap zonder alles over te typen." },
      { title: "Aanvragen opvolgen", text: "Nieuwe aanvragen verdelen, ontbrekende gegevens signaleren en een opvolgtaak aanmaken." },
      { title: "Rapportages samenstellen", text: "Gegevens uit meerdere bronnen verzamelen en volgens vaste regels in één overzicht verwerken." },
      { title: "Goedkeuringen bewaken", text: "Een aanvraag langs de juiste beoordelaars sturen en zichtbaar maken waar deze nog wacht." },
    ],
    faq: [
      { question: "Wat kost procesautomatisering?", answer: "Dat hangt af van het aantal stappen, systemen en uitzonderingen. Na een korte scan en procesonderzoek kan een afgebakend voorstel worden gemaakt. We noemen geen bedrag voordat duidelijk is wat er werkelijk nodig is." },
      { question: "Moet het hele proces in één keer worden geautomatiseerd?", answer: "Nee. Een kleine, duidelijke deelstroom is vaak een betere start. Zo kan de werking in de praktijk worden getoetst voordat de oplossing breder wordt ingezet." },
      { question: "Kan een medewerker uitzonderingen blijven beoordelen?", answer: "Ja. Controles, goedkeuringsstappen en een route voor afwijkende situaties kunnen bewust onderdeel van de oplossing blijven." },
    ],
  },
  maatwerksoftware: {
    slug: "maatwerksoftware",
    shortTitle: "Maatwerksoftware",
    eyebrow: "Software rondom jouw werkwijze",
    title: "Maatwerksoftware voor processen die niet in een standaardpakket passen",
    metaTitle: "Maatwerksoftware voor het mkb | ProcesMaat",
    metaDescription: "Praktische maatwerksoftware voor Nederlandse mkb-bedrijven. Gebouwd rond je bestaande proces, systemen en uitzonderingen—met grip op beheer en groei.",
    intro: "Maatwerksoftware is zinvol wanneer een belangrijk bedrijfsproces structureel wordt geremd door losse spreadsheets, handmatige workarounds of beperkingen van bestaande pakketten. We bouwen een afgebakende oplossing die aansluit op het werk dat al gebeurt.",
    fitTitle: "Wanneer past maatwerksoftware bij je bedrijf?",
    fitIntro: "Een eigen oplossing is geen doel op zich. Het wordt interessant wanneer een terugkerend proces belangrijk genoeg is en configureren of koppelen van bestaande software het probleem niet voldoende oplost.",
    fitSignals: [
      "Een kernproces bestaat uit verschillende losse tools en tussenstappen.",
      "Medewerkers houden eigen lijsten bij om ontbrekende functies op te vangen.",
      "Een standaardpakket dwingt het team tot onnodig dubbel werk.",
      "Status, verantwoordelijkheden of uitzonderingen zijn niet centraal zichtbaar.",
      "De werkwijze is onderscheidend en moet beheersbaar kunnen meegroeien.",
    ],
    explanationTitle: "Klein genoeg om te begrijpen, stevig genoeg voor dagelijks gebruik",
    explanation: [
      "We beginnen met de kleinste bruikbare oplossing voor één duidelijk proces. Rollen, gegevens, beslissingen en uitzonderingen worden samen onderzocht. Daarna bouwen we een prototype waarmee gebruikers de belangrijkste route kunnen doorlopen voordat meer functionaliteit wordt toegevoegd.",
      "Waar mogelijk blijft bestaande software in gebruik. Maatwerk kan bijvoorbeeld een gerichte invoeromgeving, intern portaal, planningsoverzicht of workflowlaag zijn die met huidige systemen samenwerkt. Zo voorkom je dat een volledig landschap onnodig wordt vervangen.",
    ],
    deliverablesTitle: "Eigenschappen van beheersbare maatwerksoftware",
    deliverables: [
      { title: "Gerichte functionaliteit", text: "De eerste versie ondersteunt het belangrijkste proces in plaats van een lange wensenlijst." },
      { title: "Duidelijke gebruikersrollen", text: "Medewerkers zien wat voor hun taak nodig is en wie een volgende stap uitvoert." },
      { title: "Aansluiting op bestaande data", text: "Koppelingen worden alleen toegevoegd als ze het proces aantoonbaar eenvoudiger maken." },
      { title: "Onderhoud in beeld", text: "Technische afhankelijkheden, wijzigingen en verantwoordelijkheden worden gedocumenteerd." },
    ],
    examplesTitle: "Voorbeelden van maatwerksoftware",
    examples: [
      { title: "Intern werkportaal", text: "Taken, aanvragen en statussen op één plek voor de medewerkers die het proces uitvoeren." },
      { title: "Planning en capaciteit", text: "Werk verdelen op basis van beschikbare mensen, prioriteit en vaste bedrijfsregels." },
      { title: "Klant- of partneromgeving", text: "Gericht gegevens en documenten uitwisselen zonder lange e-mailketens." },
      { title: "Operationeel dashboard", text: "Actuele informatie tonen die nodig is om afwijkingen en achterstanden tijdig te zien." },
    ],
    faq: [
      { question: "Wanneer is maatwerk beter dan een standaardpakket?", answer: "Als een belangrijk proces structureel afwijkt, bestaande pakketten veel handwerk laten bestaan en de verwachte waarde opweegt tegen bouw en beheer. Dat onderzoeken we vóórdat er wordt gebouwd." },
      { question: "Kan maatwerksoftware met onze huidige systemen samenwerken?", answer: "Vaak wel. We controleren eerst welke API’s, webhooks of exportmogelijkheden beschikbaar zijn en welke beveiliging en gegevenskwaliteit nodig zijn." },
      { question: "Wie beheert de software na oplevering?", answer: "Dat spreken we vooraf af. We leggen vast welke onderdelen onderhoud nodig hebben, wie wijzigingen uitvoert en hoe wordt omgegaan met veranderingen in gekoppelde systemen." },
    ],
  },
  systeemkoppelingen: {
    slug: "systeemkoppelingen",
    shortTitle: "Systeemkoppelingen",
    eyebrow: "Bestaande software laten samenwerken",
    title: "Systemen koppelen zonder je hele werkwijze te vervangen",
    metaTitle: "Systemen koppelen en API-koppelingen | ProcesMaat",
    metaDescription: "Laat bedrijfssystemen veilig en beheersbaar samenwerken via API-koppelingen, webhooks of gecontroleerde gegevensuitwisseling voor het Nederlandse mkb.",
    intro: "Een systeemkoppeling verplaatst en controleert gegevens tussen tools die je al gebruikt. Daardoor hoeft informatie niet steeds opnieuw te worden ingevoerd en kan een vervolgstap automatisch of na menselijke goedkeuring worden gestart.",
    fitTitle: "Wanneer helpt een systeemkoppeling?",
    fitIntro: "Koppelen heeft vooral waarde wanneer dezelfde informatie voorspelbaar tussen systemen beweegt en duidelijk is welk systeem de bron blijft.",
    fitSignals: [
      "Klant-, order- of projectgegevens worden meerdere keren ingevoerd.",
      "Een export uit het ene systeem wordt handmatig in een ander systeem geïmporteerd.",
      "Medewerkers controleren in verschillende tools of een taak al is uitgevoerd.",
      "Nieuwe aanvragen moeten volgens vaste regels naar CRM, planning of backoffice.",
      "Wijzigingen komen te laat door, waardoor teams met verschillende versies werken.",
    ],
    explanationTitle: "Een koppeling is meer dan gegevens doorsturen",
    explanation: [
      "Voor een betrouwbare koppeling bepalen we welke gegevens nodig zijn, welk systeem leidend is en wat er moet gebeuren bij ontbrekende, dubbele of ongeldige invoer. Ook authenticatie, toegangsrechten, snelheidslimieten en foutafhandeling horen bij het ontwerp.",
      "We gebruiken een directe API of webhook wanneer systemen dat goed ondersteunen. Als dat niet kan, onderzoeken we een gecontroleerde import of export. De gekozen route moet uitlegbaar blijven en mag geen stille fouten introduceren.",
    ],
    deliverablesTitle: "Wat we bij een koppeling expliciet maken",
    deliverables: [
      { title: "Bron en bestemming", text: "Per gegeven is duidelijk welk systeem leidend is en waar wijzigingen mogen ontstaan." },
      { title: "Validatie", text: "Onvolledige of onverwachte invoer wordt gecontroleerd voordat een vervolgactie plaatsvindt." },
      { title: "Foutafhandeling", text: "Mislukte overdrachten worden zichtbaar en kunnen veilig opnieuw worden verwerkt." },
      { title: "Beveiliging", text: "Toegang, geheimen en gegevensstromen worden beperkt tot wat de koppeling nodig heeft." },
    ],
    examplesTitle: "Voorbeelden van systeemkoppelingen",
    examples: [
      { title: "Website naar CRM", text: "Een gevalideerde aanvraag als contact of taak aanmaken zonder handmatig overtypen." },
      { title: "Planning naar rapportage", text: "Actuele project- of capaciteitsgegevens volgens vaste definities samenbrengen." },
      { title: "Boekhouding en backoffice", text: "Goedgekeurde gegevens gecontroleerd doorgeven aan een administratief systeem." },
      { title: "Meldingen en opvolging", text: "Bij een relevante statuswijziging de juiste medewerker informeren of een taak klaarzetten." },
    ],
    faq: [
      { question: "Kunnen alle systemen via een API worden gekoppeld?", answer: "Nee. Dat hangt af van de beschikbare API, rechten en technische beperkingen van de leverancier. We controleren dit vooraf en bespreken een alternatief als een directe koppeling niet betrouwbaar kan." },
      { question: "Wat gebeurt er als een gekoppeld systeem niet bereikbaar is?", answer: "Een goede koppeling behandelt dat als een verwachte uitzondering. Afhankelijk van het proces kan een overdracht worden vastgehouden, opnieuw geprobeerd of bij een medewerker worden gemeld." },
      { question: "Hoe worden gegevens in een koppeling beveiligd?", answer: "We beperken toegang en gegevens tot wat nodig is, bewaren geheimen serverzijdig en ontwerpen validatie en logging zonder onnodige persoonsgegevens vast te leggen." },
    ],
  },
};

export const serviceList = Object.values(services);
