package pat.view;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ChuckNorris {
    @CrossOrigin(origins = "*")
    @GetMapping("/getjoke")
    public String hello() throws IOException, InterruptedException {
        pat.services.ChuckNorris chuck = new pat.services.ChuckNorris();
        return chuck.getJoke();
    }
}
