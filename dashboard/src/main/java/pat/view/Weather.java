package pat.view;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Weather {
    @CrossOrigin(origins = "*")
    @PostMapping("/getweather")
    public String hello(@RequestBody Map<String, String> codePostal)
        throws IOException, InterruptedException {
            pat.services.Weather weather = new pat.services.Weather();
            return weather.getWeather(codePostal.get("codePostal"));
        }
    }

