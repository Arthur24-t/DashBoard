package pat.controler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.google.firebase.auth.*;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord.UpdateRequest;

@RestController
public class UserController {
    @CrossOrigin(origins = "*")
    @GetMapping("/users")
    public String listAll(@RequestHeader("token") String token) throws FirebaseAuthException {
        try {
            boolean checkRevoked = true;
            FirebaseToken decodedToken = FirebaseAuth.getInstance()
                    .verifyIdToken(token, checkRevoked);
            String uid = decodedToken.getUid();
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            List test = new ArrayList<>();
            String data = "[";
            page = FirebaseAuth.getInstance().listUsers(null);
            int count =0;
            int count2= 0;
            for (ExportedUserRecord user : page.iterateAll()) {
                count ++;
            }
            for (ExportedUserRecord user : page.iterateAll()) {
                System.out.println(user.getProviderId());
                data += "{ \"id\" : \""+user.getUid()+"\", \"mail\" : \""+user.getEmail()+"\"}";
                count2++;
                if(count != count2){
                    data += ",";
                }
            }
            data +="]";
            System.out.println(data);
            return data;
        } catch (FirebaseAuthException e) {
            return e.getMessage();
        }
}
    @CrossOrigin(origins = "*")
    @PostMapping("/users")
    public void CreateUser(@RequestBody Map<String, String> user, @RequestHeader("token") String token) throws FirebaseAuthException {

        try {
            boolean checkRevoked = true;
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token, checkRevoked);

            CreateRequest request = new CreateRequest()
                    .setUid(UUID.randomUUID().toString())
                    .setEmail(user.get("email"))
                    .setPassword(user.get("passwd"));
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            System.out.println("Successfully created new user: " + userRecord.getUid());

        } catch (FirebaseAuthException e) {
            System.out.println(e.getMessage());

        }

    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/users")
    public void deleteUser(@RequestBody Map<String, Object> user) {
        try {
            boolean checkRevoked = true;
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken( (String) user.get("token"), checkRevoked);
            FirebaseAuth.getInstance().deleteUser((String) user.get("uid"));
            System.out.println("Successfully deleted user.");
        } catch (FirebaseAuthException e) {
            System.out.println(e.getMessage());
        }
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/users")
    public void updateUser(@RequestBody Map<String, String> user, @RequestHeader("token") String token)
            throws FirebaseAuthException {

        try {
            boolean checkRevoked = true;
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token, checkRevoked);

            if(user.get("passwd") == ""){
                UpdateRequest request = new UpdateRequest(user.get("uid"))
                .setEmail(user.get("email"));

        UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
        System.out.println("Successfully updated user: " + userRecord.getUid());
            }else{
                UpdateRequest request = new UpdateRequest(user.get("uid"))
                .setEmail(user.get("email"))
                .setPassword(user.get("passwd"));

        UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
        System.out.println("Successfully updated user: " + userRecord.getUid());
            }

           
        } catch (FirebaseAuthException e) {
            System.out.println(e.getMessage());

        }
    }
}

