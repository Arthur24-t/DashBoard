package pat.view;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.*;

@RestController
public class Love {
    @CrossOrigin(origins = "*")
    @PostMapping("/getLove")
    public String hello(@RequestBody Map<String, Object> names, @RequestHeader("token") String token) throws IOException, InterruptedException
             {
                try {
                    boolean checkRevoked = true;
                    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token, checkRevoked);
                    
                    String name1 = (String) names.get("name1");
                    String name2 = (String) names.get("name2");
                    pat.services.Love love = new pat.services.Love();
                    return love.getLove(name1, name2);
                } catch (FirebaseAuthException e) {
                    System.out.println(e.getMessage());
                    return e.getMessage();
                }

                 
                  
       
    }

}
