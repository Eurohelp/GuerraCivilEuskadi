package es.eurohelp.lod.geojson2rdf;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class App {
	private static final String baseURIBombardeo = "http://id.euskadi.eus/public-sector/history/bombardment/";

	public static void main(String[] args) throws FileNotFoundException, IOException, ParseException {
		JSONParser parser = new JSONParser();
		JSONObject obj = (JSONObject) parser.parse(new FileReader("bombardeos-guerra-civil.geojson"));
		JSONArray features = (JSONArray) obj.get("features");
		Iterator<JSONObject> iterator = features.iterator();
		while (iterator.hasNext()) {
			processFeature(iterator.next());
		}
	}

	private static void processFeature(JSONObject feature) {
		// System.out.print("<" + generateMainURI((JSONObject)feature.get("properties"))
		// + ">");
		processGeometry((JSONObject) feature.get("geometry"));
		processProperties((JSONObject) feature.get("properties"));
		// System.out.println("");
	}

	private static void processGeometry(JSONObject geometry) {
		JSONArray coordinates = (JSONArray) geometry.get("coordinates");
		// System.out.println("<http://www.w3.org/2003/01/geo/wgs84_pos#lat>\"" +
		// coordinates.get(1) + "\"^^<http://www.w3.org/2001/XMLSchema#double> ;");
		// System.out.println("<http://www.w3.org/2003/01/geo/wgs84_pos#long>\"" +
		// coordinates.get(0) + "\"^^<http://www.w3.org/2001/XMLSchema#double> ;");
	}

	private static void processProperties(JSONObject properties) {
		// System.out.println("<http://schema.org/location>\"" +
		// properties.get("localidad") + "\"^^<http://www.w3.org/2001/XMLSchema#string>
		// ;");
		// System.out.println("<http://id.euskadi.eus/def/euskadipedia/numerobombardeos>\""
		// + properties.get("numero de bombardeos") +
		// "\"^^<http://www.w3.org/2001/XMLSchema#int> ;");
		// System.out.println("fechas: " + );

		String fechastotal = trimFechas((String) properties.get("fechas"));
		System.out.println(">>>" + fechastotal);
		String[] fechas = fechastotal.trim().split("\\s");
		for (String fecha : fechas) {
			if (!fecha.isEmpty()) {
				String[] fechadecomp = fecha.split("/");
				System.out.println(fechadecomp[0]);
				System.out.println(fechadecomp[1]);
				System.out.println(fechadecomp[2]);
			}
		}

		// http://dbpedia.org/ontology/date

		// System.out.println("bando: " + properties.get("bando"));
		// System.out.println("descripcion: " + properties.get("descripcion"));
		// System.out.println("fuente: "+ properties.get("fuente"));
	}

	private static String generateMainURI(JSONObject properties) {
		return baseURIBombardeo + urify(null, null, (String) properties.get("localidad")
				+ trimFechas((String) properties.get("fechas")) + (String) properties.get("bando"));
	}

	// "fechas" : " Desde 29/09/1936 hasta 26/04/1937",
	private static String trimFechas(String fechas) {
		return fechas.replace("Desde", "").replace("hasta", "");
	}

	private static String urify(String regexp, String replacement, String targetstring) {
		String result = null;
		String regularExpression = null;
		String textReplacement = null;

		// Main replacement and collapse contigous replacement characters
		if (regexp == null) {
			regularExpression = "\\(|\\)|\\s|\\/|\\.|:|!|\\?|\\[|\\]|;|\\+|_|\\*|ª|º|,";
		} else {
			regularExpression = regexp;
		}
		if (replacement == null) {
			textReplacement = "-";
		} else {
			textReplacement = replacement;
		}
		String tmpResult = targetstring.replaceAll(regularExpression, textReplacement).replaceAll("[-]{2,}",
				textReplacement);

		// Replace especial characters
		tmpResult = tmpResult.replaceAll("á|Á", "a");
		tmpResult = tmpResult.replaceAll("é|É", "e");
		tmpResult = tmpResult.replaceAll("í|Í", "i");
		tmpResult = tmpResult.replaceAll("ó|Ó", "o");
		tmpResult = tmpResult.replaceAll("ú|Ú", "u");
		tmpResult = tmpResult.replaceAll("ñ|Ñ", "n");
		tmpResult = tmpResult.replaceAll("ü|Ü", "u");

		// Delete first replacement character, if any
		if (tmpResult.startsWith(textReplacement)) {
			tmpResult = tmpResult.substring(1);
		}

		// Delete last replacement character, if any
		if (tmpResult.endsWith(textReplacement)) {
			tmpResult = tmpResult.substring(0, tmpResult.length() - 1);
		}

		// Make everything lowercase
		tmpResult = tmpResult.toLowerCase();
		result = tmpResult;
		return result;
	}
}
