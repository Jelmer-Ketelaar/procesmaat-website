export const problemItems = [
  "Gegevens worden handmatig overgenomen van e-mail naar een ander systeem.",
  "Wekelijkse rapportages kosten telkens weer een ronde door spreadsheets.",
  "Facturen en documenten worden stuk voor stuk gecontroleerd en verwerkt.",
  "Leads en klantvragen krijgen niet altijd op tijd dezelfde opvolging.",
  "Collega’s doorlopen dagelijks dezelfde administratieve stappen.",
] as const;

export const automationExamples = [
  {
    number: "01",
    title: "Facturen & documenten",
    text: "Bestanden uitlezen, gegevens controleren en klaarzetten in je boekhouding of backoffice.",
    tag: "Verwerking",
  },
  {
    number: "02",
    title: "Leadintake & opvolging",
    text: "Aanvragen verrijken, verdelen en opvolgtaken aanmaken zonder dat een lead tussen wal en schip valt.",
    tag: "Opvolging",
  },
  {
    number: "03",
    title: "Dashboards & rapportages",
    text: "Actuele informatie uit meerdere bronnen samenbrengen in één overzicht dat zichzelf bijwerkt.",
    tag: "Overzicht",
  },
  {
    number: "04",
    title: "Systemen koppelen",
    text: "Bestaande tools via API’s, webhooks of gecontroleerde gegevensuitwisseling met elkaar laten samenwerken.",
    tag: "Integratie",
  },
] as const;

export const processSteps = [
  { number: "01", title: "Kennismaken", text: "We bespreken waar werk blijft liggen, welke stappen terugkomen en wat je wilt verbeteren." },
  { number: "02", title: "Proces onderzoeken", text: "We brengen uitzonderingen, systemen en verantwoordelijkheden in kaart voordat we iets bouwen." },
  { number: "03", title: "Prototype bouwen", text: "Je krijgt vroeg een werkende opzet te zien. Daarmee toetsen we of de oplossing klopt in de praktijk." },
  { number: "04", title: "Opleveren & verbeteren", text: "We voeren gecontroleerd in, leggen de werking uit en verbeteren op basis van echt gebruik." },
] as const;

export const faqs = [
  {
    question: "Wat kan er geautomatiseerd worden?",
    answer: "Vooral terugkerende processen met duidelijke invoer, beslisregels en uitvoer zijn kansrijk. Denk aan documentverwerking, gegevens overnemen, controles, meldingen, rapportages en opvolgtaken. Tijdens de scan kijken we ook naar uitzonderingen en risico’s.",
  },
  {
    question: "Moeten we onze huidige software vervangen?",
    answer: "Meestal niet. We onderzoeken eerst of bestaande systemen veilig gekoppeld of slimmer ingericht kunnen worden. Vervangen adviseren we alleen als een huidige beperking structureel in de weg zit.",
  },
  {
    question: "Wat kost een oplossing?",
    answer: "Dat hangt af van de processtappen, koppelingen, uitzonderingen en gewenste ondersteuning. Na het procesonderzoek ontvang je een afgebakend voorstel met aanpak en investering. De eerste automatiseringsscan is gratis en vrijblijvend.",
  },
  {
    question: "Hoe lang duurt een project?",
    answer: "Dat hangt af van de afbakening, koppelingen en uitzonderingen. We noemen pas een planning nadat het proces en de technische afhankelijkheden zijn onderzocht; zo voorkomen we een vroege belofte die later niet houdbaar blijkt.",
  },
  {
    question: "Is AI altijd nodig?",
    answer: "Nee. Vaak zijn gewone softwarelogica, een goede koppeling of een slimmer formulier betrouwbaarder en goedkoper. We zetten AI alleen in als het aantoonbaar past bij de taak, bijvoorbeeld bij het classificeren of samenvatten van ongestructureerde informatie.",
  },
  {
    question: "Wat gebeurt er tijdens de gratis scan?",
    answer: "In 30 minuten bespreken we één terugkerend proces, de belangrijkste stappen en uitzonderingen. Je krijgt een eerste haalbaarheidsinschatting en we benoemen eerlijk wanneer automatiseren niet zinvol lijkt. Als er een passende vervolgstap is, bespreken we die samen.",
  },
  {
    question: "Wat gebeurt er na de scan?",
    answer: "Alleen als er een kansrijke en afgebakende vervolgstap is, bespreken we welk onderzoek of prototype daarbij past. Je beslist daarna zelf of je verder wilt. De scan verplicht je nergens toe.",
  },
  {
    question: "Wie onderhoudt de oplossing?",
    answer: "Dat spreken we vóór de bouw expliciet af. We maken duidelijk welke onderdelen beheer nodig hebben, wie wijzigingen kan uitvoeren en wat er gebeurt als een gekoppeld systeem verandert.",
  },
  {
    question: "Blijft er menselijke controle mogelijk?",
    answer: "Ja. Uitzonderingen en onzekere gevallen hoeven niet automatisch door te gaan. We kunnen controles, goedkeuringsstappen en een duidelijke route naar een medewerker onderdeel van het proces maken.",
  },
] as const;
