export type ServiceSlug = "ai-agents" | "ai-automatisering" | "factuur-documentverwerking" | "procesautomatisering" | "maatwerksoftware" | "systeemkoppelingen" | "crm-boekhouding-koppelen";

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
  "ai-agents": {
    slug: "ai-agents",
    shortTitle: "AI-agents",
    eyebrow: "Een gerichte assistent voor je team",
    title: "Een AI-agent laten bouwen die jouw werkproces kent",
    metaTitle: "AI-agent laten bouwen voor je bedrijf | ProcesMaat",
    metaDescription: "Laat een gerichte AI-agent bouwen voor interne kennis, klantvragen of taakvoorbereiding. Met systeemkoppelingen, beperkte toegang en menselijke controle.",
    intro: "Een AI-agent is software die met een taalmodel informatie kan opzoeken en toegestane hulpmiddelen kan gebruiken om een taak uit te voeren. ProcesMaat ontwerpt agents rondom één bedrijfsproces: met eigen kennisbronnen, beperkte toegang en heldere afspraken over wat de agent zelfstandig mag doen.",
    fitTitle: "Wanneer is een AI-agent een logische stap?",
    fitIntro: "Een agent is nuttig als de juiste vervolgstap afhangt van de vraag en beschikbare informatie. Voor een vaste reeks handelingen is een gewone automatisering vaak eenvoudiger te beheersen.",
    fitSignals: [
      "Medewerkers zoeken herhaaldelijk informatie op in dezelfde werkinstructies of documenten.",
      "Een klantvraag vraagt om gegevens uit meerdere toegankelijke bronnen.",
      "De taak heeft een duidelijke einduitkomst, maar de route verschilt per aanvraag.",
      "Je kunt afbakenen welke gegevens en handelingen de agent nodig heeft.",
      "Een medewerker kan antwoorden en voorgestelde acties beoordelen.",
    ],
    explanationTitle: "Geef een agent een taak. En duidelijke grenzen.",
    explanation: [
      "Een interne kennisassistent kan bijvoorbeeld de juiste werkinstructie zoeken bij een vraag van een collega. Het antwoord verwijst naar de gebruikte bron, zodat de collega de informatie kan controleren. Als de bronnen niet voldoende informatie geven, hoort de agent dat te melden en de vraag door te zetten. Hij hoeft geen antwoord te verzinnen om de taak af te ronden.",
      "Een agent die systemen gebruikt vraagt meer ontwerp dan een chatinterface. We beperken de hulpmiddelen en toegangsrechten tot de afgesproken taak. Alleen lezen is het uitgangspunt als schrijven niet nodig is. Een voorgenomen wijziging of uitgaand bericht kan eerst als voorstel aan een medewerker worden getoond. We begrenzen ook het aantal stappen en het gebruik, zodat een agent niet eindeloos blijft proberen.",
      "Tijdens een prototype toetsen we gewone vragen én lastige situaties: verouderde documenten, tegenstrijdige informatie, ontbrekende bronnen en instructies in binnengekomen tekst die de agent niet mag volgen. De broninhoud mag geen nieuwe bevoegdheden geven. Voor ingebruikname spreken we af hoe fouten worden gemeld en wie de kennisbronnen actueel houdt.",
    ],
    deliverablesTitle: "Wat hoort bij een bruikbare bedrijfsagent?",
    deliverables: [
      { title: "Een concrete opdracht", text: "Duidelijk vastgelegd welke taak de agent ondersteunt en wanneer hij moet stoppen of hulp vragen." },
      { title: "Geselecteerde kennisbronnen", text: "Alleen de documenten en systeemgegevens die nodig zijn, met afspraken over actualiteit en toegang." },
      { title: "Begrensde hulpmiddelen", text: "Expliciete rechten per actie, met goedkeuring voor stappen waarvoor menselijke regie nodig is." },
      { title: "Een toetsbare uitkomst", text: "Praktijkvragen, broncontrole en inzicht in afwijkingen om te bepalen of de agent bruikbaar blijft." },
    ],
    examplesTitle: "Waarvoor kun je een AI-agent inzetten?",
    examples: [
      { title: "Interne kennisassistent", text: "Vind antwoorden in afgesproken werkinstructies en documentatie. Collega’s krijgen een antwoord met verwijzing naar de relevante bron." },
      { title: "Voorbereiding van klantvragen", text: "Verzamel toegestane klant- en procesinformatie en maak een concept voor de medewerker die de aanvraag behandelt." },
      { title: "Assistent voor projectoverdracht", text: "Breng beschikbare projectinformatie bij elkaar, signaleer ontbrekende onderdelen en bereid een overdrachtsvoorstel voor." },
      { title: "Gerichte taakvoorbereiding", text: "Zoek benodigde informatie op en stel een vervolgstap voor in je werkproces. Je team keurt wijzigingen goed voordat ze worden uitgevoerd." },
    ],
    faq: [
      { question: "Wat is het verschil tussen een chatbot en een AI-agent?", answer: "Een chatbot is vooral een gespreksinterface. Een agent kan daarnaast toegestane hulpmiddelen kiezen en gebruiken, zoals een zoekfunctie of systeemkoppeling. De termen overlappen in de praktijk. Belangrijker is welke taken de oplossing uitvoert en welke rechten en controles daarbij horen." },
      { question: "Kan een AI-agent zelfstandig e-mails sturen of gegevens wijzigen?", answer: "Technisch kan dat met passende koppelingen, maar het is geen standaardinstelling. Per actie bepalen we wat verantwoord is. Een concept of wijzigingsvoorstel met menselijke goedkeuring is vaak een passende eerste stap." },
      { question: "Kan de agent met onze eigen documenten werken?", answer: "Ja, als de documenten toegankelijk en geschikt zijn. We kijken naar de structuur, actualiteit en toegangsrechten. De agent mag geen informatie tonen waarvoor de gebruiker geen toestemming heeft. Bronverwijzingen helpen om antwoorden te controleren." },
      { question: "Wat kost een AI-agent laten bouwen?", answer: "Dat hangt af van de kennisbronnen, koppelingen en toegestane acties. Een afgebakende kennisassistent vraagt een andere aanpak dan een agent die meerdere systemen wijzigt. Naast bouw en inrichting moeten modelgebruik, hosting en beheer in het voorstel worden meegenomen." },
      { question: "Vervangt een AI-agent onze medewerkers?", answer: "De toepassingen die we hier beschrijven ondersteunen medewerkers bij zoeken, lezen en voorbereiden. Verantwoordelijkheid, uitzonderingen en goedkeuringen blijven expliciet belegd. We ontwerpen rondom het werk dat het team beter wil kunnen doen." },
    ],
  },


  "ai-automatisering": {
    slug: "ai-automatisering",
    shortTitle: "AI-automatisering",
    eyebrow: "AI die meewerkt in je bedrijf",
    title: "AI-automatisering en AI-agents voor bedrijven",
    metaTitle: "Slimme AI-Automatisering & AI-Agents voor Bedrijven",
    metaDescription: "Zet AI concreet aan het werk in je team. Van het automatisch uitlezen van documenten tot slimme assistenten. Altijd met menselijke controle.",
    intro: "AI-automatisering verbindt het begrijpen van tekst en documenten met de handelingen die daarop volgen. Denk aan een aanvraag die wordt herkend, gecontroleerd en klaargezet in je CRM. ProcesMaat bouwt zulke werkstromen voor mkb-teams, met menselijke controle op de momenten die ertoe doen.",
    fitTitle: "Waar kan AI jouw team werk uit handen nemen?",
    fitIntro: "AI is vooral interessant wanneer informatie iedere keer anders binnenkomt, terwijl het vervolg herkenbaar is. Begin bij een terugkerende taak waar lezen, ordenen of voorbereiden veel aandacht kost.",
    fitSignals: [
      "Klantvragen komen vrij geformuleerd binnen en moeten eerst worden gelezen en verdeeld.",
      "Gegevens staan in verschillende soorten pdf’s, facturen, e-mails of formulieren.",
      "Medewerkers schrijven steeds opnieuw vergelijkbare antwoorden en samenvattingen.",
      "Informatie wordt eerst uitgezocht en daarna handmatig overgenomen in CRM of backoffice.",
      "Er zijn voorbeelden beschikbaar waarmee de uitkomst goed of fout kan worden beoordeeld.",
    ],
    explanationTitle: "AI begrijpt de invoer. De werkstroom regelt het vervolg.",
    explanation: [
      "Een AI-agent kan binnen afgesproken grenzen meerdere stappen uitvoeren, zoals informatie opzoeken en een vervolgtaak voorbereiden. We leggen vast welke bronnen en handelingen zijn toegestaan en wanneer een medewerker moet goedkeuren of overnemen.",
      "Stel: een potentiële klant mailt een aanvraag. AI haalt het onderwerp, de gewenste dienstverlening en ontbrekende gegevens uit de tekst. Vaste regels controleren of de informatie compleet is. Een API-koppeling kan vervolgens een taak en conceptantwoord klaarzetten. Je medewerker beoordeelt het voorstel voordat er iets naar de klant gaat. Zo wordt een losse AI-uitkomst onderdeel van een bruikbaar proces.",
      "We kiezen eerst één afgebakende taak en vergelijken de uitkomsten met representatieve voorbeelden uit jouw praktijk. Daarbij tellen niet alleen goede antwoorden mee: we bekijken ook foutieve interpretaties, ontbrekende informatie, verwerkingstijd en kosten per verwerking. Vaste berekeningen, toegangsrechten en goedkeuringen blijven buiten het oordeel van het taalmodel.",
      "Voor de bouw spreken we af welke gegevens een model mag ontvangen en welke leverancier daarvoor geschikt is. We bepalen wat er wordt bewaard, welke toegang nodig is en wanneer een medewerker moet overnemen. Een onzekere uitkomst wordt geen automatische toezegging, betaling of wijziging zonder de afgesproken controles.",
    ],
    deliverablesTitle: "Van eerste proef naar een werkbare oplossing",
    deliverables: [
      { title: "Eén duidelijke toepassing", text: "Een afgebakende taak, gewenste uitkomst en set praktijkvoorbeelden waarmee we de kwaliteit toetsen." },
      { title: "Aansluiting op je systemen", text: "De uitkomst komt terecht waar je team ermee werkt, voor zover de beschikbare koppelingen dat toelaten." },
      { title: "Controle vóór een actie", text: "Validatie, broninformatie waar beschikbaar en een goedkeuringsstap voor acties die dat nodig hebben." },
      { title: "Zicht op werking en kosten", text: "Afspraken over foutafhandeling, gebruikskosten, onderhoud en het opnieuw beoordelen van modeluitkomsten." },
    ],
    examplesTitle: "Praktische voorbeelden van AI-automatisering",
    examples: [
      { title: "E-mails sorteren en voorbereiden", text: "Herken onderwerp en urgentie, haal de benodigde gegevens uit een bericht en zet een conceptantwoord klaar. Een collega blijft verantwoordelijk voor de verzending." },
      { title: "Documentgegevens overnemen", text: "Lees velden uit documenten en vergelijk ze met vaste validatieregels. Ontbrekende velden of afwijkende bedragen gaan naar een medewerker." },
      { title: "Gesprekken omzetten in acties", text: "Maak van beschikbare gespreksnotities een samenvatting en voorgestelde taken. Laat de verantwoordelijke de acties controleren voordat ze worden ingepland." },
      { title: "Aanvragen voorbereiden voor je CRM", text: "Zet ongestructureerde aanvragen om naar een voorstel met vaste velden. Controleer bestaande contacten en volledigheid voordat gegevens worden opgeslagen." },
    ],
    faq: [
      { question: "Wat is het verschil tussen AI en gewone automatisering?", answer: "Gewone automatisering volgt vooraf bepaalde regels en is geschikt voor vaste controles en gegevensoverdracht. AI kan helpen bij variabele tekst of documenten, maar kan ook fouten maken. Een betrouwbare oplossing combineert de twee: AI voor interpretatie, vaste logica voor controle en duidelijke bevoegdheden voor vervolgacties." },
      { question: "Wat kost AI-automatisering voor een mkb-bedrijf?", answer: "De investering hangt af van de taak, het aantal koppelingen, het volume en de controles die nodig zijn. Naast de bouw kunnen er kosten zijn voor modelgebruik, hosting en onderhoud. Tijdens het digitale advies bakenen we de toepassing af; daarna kan een voorstel met eenmalige en terugkerende kosten worden gemaakt." },
      { question: "Hoe weten we of de automatisering tijd bespaart?", answer: "Meet eerst het huidige aantal verwerkingen en de gemiddelde behandeltijd. Vergelijk die met de nieuwe werkwijze, inclusief controle en herstelwerk. Een kortere modelverwerking alleen is geen bewijs van tijdwinst. Ook de kwaliteit en totale proceskosten tellen mee." },
      { question: "Kan dit met onze bestaande software?", answer: "Dat onderzoeken we vooraf. Als je software bruikbare API’s, webhooks of importmogelijkheden biedt, kan die vaak blijven staan. Leveranciersrechten, abonnementen en technische beperkingen bepalen welke koppeling mogelijk is." },
      { question: "Wat als de AI een fout maakt?", answer: "Dat moet onderdeel van het ontwerp zijn. We controleren verplichte velden, begrenzen acties en laten gevoelige beslissingen beoordelen. Afwijkende resultaten krijgen een route naar een medewerker. Testvoorbeelden helpen om fouten zichtbaar te maken voordat een proces breder wordt ingezet." },
      { question: "Moeten we meteen ons hele bedrijf automatiseren?", answer: "Nee. Start met één proces dat vaak terugkomt en waarvan je de kwaliteit kunt beoordelen. Pas wanneer de aanpak in de praktijk werkt, is uitbreiding naar andere processen zinvol." },
    ],
  },
  "factuur-documentverwerking": {
    slug: "factuur-documentverwerking",
    shortTitle: "Factuur- en documentverwerking",
    eyebrow: "Van document naar bruikbare gegevens",
    title: "Automatische factuur- en documentverwerking voor het mkb",
    metaTitle: "Automatische Factuur- & Documentverwerking | MKB",
    metaDescription: "Documenten automatisch uitlezen, controleren en direct klaarzetten in je boekhouding of backoffice. Bespaar uren per week met ProcesMaat.",
    intro: "Facturen en documenten komen binnen als pdf, scan of e-mailbijlage. Je team zoekt de juiste gegevens, voert ze over en controleert of alles klopt. We onderzoeken welke stappen kunnen worden overgenomen en welke beoordeling bij een medewerker blijft.",
    fitTitle: "Waar blijft tijd liggen bij het verwerken van documenten?",
    fitIntro: "Begin bij één documentsoort die regelmatig terugkomt. Met voorbeelden van normale én afwijkende documenten wordt duidelijk wat betrouwbaar kan worden uitgelezen.",
    fitSignals: ["Factuurgegevens worden handmatig uit pdf-bestanden overgenomen.", "Collega’s controleren steeds dezelfde velden, bedragen of referenties.", "Ontbrekende informatie leidt tot losse e-mails en uitzoekwerk.", "Het is lastig te zien welke documenten nog op verwerking of goedkeuring wachten."],
    explanationTitle: "Uitlezen, controleren en klaarzetten",
    explanation: [
      "We brengen eerst de invoer en de gewenste gegevens in kaart: welke documenten komen binnen, welke velden zijn nodig en welk systeem ontvangt ze? Daarna kiezen we een passende manier om informatie uit te lezen. AI kan helpen bij wisselende layouts; vaste controles bewaken de gegevens die verdergaan.",
      "Ontbrekende velden, mogelijke duplicaten en afwijkende bedragen krijgen een aparte beoordelingsstap. De oplossing zet gegevens klaar voor je boekhouding of backoffice, voor zover het pakket en je abonnement dit toelaten. Goedkeuren, boeken en betalen zijn afzonderlijke stappen waarover we vooraf afspraken maken.",
      "De mogelijke tijdwinst hangt af van het documentvolume, de kwaliteit en de benodigde controle. We vergelijken de huidige verwerkingstijd met de nieuwe werkwijze, inclusief herstelwerk. Uren besparen is het doel, geen vooraf gegarandeerde uitkomst.",
    ],
    deliverablesTitle: "Een overzichtelijk proces voor je administratie",
    deliverables: [
      { title: "Gegevens op vaste velden", text: "De benodigde informatie wordt klaargezet in een afgesproken structuur." },
      { title: "Afwijkingen zichtbaar", text: "Onvolledige of onzekere gegevens komen bij een medewerker terecht." },
      { title: "Aansluiting op je backoffice", text: "We toetsen hoe de gegevens veilig in je bestaande software kunnen worden verwerkt." },
      { title: "Meetbare werking", text: "Verwerkingstijd, correcties en uitzonderingen maken zichtbaar of de aanpak iets oplevert." },
    ],
    examplesTitle: "Voorbeelden van documentverwerking",
    examples: [
      { title: "Inkoopfacturen voorbereiden", text: "Leverancier, factuurnummer en bedragen uitlezen en ter controle klaarzetten bij de administratie." },
      { title: "Orderdocumenten verwerken", text: "Referenties en orderregels uit documenten overnemen en ontbrekende gegevens signaleren." },
      { title: "Aanvragen compleet maken", text: "Controleren welke gegevens en bijlagen aanwezig zijn voordat de volgende processtap begint." },
    ],
    faq: [
      { question: "Moet AI iedere factuur beoordelen?", answer: "Nee. We kiezen de eenvoudigste passende aanpak. Gestructureerde gegevens of bestaande functies in je boekhoudpakket kunnen voldoende zijn. AI komt pas in beeld als het iets toevoegt aan de verwerking." },
      { question: "Worden facturen automatisch betaald?", answer: "Niet als vanzelfsprekend onderdeel van documentverwerking. Uitlezen, controleren, boeken en betalen zijn verschillende stappen. We spreken vooraf af waar menselijke goedkeuring nodig blijft." },
      { question: "Hoeveel tijd kunnen we besparen?", answer: "Dat onderzoeken we met je documentvolume en huidige behandeltijd. Ook controle en herstelwerk tellen mee. In het digitale advies bekijken we of verdere analyse zinvol is." },
    ],
  },

  "crm-boekhouding-koppelen": {
    slug: "crm-boekhouding-koppelen",
    shortTitle: "CRM en boekhouding",
    eyebrow: "Van klantgegevens naar administratie",
    title: "Je CRM en boekhouding koppelen: minder dubbel invoeren",
    metaTitle: "CRM en boekhouding koppelen | ProcesMaat",
    metaDescription: "Klantgegevens en factuurinformatie steeds overtypen? ProcesMaat onderzoekt hoe je CRM en boekhouding kunnen samenwerken, met controles en overzicht.",
    intro: "Een nieuwe klant in je CRM, een tweede invoer in je boekhouding en losse e-mails bij iedere wijziging. Een gerichte koppeling kan die overdrachten overnemen. We onderzoeken eerst welke gegevens nodig zijn en welk systeem leidend is.",
    fitTitle: "Herken je dit tussen verkoop en administratie?",
    fitIntro: "De winst zit vaak in één duidelijke overdracht. Begin bijvoorbeeld bij een goedgekeurde offerte of een nieuwe klant, voordat je alle gegevens in twee richtingen probeert te synchroniseren.",
    fitSignals: ["Klantgegevens worden opnieuw ingevoerd bij het maken van een factuur.", "Adreswijzigingen staan wel in het CRM, maar nog niet in de administratie.", "De administratie wacht op informatie van een collega voordat een factuur klaar kan.", "Niemand ziet direct welke overdrachten zijn gelukt en welke zijn blijven liggen."],
    explanationTitle: "Eerst de afspraken, dan de koppeling",
    explanation: [
      "We bepalen welke gebeurtenis de overdracht start, welke velden meegaan en waar gegevens mogen worden aangepast. Daarbij kijken we naar dubbele klanten, ontbrekende gegevens, btw-regels en wie een afwijking beoordeelt.",
      "Gebruik je bijvoorbeeld HubSpot, Pipedrive, Exact Online, Moneybird of AFAS? De beschikbare API, je abonnement en toegangsrechten bepalen wat mogelijk is. Die controleren we voordat we een aanpak of prijs voorstellen. Dit zijn voorbeelden van pakketten om te onderzoeken, geen lijst van gecertificeerde partnerschappen.",
    ],
    deliverablesTitle: "Waar een goede koppeling voor zorgt",
    deliverables: [
      { title: "Eén afgesproken bron", text: "Per gegeven is duidelijk welk systeem leidend is en wat er gebeurt bij een wijziging." },
      { title: "Controle vóór overdracht", text: "Onvolledige of dubbele invoer wordt apart gezet om te beoordelen." },
      { title: "Zichtbare status", text: "Medewerkers kunnen zien welke overdrachten zijn verwerkt en welke aandacht vragen." },
      { title: "Beheer zonder verrassingen", text: "Vooraf spreken we af wie meldingen opvolgt en hoe wijzigingen in de pakketten worden opgevangen." },
    ],
    examplesTitle: "Mogelijke werkwijzen, geen klantcases",
    examples: [
      { title: "Van akkoord naar conceptfactuur", text: "Een goedgekeurde offerte zet de benodigde informatie klaar in de boekhouding. Een medewerker controleert de conceptfactuur vóór verzending." },
      { title: "Klantgegevens op de juiste plek", text: "Een nieuwe of gewijzigde klant wordt gecontroleerd op bestaande relaties voordat gegevens worden overgenomen." },
    ],
    faq: [
      { question: "Kunnen jullie mijn specifieke pakketten koppelen?", answer: "Dat beoordelen we per situatie. We controleren de technische mogelijkheden, het abonnement, de benodigde velden en toegangsrechten. Soms is een bestaande koppeling voldoende en is maatwerk niet nodig." },
      { question: "Hoeveel tijd besparen we hiermee?", answer: "Dat weten we pas als duidelijk is hoe vaak de overdracht gebeurt, hoeveel handwerk nodig is en welke controles blijven bestaan. We vergelijken de tijd vóór en na invoering; we beloven vooraf geen vast percentage." },
      { question: "Moet alles automatisch worden verstuurd?", answer: "Nee. Een koppeling kan informatie klaarzetten voor controle. Je houdt bijvoorbeeld zelf de goedkeuring van facturen of afwijkende klantgegevens in handen." },
    ],
  },
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
      { question: "Wat kost procesautomatisering?", answer: "Dat hangt af van het aantal stappen, systemen en uitzonderingen. Na je digitale aanvraag en procesonderzoek kan een afgebakend voorstel worden gemaakt. We noemen geen bedrag voordat duidelijk is wat er werkelijk nodig is." },
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
    title: "Systemen koppelen via API en webhooks",
    metaTitle: "Systemen Koppelen via API & Webhooks | ProcesMaat",
    metaDescription: "Laat je huidige softwaretools vlekkeloos met elkaar praten. Wij bouwen veilige API-koppelingen die handwerk overbodig maken. Ontdek de mogelijkheden.",
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
