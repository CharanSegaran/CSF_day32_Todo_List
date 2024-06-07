package sg.edu.nus.iss.WorkShop_32.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import sg.edu.nus.iss.WorkShop_32.models.*;
import sg.edu.nus.iss.WorkShop_32.services.UserService;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping()
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class RestController {
    
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> successLogin(@RequestBody Map<String,String> credentials, HttpServletResponse response) {
      
        if (userService.credentialsMatch(credentials.get("username") , credentials.get("password")) == true){
            String token = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("user-id",credentials.get("username") + ":" + token);
            cookie.setMaxAge(86400);
            response.addCookie(cookie);
  
            return ResponseEntity.ok("User Logged in");
        } 
        else return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
    }
    

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserData userData) {
        //TODO: process POST request
        System.out.println("hi");
        
        userService.save(userData);

        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("message", "User Successfully registered");

        return ResponseEntity.ok(builder.build().toString());
    }

    @PostMapping("/save")
    public ResponseEntity<String> postMethodName(@RequestBody Todo[] todo, 
                                                 @CookieValue(value = "user-id") String userIDCookieValue) {

        String username = userIDCookieValue.split(":")[0].toString();
        System.out.println(username);
        userService.saveTodoArray(todo, username);

        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("message", "Todo list saved");
        return ResponseEntity.ok(builder.build().toString());
    }

    @GetMapping("/getTodoList")
    public ResponseEntity<Todo[]> getTodoList(@CookieValue(value = "user-id") String userIdCookieValue) {

        String username = userIdCookieValue.split(":")[0].toString();
        Todo[] todoList = userService.getTodoList(username);

        return ResponseEntity.ok().body(todoList);
    }
    
    

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) 
    public ResponseEntity<String> uploadImage(@RequestBody MultipartFile file, 
                                              @RequestPart String description,
                                              @CookieValue(value = "user-id") String userIdCookieValue){
        
        return ResponseEntity.ok().body("Hi");
    }

}

