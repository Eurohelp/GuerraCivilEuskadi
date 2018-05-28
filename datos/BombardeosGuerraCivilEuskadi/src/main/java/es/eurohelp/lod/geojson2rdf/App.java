package es.eurohelp.lod.geojson2rdf;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class App {

	public static void main(String[] args) throws FileNotFoundException, IOException, ParseException {
      JSONParser parser = new JSONParser();
      JSONObject obj = (JSONObject) parser.parse(new FileReader("bombardeos-guerra-civil.geojson"));
      JSONArray features = (JSONArray) obj.get("features");
      Iterator<JSONObject> iterator = features.iterator();
      while (iterator.hasNext()) {
          System.out.println((iterator.next()).get("id"));
      }
	}
}
