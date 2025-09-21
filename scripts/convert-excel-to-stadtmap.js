// Script zur Konvertierung der Excel-Daten in die stadt_map.json
// Liest die geparsete Excel-Datei und konvertiert sie ins richtige Format

const fs = require('fs');
const path = require('path');

// Parse die Excel-Daten aus der markdown-ähnlichen Struktur
function parseExcelData(markdownContent) {
  const lines = markdownContent.split('\n');
  const stadtMap = {};
  
  for (const line of lines) {
    // Suche nach Zeilen mit dem Format |ID|Name|
    const match = line.match(/^\|(\d+)\|([^|]+)\|$/);
    if (match) {
      const id = match[1];
      const name = match[2].trim();
      
      // Überspringe die Header-Zeile
      if (id !== '-' && name !== '-') {
        stadtMap[id] = name;
      }
    }
  }
  
  return stadtMap;
}

// Excel-Inhalte (von der geparseten Datei)
const excelData = `|1003853|Adlershof|
|1003854|Berlin|
|1003855|Bad Belzig|
|1003856|Birkenwerder|
|1003857|Brandenburg|
|1003858|Bremerhaven|
|1003859|Cottbus|
|1003860|Dahlewitz|
|1003861|Eberswalde|
|1003862|Eisenhuttenstadt|
|1003863|Falkenhagen|
|1003864|Schorfheide|
|1003865|Finsterwalde|
|1003866|Frankfurt an der Oder|
|1003867|Furstenwalde|
|1003868|Golssen|
|1003869|Gross Glienicke|
|1003870|Blankenfelde-Mahlow|
|1003871|Grossbeeren|
|1003872|Herzberg|
|1003873|Karwe|
|1003874|Kleinmachnow|
|1003875|Kremmen|
|1003876|Lauchhammer|
|1003877|Lausitz|
|1003878|Lindenberg|
|1003879|Luckenwalde|
|1003880|Oberkramer|
|1003881|Muhlenbecker Land|
|1003882|Neu Fahrland|
|1003883|Neuenhagen|
|1003884|Neuruppin|
|1003885|Oranienburg|
|1003886|Potsdam|
|1003887|Prenzlau|
|1003888|Schonefeld|
|1003889|Schwedt|
|1003890|Senftenberg|
|1003891|Stahnsdorf|
|1003892|Strausberg|
|1003893|Teltow|
|1003894|Waltersdorf|
|1003895|Wandlitz|
|1003896|Wittstock|
|1003897|Wunsdorf|
|1003898|Wusterhausen|
|1003899|Zeuthen|
|1003900|Aalen|
|1003901|Achern|
|1003902|Aichtal|
|1003903|Aitrach|
|1003904|Albstadt|
|1003905|Altensteig|
|1003906|Asperg|
|1003907|Backnang|
|1003908|Bad Liebenzell|
|1003909|Bad Mergentheim|
|1003910|Bad Waldsee|
|1003911|Baden-Baden|
|1003912|Balingen|
|1003913|Besigheim|
|1003914|Biberach|
|1003915|Bietigheim|
|1003916|Blaubeuren|
|1003917|Blumberg|
|1003918|Boblingen|
|1003919|Boll|
|1003920|Bonndorf|
|1003921|Braunlingen|
|1003922|Breisach|
|1003923|Bretten|
|1003924|Bruchsal|
|1003925|Buchen|
|1003926|Buhl|
|1003927|Burladingen|
|1003928|Calw|
|1003929|Crailsheim|
|1003930|Diessen|
|1003931|Ditzingen|
|1003932|Donzdorf|
|1003933|Eberbach|
|1003934|Ehingen|
|1003935|Ehningen|
|1003936|Ellwangen|
|1003937|Eningen|
|1003938|Esslingen|
|1003939|Ettlingen|
|1003940|Fellbach|
|1003941|Filderstadt|
|1003942|Freiberg|
|1003943|Freiburg im Breisgau|
|1003944|Freudenstadt|
|1003945|Friedrichshafen|
|1003946|Furtwangen|
|1003947|Geislingen|
|1003948|Gengenbach|
|1003949|Gerlingen|
|1003950|Goppingen|
|1003951|Gottenheim|
|1003952|Gottmadingen|
|1003953|Grenzach-Wyhlen|
|1003955|Hardheim|
|1003956|Heddesheim|
|1003957|Heidelberg|
|1003958|Heidenheim|
|1003959|Heilbronn|
|1003960|Herrenberg|
|1003961|Hockenheim|
|1003962|Horb am Neckar|
|1003963|Hornberg|
|1003964|Ilshofen|
|1003965|Isny im Allgau|
|1003966|Ispringen|
|1003967|Karlsbad|
|1003968|Karlsruhe|
|1003969|Kehl|
|1003970|Kenzingen|
|1003971|Kirchheim unter Teck|
|1003972|Kirchzarten|
|1003973|Konigsbach-Stein|
|1003974|Konstanz|
|1003975|Kornwestheim|
|1003976|Kunzelsau|
|1003977|Ladenburg|
|1003978|Lahr|
|1003979|Langenau|
|1003980|Lauchheim|
|1003981|Lauffen am Neckar|
|1003982|Laupheim|
|1003983|Leimen|
|1003984|Leinfelden-Echterdingen|
|1003985|Leonberg|
|1003986|Lichtenau|
|1003987|Lorch|
|1003988|Lorrach|
|1003989|Ludwigsburg|
|1003990|Bodman-Ludwigshafen|
|1003991|Malsch|
|1003992|Mannheim|
|1003993|Marbach am Neckar|
|1003994|Markdorf|
|1003995|Meckenbeuren|
|1003996|Messkirch|
|1003997|Metzingen|
|1003998|Mosbach|
|1003999|Muhlacker|
|1004000|Mullheim|
|1004001|Nagold|
|1004002|Neckarsulm|
|1004003|Neckartailfingen|
|1004004|Neckartenzlingen|
|1004005|Nurtingen|
|1004006|Eberhardzell|
|1004007|Oberkirch|
|1004008|Oberkochen|
|1004009|Oberndorf|
|1004010|Oberrot|
|1004011|Offenburg|
|1004012|Ohringen|
|1004013|Oppenweiler|
|1004014|Ostfildern|
|1004015|Owen|
|1004016|Pforzheim|
|1004017|Pfullendorf|
|1004018|Pfullingen|
|1004019|Plochingen|
|1004020|Radolfzell|
|1004021|Rangendingen|
|1004022|Rastatt|
|1004023|Ravensburg|
|1004024|Renchen|
|1004025|Renningen|
|1004026|Reutlingen|
|1004027|Rheinfelden|
|1004028|Rheinstetten|
|1004029|Rottenburg|
|1004030|Rottweil|
|1004031|Rutesheim|
|1004032|Sachsenheim|
|1004033|Sankt Blasien|
|1004034|Bad Saulgau|
|1004035|Schiltach|
|1004036|Schopfheim|
|1004037|Schorndorf|
|1004038|Schwabisch Gmund|
|1004039|Schwabisch Hall|
|1004040|Schwenningen|
|1004041|Schwetzingen|
|1004042|Schwieberdingen|
|1004043|Sigmaringen|
|1004044|Sindelfingen|
|1004045|Ehingen|
|1004046|Sinsheim|
|1004047|Staufen|
|1004048|Steinen|
|1004049|Steinheim an der Murr|
|1004050|Stetten am kalten Markt|
|1004051|Stockach|
|1004052|Straubenhardt|
|1004053|Stutensee|
|1004054|Stuttgart|
|1004055|Sulz|
|1004056|Sussen|
|1004057|Tauberbischofsheim|
|1004058|Teningen|
|1004059|Triberg|
|1004060|Trossingen|
|1004061|Tubingen|
|1004062|Tuttlingen|
|1004063|Uberlingen|
|1004064|Ulm|
|1004065|Vaihingen an der Enz|
|1004066|Villingen-Schwenningen|
|1004067|Vohringen|
|1004068|Waiblingen|
|1004069|Waldbronn|
|1004070|Waldenburg|
|1004071|Waldkirch|
|1004072|Waldshut-Tiengen|
|1004073|Walldorf|
|1004074|Wangen im Allgau|
|1004075|Wehr|
|1004076|Weil am Rhein|
|1004077|Weingarten|
|1004078|Weinheim|
|1004079|Weinsberg|
|1004080|Weinstadt|
|1004081|Weissach|
|1004082|Welzheim|
|1004083|Wendlingen|
|1004084|Wertheim am Main|
|1004085|Wiesloch|
|1004086|Winnenden|
|1004087|Zaberfeld|
|1004088|Zell im Wiesental|`;

// Konvertiere die Daten und schreibe die neue JSON-Datei
console.log('Konvertiere Excel-Daten zu stadt_map.json...');
const neueStadtMap = parseExcelData(excelData);

// Schreibe die neue JSON-Datei
const jsonOutput = JSON.stringify(neueStadtMap, null, 2);
fs.writeFileSync('netlify/functions/stadt_map.json', jsonOutput);

console.log(`✅ stadt_map.json wurde aktualisiert mit ${Object.keys(neueStadtMap).length} Einträgen`);
console.log('Erste 5 Einträge:');
Object.entries(neueStadtMap).slice(0, 5).forEach(([id, name]) => {
  console.log(`  ${id}: "${name}"`);
});