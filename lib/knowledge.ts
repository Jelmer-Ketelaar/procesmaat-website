export type KnowledgeSlug =
  | "bedrijfsprocessen-automatiseren"
  | "welk-proces-automatiseren"
  | "maatwerksoftware-of-standaardpakket"
  | "api-koppeling-checklist";

type KnowledgeCard = { title: string; text: string };
type KnowledgeTable = {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type KnowledgeSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly KnowledgeCard[];
  steps?: readonly KnowledgeCard[];
  table?: KnowledgeTable;
  note?: KnowledgeCard;
};

export type KnowledgeArticle = {
  slug: KnowledgeSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  primaryService: "/procesautomatisering" | "/maatwerksoftware" | "/systeemkoppelingen";
  primaryServiceLabel: string;
  sections: readonly KnowledgeSection[];
};

export const knowledgeArticles: Record<KnowledgeSlug, KnowledgeArticle> = {
  "bedrijfsprocessen-automatiseren": {
    slug: "bedrijfsprocessen-automatiseren",
    title: "Bedrijfsprocessen automatiseren: een nuchtere aanpak voor het mkb",
    metaTitle: "Bedrijfsprocessen automatiseren voor het mkb | ProcesMaat",
    metaDescription: "Leer welke bedrijfsprocessen geschikt zijn voor automatisering, hoe je klein begint en hoe je resultaat meet zonder direct je huidige software te vervangen.",
    intro: "Bedrijfsprocessen automatiseren betekent niet dat ieder menselijk besluit uit een werkwijze verdwijnt. Het betekent dat terugkerende invoer, controles, overdrachten en opvolging voorspelbaar worden uitgevoerd, terwijl uitzonderingen zichtbaar bij de juiste medewerker terechtkomen.",
    readingTime: "9 minuten",
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    primaryService: "/procesautomatisering",
    primaryServiceLabel: "Bekijk procesautomatisering",
    sections: [
      {
        id: "betekenis",
        title: "Wat is het automatiseren van een bedrijfsproces?",
        paragraphs: [
          "Een bedrijfsproces is een herhaalbare route van aanleiding naar resultaat. Denk aan een aanvraag die wordt beoordeeld, een order die langs planning en administratie gaat of een rapportage die uit meerdere systemen wordt samengesteld. Automatiseren betekent dat software vaste stappen en controles uitvoert op basis van vooraf afgesproken regels.",
          "Digitaliseren, standaardiseren en automatiseren zijn niet hetzelfde. Een spreadsheet vervangt papier, maar maakt een proces nog niet automatisch. Eerst moet duidelijk zijn welke gegevens nodig zijn, wie verantwoordelijk is en welke uitzonderingen bestaan. Pas daarna kan software veilig een volgende stap starten.",
        ],
        bullets: [
          { title: "Digitaliseren", text: "Informatie staat bruikbaar in een systeem in plaats van op papier of in losse berichten." },
          { title: "Standaardiseren", text: "Teams spreken één herkenbare route, invoer en uitkomst af." },
          { title: "Automatiseren", text: "Software voert vaste handelingen uit en stuurt afwijkingen bewust door." },
        ],
      },
      {
        id: "geschikte-processen",
        title: "Welke processen zijn geschikt voor automatisering?",
        paragraphs: [
          "De beste eerste kandidaat is meestal niet het grootste proces. Kies een afgebakende stroom die vaak voorkomt, aantoonbaar tijd vraagt en voldoende vaste regels heeft. Een proces met twintig uitzonderingen kan nog steeds geschikt zijn, zolang die uitzonderingen herkenbaar en beheersbaar zijn.",
        ],
        bullets: [
          { title: "Veel herhaling", text: "Dezelfde handelingen keren dagelijks of wekelijks terug en kosten gezamenlijk merkbare aandacht." },
          { title: "Digitale invoer", text: "De noodzakelijke gegevens komen al uit formulieren, e-mail, bestanden of bestaande bedrijfssystemen." },
          { title: "Duidelijke beslisregels", text: "Medewerkers kunnen uitleggen wanneer een stap doorgaat, stopt of controle nodig heeft." },
          { title: "Een proceseigenaar", text: "Iemand kan beslissingen nemen over definities, uitzonderingen en de gewenste uitkomst." },
          { title: "Meetbaar beginpunt", text: "Doorlooptijd, herstelwerk, wachttijd of aantal handelingen kan vóór en na de wijziging worden vergeleken." },
        ],
        note: { title: "Niet automatisch een goede kandidaat", text: "Een zeldzame taak die iedere keer anders verloopt, veel impliciete kennis vraagt of een ingrijpend besluit bevat. Vereenvoudigen of documenteren kan dan meer opleveren dan software." },
      },
      {
        id: "aanpak",
        title: "Van knelpunt naar een werkende automatisering",
        steps: [
          { title: "1. Kies één resultaat", text: "Beschrijf wat aan het einde aantoonbaar beter moet zijn, bijvoorbeeld minder overtypen of sneller zicht op ontbrekende gegevens." },
          { title: "2. Leg de huidige route vast", text: "Noteer aanleiding, invoer, rollen, systemen, beslissingen, wachttijd en bekende uitzonderingen." },
          { title: "3. Verwijder onnodige stappen", text: "Automatiseer geen handeling die na vereenvoudiging helemaal kan verdwijnen." },
          { title: "4. Bepaal de bron van waarheid", text: "Spreek per gegeven af welk systeem leidend is en waar een wijziging mag ontstaan." },
          { title: "5. Ontwerp de uitzonderingsroute", text: "Maak zichtbaar wanneer software stopt, welke informatie een medewerker krijgt en hoe het proces veilig wordt hervat." },
          { title: "6. Test een kleine deelstroom", text: "Gebruik echte maar zorgvuldig gekozen scenario’s, inclusief onvolledige, dubbele en onverwachte invoer." },
          { title: "7. Meet en breid gericht uit", text: "Vergelijk de nieuwe route met de nulmeting en voeg pas daarna extra systemen of processtappen toe." },
        ],
      },
      {
        id: "regels-of-ai",
        title: "Vaste softwarelogica of AI?",
        paragraphs: [
          "Vaste regels zijn de eerste keuze wanneer invoer en beslissing voorspelbaar zijn. Ze zijn eenvoudiger te testen en uit te leggen. AI kan helpen wanneer de invoer ongestructureerd is, bijvoorbeeld bij het classificeren van e-mails of het samenvatten van documenten. De uitkomst moet dan worden begrensd en bij twijfel controleerbaar blijven.",
        ],
        table: {
          caption: "Keuzehulp voor regels, AI en menselijke controle",
          headers: ["Situatie", "Passende route", "Belangrijkste controle"],
          rows: [
            ["Vaste velden en eenduidige voorwaarden", "Gewone softwarelogica", "Test iedere beslisregel en grenswaarde"],
            ["Vrije tekst met herkenbare categorieën", "AI met vaste validatie", "Betrouwbaarheidsgrens en steekproeven"],
            ["Onvolledige of tegenstrijdige invoer", "Menselijke beoordeling", "Toon broninformatie en reden van twijfel"],
            ["Besluit met grote financiële of juridische impact", "Mens blijft beslissen", "Leg beslissing, bevoegdheid en auditspoor vast"],
          ],
        },
      },
      {
        id: "meten",
        title: "Hoe meet je of automatisering werkelijk helpt?",
        paragraphs: [
          "Meet vóór de bouw minimaal één normale periode. Noteer niet alleen hoeveel minuten een handeling kost, maar ook wachttijd, herstelwerk en hoeveel dossiers een uitzondering worden. Vergelijk daarna dezelfde definities. Een kortere doorlooptijd met meer verborgen fouten is geen verbetering.",
        ],
        bullets: [
          { title: "Doorlooptijd", text: "Tijd van aanleiding tot afgerond resultaat, inclusief wachten tussen teams." },
          { title: "Handmatige contactmomenten", text: "Aantal keer dat iemand gegevens overneemt, navraagt of een status handmatig bijwerkt." },
          { title: "Herstelwerk", text: "Aantal dossiers dat opnieuw moet worden verwerkt door ontbrekende, dubbele of onjuiste invoer." },
          { title: "Uitzonderingspercentage", text: "Aandeel dat bewust menselijke beoordeling nodig heeft en de redenen daarvoor." },
          { title: "Gebruik en eigenaarschap", text: "Of medewerkers de nieuwe route daadwerkelijk gebruiken en duidelijk is wie afwijkingen opvolgt." },
        ],
      },
    ],
  },
  "welk-proces-automatiseren": {
    slug: "welk-proces-automatiseren",
    title: "Welk proces kun je het beste als eerste automatiseren?",
    metaTitle: "Welk proces automatiseren? Praktische keuzehulp | ProcesMaat",
    metaDescription: "Vergelijk terugkerende bedrijfsprocessen met zes concrete criteria en kies een eerste automatisering die klein, meetbaar en beheersbaar is.",
    intro: "Een goede eerste automatisering is zichtbaar genoeg om resultaat te meten, maar klein genoeg om uitzonderingen te begrijpen. Met deze keuzehulp vergelijk je processen op waarde, haalbaarheid en risico voordat je een tool of leverancier kiest.",
    readingTime: "7 minuten",
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    primaryService: "/procesautomatisering",
    primaryServiceLabel: "Bespreek procesautomatisering",
    sections: [
      {
        id: "inventarisatie",
        title: "Begin met een korte procesinventarisatie",
        paragraphs: [
          "Vraag medewerkers welke terugkerende handeling zij zelf zouden schrappen als dat morgen veilig kon. Verzamel maximaal vijf kandidaten en beschrijf ze steeds van concrete start tot concreet resultaat. ‘Administratie automatiseren’ is te breed; ‘nieuwe aanvragen controleren en als taak in het CRM zetten’ is wel vergelijkbaar.",
        ],
        bullets: [
          { title: "Startsignaal", text: "Wat zet het proces in beweging: een e-mail, formulier, bestand, statuswijziging of vast moment?" },
          { title: "Invoer", text: "Welke gegevens zijn nodig en waar komen die nu vandaan?" },
          { title: "Uitkomst", text: "Wanneer is het proces klaar en wie gebruikt het resultaat?" },
          { title: "Uitzonderingen", text: "Welke situaties passen niet in de standaardroute en wie beoordeelt die?" },
        ],
      },
      {
        id: "scorekaart",
        title: "Beoordeel iedere kandidaat op zes criteria",
        paragraphs: [
          "Geef ieder criterium één tot vijf punten. Een hoge frequentie en veel handwerk verhogen de kans; onduidelijke regels en hoge impact verlagen de geschiktheid voor een eerste project. Gebruik de totaalscore als hulpmiddel bij de afweging, niet als automatische beslissing.",
        ],
        table: {
          caption: "Scorekaart voor een eerste automatiseringskans",
          headers: ["Criterium", "1 punt", "3 punten", "5 punten"],
          rows: [
            ["Frequentie", "Maandelijks of minder", "Wekelijks", "Dagelijks of vaker"],
            ["Handmatige tijd", "Minder dan 1 uur per week", "1–5 uur per week", "Meer dan 5 uur per week"],
            ["Regelduidelijkheid", "Veel impliciete keuzes", "Hoofdroute is duidelijk", "Regels en grenzen zijn expliciet"],
            ["Datakwaliteit", "Verspreid en vaak onvolledig", "Meestal bruikbaar", "Digitaal, compleet en consistent"],
            ["Herstelwaarde", "Fout is eenvoudig te herstellen", "Fout veroorzaakt merkbaar extra werk", "Fout blokkeert klant of operatie"],
            ["Eigenaarschap", "Niemand beslist", "Verantwoordelijke is bekend", "Eigenaar heeft tijd en mandaat"],
          ],
        },
        note: { title: "Risico weegt apart", text: "Een proces kan hoog scoren en toch ongeschikt zijn als een fout grote veiligheids-, financiële, privacy- of juridische gevolgen heeft. Ontwerp daar eerst menselijke goedkeuring en herstel voor." },
      },
      {
        id: "prioriteren",
        title: "Lees de score samen met de praktijk",
        bullets: [
          { title: "24–30 punten", text: "Kansrijke eerste kandidaat. Controleer afhankelijkheden en test een afgebakende deelstroom." },
          { title: "18–23 punten", text: "Eerst één zwakke factor verbeteren, bijvoorbeeld invoer standaardiseren of eigenaarschap vastleggen." },
          { title: "Onder 18 punten", text: "Waarschijnlijk eerst vereenvoudigen, documenteren of een bestaande pakketfunctie beter benutten." },
        ],
        paragraphs: [
          "Kijk daarnaast naar samenhang. Een klein proces dat door één systeemkoppeling drie teams helpt, kan aantrekkelijker zijn dan een groter proces met veel afhankelijkheden. Kies bij een gelijke score de kandidaat waarvan je de nulmeting en uitzonderingen het betrouwbaarst kunt vastleggen.",
        ],
      },
      {
        id: "voorbeeld",
        title: "Voorbeeld: van mailbox naar gecontroleerde opvolging",
        steps: [
          { title: "Aanleiding", text: "Een aanvraag komt via een vast formulier of een herkenbaar e-mailadres binnen." },
          { title: "Controle", text: "Verplichte gegevens en dubbele inzendingen worden gecontroleerd; onvolledige aanvragen gaan naar een medewerker." },
          { title: "Verwerking", text: "Een geldig dossier wordt in het leidende systeem aangemaakt met bron en verantwoordelijke." },
          { title: "Opvolging", text: "De aanvrager krijgt een passende bevestiging en een medewerker ziet wanneer actie nodig is." },
          { title: "Meting", text: "Vergelijk overtypen, tijd tot eerste opvolging en het aantal herstelde dossiers met de oude route." },
        ],
      },
      {
        id: "scan-voorbereiden",
        title: "Vermeld dit in je digitale aanvraag",
        bullets: [
          { title: "Drie echte voorbeelden", text: "Een normale aanvraag, een onvolledige aanvraag en een afwijkende situatie." },
          { title: "Betrokken systemen", text: "Namen van gebruikte pakketten en, indien bekend, beschikbare API’s, webhooks of exports." },
          { title: "Huidige aantallen", text: "Frequentie, geschatte tijd en het aantal dossiers dat herstel nodig heeft." },
          { title: "Gewenste grens", text: "Welke stap automatisch mag en waar een medewerker altijd moet beslissen." },
        ],
      },
    ],
  },
  "maatwerksoftware-of-standaardpakket": {
    slug: "maatwerksoftware-of-standaardpakket",
    title: "Maatwerksoftware of een standaardpakket: hoe maak je de keuze?",
    metaTitle: "Maatwerksoftware of standaardpakket kiezen | ProcesMaat",
    metaDescription: "Vergelijk standaardsoftware, no-code, systeemkoppelingen en maatwerk op procesfit, beheer, kosten en risico voordat je laat bouwen.",
    intro: "De beste softwarekeuze is meestal de kleinste oplossing die het belangrijke proces betrouwbaar ondersteunt. Soms is dat een bestaande pakketfunctie, soms een koppeling en soms gerichte maatwerksoftware. Deze vergelijking helpt om de keuze uitlegbaar te maken.",
    readingTime: "8 minuten",
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    primaryService: "/maatwerksoftware",
    primaryServiceLabel: "Bekijk maatwerksoftware",
    sections: [
      {
        id: "routes",
        title: "Vier routes die vaak door elkaar worden gehaald",
        table: {
          caption: "Vergelijking van softwarekeuzes",
          headers: ["Route", "Past vooral wanneer", "Belangrijkste beperking"],
          rows: [
            ["Standaardpakket", "Het proces gangbaar is en configuratie voldoende ruimte geeft", "Werkwijze moet zich deels aan het pakket aanpassen"],
            ["No-code of low-code", "Een beperkte workflow snel getest moet worden", "Complexiteit, beheer en kosten kunnen bij groei oplopen"],
            ["Systeemkoppeling", "Bestaande tools goed werken maar gegevens nog handmatig bewegen", "Kwaliteit hangt af van API’s en afspraken van leveranciers"],
            ["Maatwerksoftware", "Een belangrijk proces structureel afwijkt en eigen rollen of logica nodig heeft", "Bouw, onderhoud en producteigenaarschap blijven nodig"],
          ],
        },
        paragraphs: [
          "Een hybride route is normaal. Een bestaand CRM kan leidend blijven, terwijl een kleine maatwerkinterface en een API-koppeling precies het ontbrekende proces ondersteunen. Het is zelden nodig om het hele softwarelandschap te vervangen.",
        ],
      },
      {
        id: "standaard-eerst",
        title: "Wanneer is een standaardpakket waarschijnlijk beter?",
        bullets: [
          { title: "Het proces is gangbaar", text: "Boekhouding, planning of projectbeheer volgt grotendeels een bekende werkwijze." },
          { title: "Snelheid weegt zwaar", text: "De oplossing moet op korte termijn beschikbaar zijn en configuratie biedt voldoende resultaat." },
          { title: "Beheer moet uitbesteed blijven", text: "Updates, beveiliging en compliance kunnen beter door een gespecialiseerde pakketleverancier worden gedragen." },
          { title: "De afwijking is tijdelijk", text: "Een workaround verdwijnt waarschijnlijk door een geplande organisatie- of pakketwijziging." },
        ],
      },
      {
        id: "maatwerk-signalen",
        title: "Wanneer wordt maatwerk een serieuze optie?",
        bullets: [
          { title: "Een kernproces blijft knellen", text: "De afwijking raakt dagelijks werk, klantbediening of schaalbaarheid en is niet met configuratie op te lossen." },
          { title: "Workarounds stapelen zich op", text: "Teams gebruiken eigen spreadsheets, dubbele invoer of handmatige controles naast het pakket." },
          { title: "Eigen logica is onderscheidend", text: "De manier van plannen, beoordelen of leveren is belangrijk voor de organisatie en moet beheersbaar meegroeien." },
          { title: "De businesscase is herhaalbaar", text: "De verwachte waarde komt terug over voldoende transacties, medewerkers of jaren om bouw en beheer te dragen." },
        ],
        note: { title: "Maatwerk is geen eindstation", text: "Een eigen oplossing vraagt blijvend eigenaarschap: iemand prioriteert wijzigingen, bewaakt gegevenskwaliteit en beslist wat wel en niet wordt toegevoegd." },
      },
      {
        id: "totale-kosten",
        title: "Vergelijk totale kosten in plaats van alleen de aanschaf",
        paragraphs: [
          "Een licentieprijs en een bouwvoorstel zijn niet direct vergelijkbaar. Zet dezelfde periode en hetzelfde proces naast elkaar. Neem ook implementatie, migratie, koppelingen, training, beheer, wijzigingen, hosting, support en het risico van leverancier- of kennisafhankelijkheid mee.",
        ],
        bullets: [
          { title: "Huidig handwerk", text: "Tijd voor invoer, controles, correcties, uitleg en wachten tussen systemen." },
          { title: "Implementatie", text: "Procesanalyse, inrichting, gegevensopschoning, migratie, testen en opleiding." },
          { title: "Doorlopend beheer", text: "Licenties, hosting, monitoring, beveiligingsupdates en aanpassingen bij pakketwijzigingen." },
          { title: "Veranderbaarheid", text: "Kosten en doorlooptijd om regels, rollen of koppelingen later veilig te wijzigen." },
          { title: "Stop- en overstapkosten", text: "Exportmogelijkheden, eigendom van data en code, documentatie en afhankelijkheid van één leverancier." },
        ],
      },
      {
        id: "selectievragen",
        title: "Acht vragen vóór je een oplossing kiest",
        steps: [
          { title: "1. Welk procesresultaat moet verbeteren?", text: "Formuleer een meetbare uitkomst in plaats van een lijst functies." },
          { title: "2. Welke pakketfunctie is al beschikbaar?", text: "Controleer configuratie en standaardkoppelingen voordat je iets nieuws bouwt." },
          { title: "3. Welk systeem blijft leidend?", text: "Voorkom dat dezelfde gegevens zonder duidelijke eigenaar op meerdere plekken wijzigen." },
          { title: "4. Welke uitzonderingen zijn normaal?", text: "Een demo van de hoofdroute zegt weinig als dagelijks veel dossiers afwijken." },
          { title: "5. Welke gegevens zijn gevoelig?", text: "Beperk toegang, opslag en doorgifte tot wat het proces nodig heeft." },
          { title: "6. Wie wordt producteigenaar?", text: "Wijs iemand aan die beslissingen neemt en gebruikersfeedback prioriteert." },
          { title: "7. Hoe kun je stoppen of overstappen?", text: "Leg data-export, documentatie, broncode en beëindigingsvoorwaarden vooraf vast." },
          { title: "8. Wat is de kleinste bruikbare proef?", text: "Test één belangrijke route met echte scenario’s voordat je breed uitrolt." },
        ],
      },
    ],
  },
  "api-koppeling-checklist": {
    slug: "api-koppeling-checklist",
    title: "API-koppeling laten maken? Gebruik eerst deze technische checklist",
    metaTitle: "API-koppeling checklist voor het mkb | ProcesMaat",
    metaDescription: "Controleer brondata, synchronisatierichting, beveiliging, validatie, retries, monitoring en beheer voordat je bedrijfssystemen laat koppelen.",
    intro: "Een API-koppeling is pas geslaagd als gegevens niet alleen van systeem A naar B bewegen, maar ook bij dubbele invoer, storingen en pakketwijzigingen beheersbaar blijven. Deze checklist maakt de belangrijkste ontwerpvragen vooraf concreet.",
    readingTime: "8 minuten",
    publishedAt: "2026-08-25",
    updatedAt: "2026-08-25",
    primaryService: "/systeemkoppelingen",
    primaryServiceLabel: "Bekijk systeemkoppelingen",
    sections: [
      {
        id: "vooraf",
        title: "Bepaal eerst of een maatwerkkoppeling nodig is",
        paragraphs: [
          "Controleer of de leveranciers al een officiële integratie aanbieden. Een ondersteunde standaardkoppeling is vaak eenvoudiger te beheren. Maatwerk wordt relevant wanneer velden, beslisregels, volumes of foutafhandeling structureel afwijken en die afwijking belangrijk genoeg is om zelf te beheren.",
        ],
        table: {
          caption: "Keuze tussen standaardconnector en maatwerkkoppeling",
          headers: ["Vraag", "Standaardconnector past", "Maatwerk onderzoeken"],
          rows: [
            ["Gegevensmodel", "Standaardvelden zijn voldoende", "Eigen objecten, transformaties of validatie nodig"],
            ["Synchronisatie", "Eén bekende richting en frequentie", "Meerdere richtingen, gebeurtenissen of afhankelijkheden"],
            ["Foutafhandeling", "Leverancier biedt inzicht en herstel", "Eigen wachtrij, herverwerking of escalatie nodig"],
            ["Eigenaarschap", "Leverancier beheert beide kanten", "Organisatie wil eigen regels, logging of tempo beheren"],
          ],
        },
      },
      {
        id: "datacontract",
        title: "Leg het datacontract vast",
        bullets: [
          { title: "Bron van waarheid", text: "Bepaal per veld welk systeem leidend is en waar een medewerker wijzigingen mag doen." },
          { title: "Veldmapping", text: "Leg naam, type, verplichting, formaat, toegestane waarden en transformatie van ieder gegeven vast." },
          { title: "Identificatie", text: "Gebruik stabiele sleutels om dubbele records en verkeerde koppelingen te voorkomen." },
          { title: "Richting en moment", text: "Spreek af of data één- of tweerichtingsverkeer is en welke gebeurtenis synchronisatie start." },
          { title: "Dataminimalisatie", text: "Stuur alleen gegevens die voor het ontvangende proces nodig zijn." },
        ],
      },
      {
        id: "betrouwbaarheid",
        title: "Ontwerp storing en herstel als normale situaties",
        steps: [
          { title: "Valideer vóór verzending", text: "Blokkeer onvolledige of onverwachte gegevens voordat een fout zich naar een tweede systeem verspreidt." },
          { title: "Maak verwerking idempotent", text: "Dezelfde gebeurtenis mag bij een herhaling niet stilzwijgend een tweede klant, order of factuur maken." },
          { title: "Gebruik begrensde retries", text: "Probeer tijdelijke fouten opnieuw met oplopende tussenpozen en respecteer snelheidslimieten van de leverancier." },
          { title: "Bewaar een herstelbare status", text: "Maak zichtbaar wat wacht, is gelukt of handmatige actie nodig heeft zonder gevoelige inhoud onnodig te loggen." },
          { title: "Waarschuw de juiste eigenaar", text: "Een foutmelding moet bruikbaar zijn voor degene die gegevens of techniek kan herstellen." },
        ],
      },
      {
        id: "beveiliging",
        title: "Beperk toegang en bescherm geheimen",
        bullets: [
          { title: "Serverzijdige geheimen", text: "API-sleutels en tokens horen niet in browsercode, openbare configuratie of applicatielogs." },
          { title: "Minimale rechten", text: "Geef de koppeling alleen toegang tot noodzakelijke objecten en handelingen." },
          { title: "Versleuteld transport", text: "Gebruik HTTPS en controleer certificaten en bestemmingshosts." },
          { title: "Rotatie en intrekking", text: "Leg vast hoe toegang wordt vernieuwd en direct kan worden ingetrokken bij een incident." },
          { title: "Privacy en bewaartermijnen", text: "Maak duidelijk welke persoonsgegevens bewegen, waarom dat nodig is en waar ze worden bewaard." },
        ],
      },
      {
        id: "oplevering",
        title: "Wat hoort bij een beheerbare oplevering?",
        bullets: [
          { title: "Technische documentatie", text: "Architectuur, endpoints, veldmapping, authenticatie, limieten en bekende uitzonderingen." },
          { title: "Testset", text: "Normale, dubbele, ontbrekende, ongeldige en vertraagde scenario’s met verwachte uitkomst." },
          { title: "Monitoring", text: "Duidelijke signalen voor fouten, achterstand, verlopen toegang en onverwachte volumes." },
          { title: "Herstelprocedure", text: "Wie mag opnieuw verwerken, welke controles zijn nodig en hoe dubbele verwerking wordt voorkomen." },
          { title: "Wijzigingsafspraken", text: "Wie reageert wanneer een leverancier een API-versie, veld of autorisatiemethode wijzigt." },
        ],
        note: { title: "Vraag niet alleen of de koppeling werkt", text: "Vraag hoe zichtbaar een mislukking is, hoe veilig opnieuw verwerken gebeurt en wie verantwoordelijk is wanneer één van de pakketten verandert." },
      },
    ],
  },
};

export const knowledgeList = Object.values(knowledgeArticles);

