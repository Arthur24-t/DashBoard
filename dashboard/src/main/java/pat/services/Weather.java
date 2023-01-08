package pat.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class Weather {
    
    public String getWeather(String cp){
		//get weather 
        try {

		URL url = new URL("http://api.weatherunlocked.com/api/current/fr."+cp+"?app_id=600788d8&app_key=b154847d8a30a60e1800ea47421d2864");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");

		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
					+ conn.getResponseCode());
		}

		BufferedReader br = new BufferedReader(new InputStreamReader(
			(conn.getInputStream())));

		String output;
        output = br.readLine();
		conn.disconnect();
        return output;
	
		  } catch (MalformedURLException e) {
	
			e.printStackTrace();
	
		  } catch (IOException e) {
	
			e.printStackTrace();
	
		 }
        return "error";
    }
}
