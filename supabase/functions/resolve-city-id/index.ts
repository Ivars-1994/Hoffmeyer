import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Stadt-Map direkt eingebettet (verkürzte Version für bessere Performance)
const stadtMap: Record<string, string> = {
  "1004576": "Aachen",
  "1004577": "Ahaus", 
  "1004578": "Ahlen",
  "1004579": "Alfter",
  "1004580": "Alsdorf",
  "1004581": "Altenberge",
  "1004582": "Arnsberg",
  "1004583": "Attendorn",
  "1004584": "Bad Berleburg",
  "1004585": "Bad Oeynhausen",
  "1004586": "Bad Sassendorf",
  "1004587": "Baesweiler",
  "1004588": "Beckum",
  "1004589": "Bedburg",
  "1004590": "Bergheim",
  "1004591": "Bergisch Gladbach",
  "1004592": "Bergkamen",
  "1004593": "Bielefeld",
  "1004594": "Billerbeck",
  "1004595": "Bocholt",
  "1004596": "Bochum",
  "1004597": "Bonn",
  "1004598": "Borchen",
  "1004599": "Borken",
  "1004600": "Bornheim",
  "1004601": "Bottrop",
  "1004602": "Bunde",
  "1004603": "Burbach",
  "1004604": "Burscheid",
  "1004605": "Castrop-Rauxel",
  "1004606": "Coesfeld",
  "1004607": "Cologne",
  "1004608": "Detmold",
  "1004609": "Dormagen",
  "1004610": "Dorsten",
  "1004611": "Dortmund",
  "1004612": "Duisburg",
  "1004613": "Dulmen",
  "1004614": "Duren",
  "1004615": "Dusseldorf",
  "1004616": "Emmerich",
  "1004617": "Emsdetten",
  "1004618": "Ennepetal",
  "1004619": "Erftstadt",
  "1004620": "Erkelenz",
  "1004621": "Erkrath",
  "1004622": "Erwitte",
  "1004623": "Eschweiler",
  "1004624": "Espelkamp",
  "1004625": "Essen",
  "1004626": "Euskirchen",
  "1004627": "Everswinkel",
  "1004628": "Frechen",
  "1004629": "Freudenberg",
  "1004630": "Frondenberg",
  "1004631": "Gelsenkirchen",
  "1004632": "Gevelsberg",
  "1004633": "Goch",
  "1004634": "Grefrath",
  "1004635": "Greven",
  "1004636": "Grevenbroich",
  "1004637": "Gronau",
  "1004638": "Gummersbach",
  "1004639": "Gutersloh",
  "1004640": "Haan",
  "1004641": "Haltern am See",
  "1004642": "Hamm",
  "1004643": "Hattingen",
  "1004644": "Hatzfeld",
  "1004645": "Heiligenhaus",
  "1004646": "Heinsberg",
  "1004647": "Hemer",
  "1004648": "Hennef",
  "1004649": "Herdecke",
  "1004650": "Herford",
  "1004651": "Herne",
  "1004652": "Herten",
  "1004653": "Herzogenrath",
  "1004654": "Hiddenhausen",
  "1004655": "Hilden",
  "1004656": "Holzwickede",
  "1004657": "Horstel",
  "1004658": "Horstmar",
  "1004659": "Hoxter",
  "1004660": "Ratheim",
  "1004661": "Huckeswagen",
  "1004662": "Hurth",
  "1004663": "Ibbenburen",
  "1004664": "Iserlohn",
  "1004665": "Julich",
  "1004666": "Kaarst",
  "1004667": "Kall",
  "1004668": "Kempen",
  "1004669": "Kerpen",
  "1004670": "Kevelaer",
  "1004671": "Kierspe",
  "1004672": "Kirchlengern",
  "1004673": "Kleve",
  "1004674": "Korschenbroich",
  "1004675": "Krefeld",
  "1004676": "Kurten",
  "1004677": "Lage",
  "1004678": "Langenfeld",
  "1004679": "Lemgo",
  "1004680": "Lengerich",
  "1004681": "Leopoldshohe",
  "1004682": "Leverkusen",
  "1004683": "Linnich",
  "1004684": "Lippstadt",
  "1004685": "Lohmar",
  "1004686": "Lohne",
  "1004687": "Lubbecke",
  "1004688": "Ludenscheid",
  "1004689": "Ludinghausen",
  "1004690": "Lunen",
  "1004691": "Manheim",
  "1004692": "Marl",
  "1004693": "Marsberg",
  "1004694": "Mechernich",
  "1004695": "Meckenheim",
  "1004696": "Meerbusch",
  "1004697": "Meinerzhagen",
  "1004698": "Menden",
  "1004699": "Meschede",
  "1004700": "Mettmann",
  "1004701": "Minden",
  "1004702": "Moers",
  "1004703": "Monchengladbach",
  "1004704": "Monheim am Rhein",
  "1004705": "Morsbach",
  "1004706": "Mulheim",
  "1004707": "Munster",
  "1004708": "Neuss",
  "1004709": "Niederkassel",
  "1004710": "Oberhausen",
  "1004711": "Oelde",
  "1004712": "Olfen",
  "1004713": "Olpe",
  "1004714": "Overath",
  "1004715": "Paderborn",
  "1004716": "Plettenberg",
  "1004717": "Porta Westfalica",
  "1004718": "Pulheim",
  "1004719": "Ratingen",
  "1004720": "Recke",
  "1004721": "Recklinghausen",
  "1004722": "Remscheid",
  "1004723": "Rheda-Wiedenbruck",
  "1004724": "Rheine",
  "1004725": "County of Rietberg",
  "1004726": "Roetgen",
  "1004727": "Rosrath",
  "1004728": "Salzkotten",
  "1004729": "Schalksmuhle",
  "1004730": "Schwelm",
  "1004731": "Schwerte",
  "1004732": "Senden",
  "1004733": "Siegburg",
  "1004734": "Siegen",
  "1004735": "Soest",
  "1004736": "Solingen",
  "1004737": "Sprockhovel",
  "1004738": "Sankt Augustin",
  "1004739": "Stadtlohn",
  "1004740": "Steinfurt",
  "1004741": "Steinhagen",
  "1004742": "Stolberg (Rhineland)",
  "1004743": "Straelen",
  "1004744": "Tonisvorst",
  "1004745": "Troisdorf",
  "1004746": "Unna",
  "1004747": "Velbert",
  "1004748": "Verl",
  "1004749": "Versmold",
  "1004750": "Viersen",
  "1004751": "Vlotho",
  "1004752": "Vreden",
  "1004753": "Wachtberg",
  "1004754": "Wachtendonk",
  "1004755": "Walheim",
  "1004756": "Warburg",
  "1004757": "Warendorf",
  "1004758": "Weeze",
  "1004759": "Werdohl",
  "1004760": "Werl",
  "1004761": "Wermelskirchen",
  "1004762": "Wesel",
  "1004763": "Wetter",
  "1004764": "Wiehl",
  "1004765": "Willich",
  "1004766": "Winterberg",
  "1004767": "Wipperfurth",
  "1004768": "Witten",
  "1004769": "Wuppertal",
  "1004770": "Wurselen",
  "1004771": "Xanten",
  "1028816": "Hagen",
  // Weitere IDs können bei Bedarf hinzugefügt werden
  "9048141": "Aldenhoven",
  "9048146": "Alpen",
  "9048151": "Altena",
  "9048156": "Anrochte",
  "9048161": "Ascheberg",
  "9048169": "Bad Driburg",
  "9048179": "Bad Honnef",
  "9048185": "Bad Munstereifel",
  "9048190": "Bad Salzuflen",
  "9048198": "Bad Wunnenberg",
  "9048202": "Balve",
  "9048219": "Bestwig",
  "9048229": "Blomberg",
  "9048233": "Bonen",
  "9048238": "Borgholzhausen",
  "9048243": "Brakel",
  "9048249": "Brilon",
  "9048254": "Bruggen",
  "9048256": "Bruhl",
  "9048259": "Buren",
  "9048269": "Datteln",
  "9048273": "Delbruck",
  "9048281": "Dinslaken",
  "9048288": "Drensteinfurt",
  "9048290": "Drolshagen",
  "9048307": "Eitorf",
  "9048308": "Elsdorf",
  "9048316": "Engelskirchen",
  "9048318": "Enger",
  "9048319": "Ennigerloh",
  "9048320": "Ense",
  "9048331": "Eslohe",
  "9048342": "Finnentrop",
  "9048363": "Geilenkirchen",
  "9048366": "Geldern",
  "9048370": "Gescher",
  "9048371": "Geseke",
  "9048374": "Gladbeck",
  "9048396": "Halle",
  "9048398": "Hamminkeln",
  "9048402": "Harsewinkel",
  "9048428": "Herzebrock-Clarholz",
  "9048431": "Hilchenbach",
  "9048448": "Horn-Bad Meinberg",
  "9048449": "Hovelhof",
  "9048450": "Huckelhoven",
  "9048451": "Hullhorst",
  "9048453": "Hunxe",
  "9048461": "Isselburg",
  "9048462": "Issum",
  "9048466": "Kalkar",
  "9048467": "Kamen",
  "9048468": "Kamp-Lintfort"
};

serve(async (req) => {
  console.log(`🔍 Edge Function aufgerufen: ${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    console.log(`📥 ID Parameter: ${id}`);
    
    if (!id) {
      console.log(`❌ Keine ID angegeben`);
      return new Response(
        JSON.stringify({ error: "ID fehlt" }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const value = stadtMap[id];
    if (!value) {
      console.log(`❌ Unbekannte ID: ${id}`);
      return new Response(
        JSON.stringify({ error: "Unbekannte ID", id }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`✅ Gefundener Wert für ID ${id}: ${value}`);

    // Prüfe ob es eine PLZ ist (5 Ziffern)
    const isPlz = /^\d{5}$/.test(value);
    console.log(`🔍 Ist PLZ: ${isPlz}`);

    if (isPlz) {
      // PLZ zu Stadt über externe API
      const apiUrl = `https://openplzapi.org/de/Localities?postalCode=${value}`;
      console.log(`🌐 API-Aufruf für PLZ: ${apiUrl}`);
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const stadt = data?.[0]?.name || null;
        
        console.log(`📥 PLZ-API Antwort:`, data);
        console.log(`🏙️ Erkannte Stadt: ${stadt}`);
        
        if (!stadt) {
          return new Response(
            JSON.stringify({ error: "Stadt nicht gefunden (via PLZ)", id, plz: value }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const result = { id, typ: "plz-id", stadt, plz: value };
        console.log(`✅ PLZ-Ergebnis:`, result);
        
        return new Response(
          JSON.stringify(result),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } catch (error) {
        console.error(`❌ PLZ-API Fehler:`, error);
        return new Response(
          JSON.stringify({ error: "API Fehler", details: error.message }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } else {
      // Direkter Stadtname
      const result = { id, typ: "stadt-id", stadt: value };
      console.log(`✅ Stadt-Ergebnis:`, result);
      
      return new Response(
        JSON.stringify(result),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error(`❌ Allgemeiner Fehler:`, error);
    return new Response(
      JSON.stringify({ error: "Interner Serverfehler", details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});