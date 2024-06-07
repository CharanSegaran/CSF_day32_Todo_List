package sg.edu.nus.iss.WorkShop_32.repositories;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import sg.edu.nus.iss.WorkShop_32.constants.*;
import com.mongodb.client.result.UpdateResult;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.*;
import sg.edu.nus.iss.WorkShop_32.models.*;
import java.util.*;


@Repository
public class UserRepository{

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    JdbcTemplate jdbcTemplate;

    
    public void save(UserData userData){

        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        String hashedPassword = hashAPassword(userData.getPassword(), new String(salt));

        //Store user credentials and salt in database
        User user = new User();
        user.setName(userData.getName());
        user.setUsername(userData.getUsername());
        user.setHashedPassword(hashedPassword);
        user.setSalt(salt);
        System.out.println(user);
        mongoTemplate.save(user);
    }

    public String hashAPassword(String password, String salt){

        //Concatenate the password with the salt
        String passwordWithSalt = password + salt;

        //Hash the combined string
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassowrd = encoder.encode(passwordWithSalt);

        return hashedPassowrd;
    }

    public Optional<User> findUser(String username){
        Query query = Query.query(Criteria.where("username").is(username));
        List<User> results = mongoTemplate.find(query, User.class, "todo_login");
        if(results!=null && results.size()==1){
            return Optional.of(results.get(0));
        }
        else return Optional.empty();
    }

    public void saveTodoArray(Todo[] todo, String username){
        Query query = Query.query(Criteria.where("username").is(username));
        Update update = new Update()
                        .set("todo-list", todo);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update,"todo_login");
        System.out.printf("Documents updated: %d\n", updateResult.getModifiedCount());
    }

    public void saveImageToSQL(ImageData imageData){
        String pic_id = UUID.randomUUID().toString().substring(0,8);
        InputStream is = new ByteArrayInputStream(imageData.getContents());
        String mediaType = imageData.getMediaType();

        jdbcTemplate.update(Constants.SQL_INSERT_PICTURE, pic_id, is, mediaType);
    }
}
